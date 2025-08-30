
'use server';
import { analyzeBusDisruptions } from '@/ai/flows/analyze-bus-disruptions';
import { hashPassword } from '@/lib/crypto';
import type { Student, BusRoute, DieselEntry, DailyLog, Arrival } from '@/lib/types';
import { revalidatePath } from 'next/cache';
import { db } from '@/lib/firebase';
import { collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc, query, where, writeBatch } from 'firebase/firestore';

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

export async function addBusRoute(route: Omit<BusRoute, 'id' | 'fuelLevel' | 'lastFueled'>) {
    try {
        const newRouteData = {
            ...route,
            fuelLevel: 100, // Default fuel level
            lastFueled: new Date().toISOString(),
        }
        const docRef = await addDoc(collection(db, 'busRoutes'), newRouteData);

        revalidatePath('/dashboard/settings');
        revalidatePath('/dashboard/routes');
        return { success: true, data: { id: docRef.id, ...newRouteData } };
    } catch (error) {
        console.error(error);
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
        return { success: false, error: 'Failed to delete bus route.' };
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
        return { success: true, data: { id: arrivalId } };
    } catch (error) {
        console.error(error);
        return { success: false, error: 'Failed to delete arrival.' };
    }
}
