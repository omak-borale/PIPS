
import type { Bus, BusStop, Arrival, BusRoute, Student, DieselEntry, RealTimeBusLocation } from './types';
import { get, ref } from 'firebase/database';
import { db } from './firebase';

// Helper to extract data from RTDB snapshot, converting objects to arrays
function snapshotToData(snapshot: any) {
    const data: any[] = [];
    if (snapshot.exists()) {
        const val = snapshot.val();
        if (val && typeof val === 'object') {
            Object.keys(val).forEach(key => {
                data.push({ id: key, ...val[key] });
            });
        }
    }
    return data;
}


// These functions are for server components.
// They can be used with await syntax.
export async function getBuses(): Promise<Bus[]> {
    // This is now fetched via actions.ts or directly from RTDB
    return [];
}

export async function getStops(): Promise<BusStop[]> {
    const stopsRef = ref(db, 'stops');
    const snapshot = await get(stopsRef);
    return snapshotToData(snapshot);
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

export async function getRealTimeBusLocations(): Promise<RealTimeBusLocation[]> {
    const locationsRef = ref(db, 'realTimeBusLocations');
    const snapshot = await get(locationsRef);
    return snapshotToData(snapshot);
}

export async function getHistoricalData(): Promise<string> {
    const dataRef = ref(db, 'historicalData');
    const snapshot = await get(dataRef);
    return snapshot.val() || '';
}

export async function getNewsFeed(): Promise<string> {
     const dataRef = ref(db, 'newsFeed');
    const snapshot = await get(dataRef);
    return snapshot.val() || '';
}
