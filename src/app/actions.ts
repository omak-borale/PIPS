
'use server';
import fs from 'fs/promises';
import path from 'path';

import { analyzeBusDisruptions } from '@/ai/flows/analyze-bus-disruptions';
import { hashPassword } from '@/lib/crypto';
import type { Student, BusRoute, DieselEntry, DailyLog, Arrival } from '@/lib/types';
import { revalidatePath } from 'next/cache';
import initialData from '@/lib/data.json';

const dataFilePath = path.join(process.cwd(), 'src', 'lib', 'data.json');

async function readData() {
    try {
        const jsonData = await fs.readFile(dataFilePath, 'utf-8');
        return JSON.parse(jsonData);
    } catch (error) {
        console.error('Error reading data file:', error);
        // Return the initial data if the file doesn't exist or has an error
        return initialData;
    }
}

async function writeData(newData: any) {
    try {
        await fs.writeFile(dataFilePath, JSON.stringify(newData, null, 2), 'utf-8');
    } catch (error) {
        console.error('Error writing data file:', error);
    }
}

export async function getStudentsAction(): Promise<Student[]> {
    const data = await readData();
    return data.students;
}

export async function getBusRoutesAction(): Promise<BusRoute[]> {
    const data = await readData();
    return data.busRoutes;
}

export async function getDieselEntriesAction(): Promise<DieselEntry[]> {
    const data = await readData();
    return data.dieselEntries;
}

export async function getDailyLogsAction(): Promise<DailyLog[]> {
    const data = await readData();
    return data.dailyLogs;
}

export async function getArrivalsAction(): Promise<Arrival[]> {
    const data = await readData();
    return data.arrivals;
}


export async function getDisruptionAnalysis() {
  try {
    const currentData = await readData();
    const result = await analyzeBusDisruptions({
      realTimeBusLocations: JSON.stringify(currentData.realTimeBusLocations),
      historicalData: currentData.historicalData,
      newsFeed: currentData.newsFeed,
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
        const currentData = await readData();
        const newStudent: Student = {
            id: `student-${Date.now()}`,
            ...student,
        };
        
        currentData.students.push(newStudent);
        await writeData(currentData);

        revalidatePath('/dashboard/bus-management');
        return { success: true, data: newStudent };
    } catch (error) {
        console.error(error);
        return { success: false, error: 'Failed to add student.' };
    }
}

export async function addBusRoute(route: Omit<BusRoute, 'id' | 'fuelLevel' | 'lastFueled'>) {
    try {
        const currentData = await readData();
        const newRoute: BusRoute = {
            id: `route-${Date.now()}`,
            ...route,
            fuelLevel: 100, // Default fuel level
            lastFueled: new Date().toISOString(),
        };
        
        currentData.busRoutes.push(newRoute);
        await writeData(currentData);

        revalidatePath('/dashboard/settings');
        revalidatePath('/dashboard/routes');
        return { success: true, data: newRoute };
    } catch (error) {
        console.error(error);
        return { success: false, error: 'Failed to add bus route.' };
    }
}

export async function updateBusRoute(route: BusRoute) {
    try {
        const currentData = await readData();
        const routeIndex = currentData.busRoutes.findIndex((r: BusRoute) => r.id === route.id);

        if (routeIndex === -1) {
            return { success: false, error: 'Route not found.' };
        }

        currentData.busRoutes[routeIndex] = route;
        await writeData(currentData);

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
        const currentData = await readData();
        const updatedRoutes = currentData.busRoutes.filter((r: BusRoute) => r.id !== routeId);
        
        if (currentData.busRoutes.length === updatedRoutes.length) {
             return { success: false, error: 'Route not found.' };
        }

        currentData.busRoutes = updatedRoutes;
        await writeData(currentData);

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
        const currentData = await readData();
        const newLog: DailyLog = {
            id: `log-${Date.now()}`,
            ...log,
            date: log.date.toISOString(),
        };
        
        if (!currentData.dailyLogs) {
            currentData.dailyLogs = [];
        }

        currentData.dailyLogs.push(newLog);
        await writeData(currentData);

        revalidatePath('/dashboard/daily-log-details');
        return { success: true, data: newLog };
    } catch (error) {
        console.error(error);
        return { success: false, error: 'Failed to add daily log.' };
    }
}

export async function addDieselEntry(entry: Omit<DieselEntry, 'id' | 'date'> & { date: Date }) {
    try {
        const currentData = await readData();
        const newEntry: DieselEntry = {
            id: `log-${Date.now()}`,
            ...entry,
            date: entry.date.toISOString(),
        };
        
        if (!currentData.dieselEntries) {
            currentData.dieselEntries = [];
        }

        currentData.dieselEntries.push(newEntry);
        await writeData(currentData);

        revalidatePath('/dashboard/diesel-details');
        return { success: true, data: newEntry };
    } catch (error) {
        console.error(error);
        return { success: false, error: 'Failed to add diesel entry.' };
    }
}

export async function addArrival(arrival: Omit<Arrival, 'id'>) {
    try {
        const currentData = await readData();
        const newArrival: Arrival = {
            id: `arrival-${Date.now()}`,
            ...arrival,
        };
        
        currentData.arrivals.push(newArrival);
        await writeData(currentData);

        revalidatePath('/dashboard/settings');
        revalidatePath('/dashboard');
        return { success: true, data: newArrival };
    } catch (error) {
        console.error(error);
        return { success: false, error: 'Failed to add arrival.' };
    }
}

export async function updateArrival(arrival: Arrival) {
    try {
        const currentData = await readData();
        const arrivalIndex = currentData.arrivals.findIndex((a: Arrival) => a.id === arrival.id);

        if (arrivalIndex === -1) {
            return { success: false, error: 'Arrival not found.' };
        }

        currentData.arrivals[arrivalIndex] = arrival;
        await writeData(currentData);

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
        const currentData = await readData();
        const updatedArrivals = currentData.arrivals.filter((a: Arrival) => a.id !== arrivalId);
        
        if (currentData.arrivals.length === updatedArrivals.length) {
             return { success: false, error: 'Arrival not found.' };
        }

        currentData.arrivals = updatedArrivals;
        await writeData(currentData);

        revalidatePath('/dashboard/settings');
        revalidatePath('/dashboard');
        return { success: true, data: { id: arrivalId } };
    } catch (error) {
        console.error(error);
        return { success: false, error: 'Failed to delete arrival.' };
    }
}
