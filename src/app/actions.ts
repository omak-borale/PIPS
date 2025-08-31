
'use server';
import { analyzeBusDisruptions } from '@/ai/flows/analyze-bus-disruptions';
import { hashPassword } from '@/lib/crypto';
import type { Student, BusRoute, DieselEntry, DailyLog, Arrival, ServiceHistory, GeneralSettings, BusFeesSettings, ProfileSettings } from '@/lib/types';
import { revalidatePath } from 'next/cache';
import { db } from '@/lib/firebase';
import { collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc, query, where, writeBatch } from 'firebase/firestore';
import initialData from '@/lib/data.json';

// Helper function to convert Firestore snapshot to array
function snapshotToData<T>(snapshot: any): T[] {
    const data: T[] = [];
    snapshot.forEach((doc: any) => {
        data.push({ id: doc.id, ...doc.data() } as unknown as T);
    });
    return data;
}

// Helper function to convert single doc snapshot to data
function docToData<T>(docSnap: any): T | null {
    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as unknown as T;
    }
    return null;
}

export async function seedDatabaseAction() {
    try {
        const batch = writeBatch(db);

        // Seed students
        const studentsCollection = collection(db, 'students');
        initialData.students.forEach(student => {
            const { id, ...studentData } = student;
            const docRef = doc(studentsCollection, id);
            batch.set(docRef, studentData);
        });

        // Seed bus routes
        const busRoutesCollection = collection(db, 'busRoutes');
        initialData.busRoutes.forEach(route => {
            const { id, ...routeData } = route;
            const docRef = doc(busRoutesCollection, id);
            batch.set(docRef, routeData);
        });

        // Seed diesel entries
        const dieselEntriesCollection = collection(db, 'dieselEntries');
        initialData.dieselEntries.forEach(entry => {
            const { id, ...entryData } = entry;
            const docRef = doc(dieselEntriesCollection, id);
            batch.set(docRef, entryData);
        });

        // Seed daily logs
        const dailyLogsCollection = collection(db, 'dailyLogs');
        initialData.dailyLogs.forEach(log => {
            const { id, ...logData } = log;
            const docRef = doc(dailyLogsCollection, id);
            batch.set(docRef, logData);
        });

        // Seed arrivals
        const arrivalsCollection = collection(db, 'arrivals');
        initialData.arrivals.forEach(arrival => {
            const { id, ...arrivalData } = arrival;
            const docRef = doc(arrivalsCollection, id);
            batch.set(docRef, arrivalData);
        });

        // Seed settings
        const settingsCollection = collection(db, 'settings');
        Object.entries(initialData.settings).forEach(([key, value]) => {
            const docRef = doc(settingsCollection, key);
            batch.set(docRef, value);
        });


        await batch.commit();
        revalidatePath('/'); // Revalidate all paths to be safe
        return { success: true, message: "Database seeded successfully!" };
    } catch (error) {
        console.error("Error seeding database:", error);
        if (error instanceof Error) {
            return { success: false, error: error.message };
        }
        return { success: false, error: "An unknown error occurred while seeding the database." };
    }
}


export async function getStudentsAction(): Promise<Student[]> {
    const studentsCollection = collection(db, 'students');
    const studentSnapshot = await getDocs(studentsCollection);
    return snapshotToData<Student>(studentSnapshot);
}

export async function getBusRoutesAction(): Promise<BusRoute[]> {
    const routesCollection = collection(db, 'busRoutes');
    const routeSnapshot = await getDocs(routesCollection);
    return snapshotToData<BusRoute>(routeSnapshot);
}

export async function getDieselEntriesAction(): Promise<DieselEntry[]> {
    const entriesCollection = collection(db, 'dieselEntries');
    const entrySnapshot = await getDocs(entriesCollection);
    return snapshotToData<DieselEntry>(entrySnapshot);
}

export async function getDailyLogsAction(): Promise<DailyLog[]> {
    const logsCollection = collection(db, 'dailyLogs');
    const logSnapshot = await getDocs(logsCollection);
    return snapshotToData<DailyLog>(logSnapshot);
}

export async function getArrivalsAction(): Promise<Arrival[]> {
    const arrivalsCollection = collection(db, 'arrivals');
    const arrivalSnapshot = await getDocs(arrivalsCollection);
    return snapshotToData<Arrival>(arrivalSnapshot);
}


export async function getDisruptionAnalysis() {
  try {
    const routes = await getBusRoutesAction();
    const result = await analyzeBusDisruptions({
      realTimeBusLocations: JSON.stringify(routes.map(r => ({busId: r.busNumber, lat: 0, lon: 0}))), // Placeholder
      historicalData: 'Historical data not available from Firestore yet.',
      newsFeed: 'News feed not available from Firestore yet.',
    });
    return { success: true, data: result };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to analyze disruptions.' };
  }
}

export async function getHashedPassword(password: string) {
    return hashPassword(password);
}

export async function addStudent(student: Omit<Student, 'id'>) {
    try {
        const docRef = await addDoc(collection(db, 'students'), student);
        revalidatePath('/dashboard/bus-management');
        return { success: true, data: {id: docRef.id, ...student} };
    } catch (error) {
        console.error(error);
        return { success: false, error: 'Failed to add student.' };
    }
}

