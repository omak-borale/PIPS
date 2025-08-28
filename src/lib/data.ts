
import type { Bus, BusStop, Arrival, BusRoute, Student, DieselEntry } from './types';
import data from './data.json';

// Data for GenAI flow
export const realTimeBusLocations = data.realTimeBusLocations;
export const historicalData = data.historicalData;
export const newsFeed = data.newsFeed;


// Data for UI components
export const buses: Bus[] = data.buses;
export const stops: BusStop[] = data.stops;
export const arrivals: Arrival[] = data.arrivals;
export const busRoutes: BusRoute[] = data.busRoutes;
export const students: Student[] = data.students;
export const dieselEntries: DieselEntry[] = data.dieselEntries;
