
import type { Bus, BusStop, Arrival, BusRoute, Student, DieselEntry } from './types';
import initialData from './data.json';

// These functions are for server components.
// They can be used with await syntax.
export async function getBuses(): Promise<Bus[]> {
    return initialData.buses;
}

export async function getStops(): Promise<BusStop[]> {
    return initialData.stops;
}

export async function getArrivals(): Promise<Arrival[]> {
    return initialData.arrivals;
}

export async function getBusRoutes(): Promise<BusRoute[]> {
    return initialData.busRoutes;
}

export async function getStudents(): Promise<Student[]> {
    return initialData.students;
}

export async function getDieselEntries(): Promise<DieselEntry[]> {
    return initialData.dieselEntries;
}

export async function getRealTimeBusLocations() {
    return initialData.realTimeBusLocations;
}

export async function getHistoricalData(): Promise<string> {
    return initialData.historicalData;
}

export async function getNewsFeed(): Promise<string> {
    return initialData.newsFeed;
}


// Export the initial data for components that might not need dynamic updates
// or for use in client components where async can be tricky.
export const initialBusRoutes: BusRoute[] = initialData.busRoutes;
export const initialStudents: Student[] = initialData.students;
export const initialDieselEntries: DieselEntry[] = initialData.dieselEntries;