export async function addBusRoute(route: Omit<BusRoute, 'id' | 'fuelLevel' | 'lastFueled' | 'serviceHistory'>) {
    try {
        const now = new Date();
        const newRouteData = {
            ...route,
            fuelLevel: 100, // Default fuel level
            lastFueled: now.toISOString(),
            serviceHistory: [],
        }
        await addDoc(collection(db, 'busRoutes'), newRouteData);

        revalidatePath('/dashboard/settings');
        revalidatePath('/dashboard/routes');
        revalidatePath('/dashboard/add-route');


        return { success: true };
    } catch (error) {
        console.error(error);
        if (error instanceof Error) {
            return { success: false, error: error.message };
        }
        return { success: false, error: 'Failed to add bus route.' };
    }
}

export async function updateBusRoute(route: BusRoute) {
    try {
        const routeRef = doc(db, 'busRoutes', route.id);
        const { id, ...routeData } = route;
        await updateDoc(routeRef, routeData);

        revalidatePath('/dashboard/settings');
        revalidatePath('/dashboard/routes');
        return { success: true, data: route };
    } catch (error) {
        console.error(error);
        return { success: false, error: 'Failed to update bus route.' };
    }
}


export async function deleteBusRoute(routeId: string) {
    try {
        await deleteDoc(doc(db, 'busRoutes', routeId));

        revalidatePath('/dashboard/settings');
        revalidatePath('/dashboard/routes');
        return { success: true, data: { id: routeId } };
    } catch (error) {
        console.error(error);
        return { success: false, error: 'Failed to delete a bus route.' };
    }
}

export async function addDailyLog(log: Omit<DailyLog, 'id' | 'date'> & { date: Date }) {
    try {
        const newLogData = {
            ...log,
            date: log.date.toISOString(),
        };
        const docRef = await addDoc(collection(db, 'dailyLogs'), newLogData);
        revalidatePath('/dashboard/daily-log-details');
        return { success: true, data: { id: docRef.id, ...newLogData } };
    } catch (error) {
        console.error(error);
        return { success: false, error: 'Failed to add daily log.' };
    }
}

export async function addDieselEntry(entry: Omit<DieselEntry, 'id' | 'date'> & { date: Date }) {
    try {
         const newEntryData = {
            ...entry,
            date: entry.date.toISOString(),
        };
        const docRef = await addDoc(collection(db, 'dieselEntries'), newEntryData);
        revalidatePath('/dashboard/diesel-details');
        return { success: true, data: {id: docRef.id, ...newEntryData } };
    } catch (error) {
        console.error(error);
        return { success: false, error: 'Failed to add diesel entry.' };
    }
}

export async function addArrival(arrival: Omit<Arrival, 'id'>) {
    try {
        const docRef = await addDoc(collection(db, 'arrivals'), arrival);
        revalidatePath('/dashboard/settings');
        revalidatePath('/dashboard');
        revalidatePath('/dashboard/arrival-times');

        return { success: true, data: { id: docRef.id, ...arrival } };
    } catch (error) {
        console.error(error);
        return { success: false, error: 'Failed to add arrival.' };
    }
}

export async function updateArrival(arrival: Arrival) {
    try {
        const arrivalRef = doc(db, 'arrivals', arrival.id);
        const { id, ...arrivalData } = arrival;
        await updateDoc(arrivalRef, arrivalData);

        revalidatePath('/dashboard/settings');
        revalidatePath('/dashboard');
        revalidatePath('/dashboard/arrival-times');

        return { success: true, data: arrival };
    } catch (error) {
        console.error(error);
        return { success: false, error: 'Failed to update arrival.' };
    }
}

export async function deleteArrival(arrivalId: string) {
    try {
        await deleteDoc(doc(db, 'arrivals', arrivalId));
        revalidatePath('/dashboard/settings');
        revalidatePath('/dashboard');
        revalidatePath('/dashboard/arrival-times');
        return { success: true, data: { id: arrivalId } };
    } catch (error) {
        console.error(error);
        return { success: false, error: 'Failed to delete arrival.' };
    }
}

export async function addServiceHistory(busId: string, serviceHistory: ServiceHistory) {
    try {
        const busRef = doc(db, 'busRoutes', busId);
        const busDoc = await getDoc(busRef);
        if (busDoc.exists()) {
            const busData = busDoc.data() as BusRoute;
            const updatedHistory = [serviceHistory, ...(busData.serviceHistory || [])];
            await updateDoc(busRef, { serviceHistory: updatedHistory });
            revalidatePath('/dashboard/bus-repair');
            return { success: true, data: updatedHistory };
        }
        return { success: false, error: 'Bus not found.' };
    } catch (error) {
        console.error(error);
        return { success: false, error: 'Failed to add service history.' };
    }
}


export async function getGeneralSettingsAction(): Promise<GeneralSettings | null> {
    const docRef = doc(db, 'settings', 'general');
    const docSnap = await getDoc(docRef);
    return docToData<GeneralSettings>(docSnap);
}

export async function getBusFeesSettingsAction(): Promise<BusFeesSettings | null> {
    const docRef = doc(db, 'settings', 'busFees');
    const docSnap = await getDoc(docRef);
    return docToData<BusFeesSettings>(docSnap);
}

export async function getProfileSettingsAction(): Promise<ProfileSettings | null> {
    const docRef = doc(db, 'settings', 'profile');
    const docSnap = await getDoc(docRef);
    return docToData<ProfileSettings>(docSnap);
}

    

    