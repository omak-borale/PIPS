
import fs from 'fs/promises';
import path from 'path';
import type { Bus, BusStop, Arrival, BusRoute, Student, DieselEntry } from './types';
import initialData from './data.json';

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

export async function getBuses(): Promise<Bus[]> {
    const data = await readData();
    return data.buses;
}

export async function getStops(): Promise<BusStop[]> {
    const data = await readData();
    return data.stops;
}

export async function getArrivals(): Promise<Arrival[]> {
    const data = await readData();
    return data.arrivals;
}

export async function getBusRoutes(): Promise<BusRoute[]> {
    const data = await readData();
    return data.busRoutes;
}

export async function getStudents(): Promise<Student[]> {
    const data = await readData();
    return data.students;
}

export async function getDieselEntries(): Promise<DieselEntry[]> {
    const data = await readData();
    return data.dieselEntries;
}

export async function getRealTimeBusLocations() {
    const data = await readData();
    return data.realTimeBusLocations;
}

export async function getHistoricalData(): Promise<string> {
    const data = await readData();
    return data.historicalData;
}

export async function getNewsFeed(): Promise<string> {
    const data = await readData();
    return data.newsFeed;
}

// Export the initial data for components that might not need dynamic updates
// or for use in client components where async can be tricky.
export const initialBusRoutes: BusRoute[] = initialData.busRoutes;
export const initialStudents: Student[] = initialData.students;
export const initialDieselEntries: DieselEntry[] = initialData.dieselEntries;
