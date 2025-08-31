
import type { Bus, BusStop, Arrival, BusRoute, Student, DieselEntry } from './types';
import initialData from './data.json';

// These functions are for server components.
// They can be used with await syntax.
export async function getBuses(): Promise<Bus[]> {
    // This is now fetched via actions.ts
    return [];
}

export async function getStops(): Promise<BusStop[]> {
    // This could be migrated to Firestore as well
    return initialData.stops;
}

export async function getArrivals(): Promise<Arrival[]> {
    // This is now fetched via actions.ts
    return [];
}

export async function getBusRoutes(): Promise<BusRoute[]> {
    // This is now fetched via actions.ts
    return [];
}

export async function getStudents(): Promise<Student[]> {
    // This is now fetched via actions.ts
    return [];
}

export async function getDieselEntries(): Promise<DieselEntry[]> {
    // This is now fetched via actions.ts
    return [];
}

export async function getRealTimeBusLocations() {
    // This could be migrated to Firestore as well
    return initialData.realTimeBusLocations;
}

export async function getHistoricalData(): Promise<string> {
    return initialData.historicalData;
}

export async function getNewsFeed(): Promise<string> {
    return initialData.newsFeed;
}
