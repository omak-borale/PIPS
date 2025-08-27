import type { Bus, BusStop, Arrival, BusRoute, Student } from './types';

// Data for GenAI flow
export const realTimeBusLocations = [
  { busId: 'B101', lat: 37.7749, lon: -122.4194, timestamp: '2023-10-27T10:00:00Z' },
  { busId: 'B102', lat: 37.7850, lon: -122.4295, timestamp: '2023-10-27T10:00:00Z' },
  { busId: 'B103', lat: 37.7951, lon: -122.4396, timestamp: '2023-10-27T10:00:00Z' },
];

export const historicalData = "Route 5 has an average delay of 15 minutes during peak hours. Last major disruption was due to a street parade on 2023-09-15.";
export const newsFeed = "Major traffic jam on Market Street due to a traffic incident. Expect delays.";


// Data for UI components
export const buses: Bus[] = [
  { id: 'bus-1', route: '5R', position: { lat: 37.775, lng: -122.434 }, status: 'On Time' },
  { id: 'bus-2', route: '21', position: { lat: 37.769, lng: -122.446 }, status: 'Delayed' },
  { id: 'bus-3', route: '38', position: { lat: 37.783, lng: -122.459 }, status: 'On Time' },
  { id: 'bus-4', route: 'N', position: { lat: 37.772, lng: -122.465 }, status: 'Early' },
];

export const stops: BusStop[] = [
  { id: 'stop-1', name: 'Haight St & Fillmore St', position: { lat: 37.771, lng: -122.447 }, routes: ['7', 'N'] },
  { id: 'stop-2', name: 'Market St & 7th St', position: { lat: 37.779, lng: -122.411 }, routes: ['F', '6', '9'] },
  { id: 'stop-3', name: 'Geary Blvd & Divisadero St', position: { lat: 37.783, lng: -122.443 }, routes: ['38', '38R'] },
  { id: 'stop-4', name: 'Mission St & 16th St', position: { lat: 37.765, lng: -122.420 }, routes: ['14', '49', '22'] },
  { id: 'stop-5', name: 'Powell St & Market St', position: { lat: 37.784, lng: -122.408 }, routes: ['Powell Cable Car', '5', '21'] },
];

export const arrivals: Arrival[] = [
  { route: '5R', destination: 'Ocean Beach', time: '5 min', status: 'On Time' },
  { route: '21', destination: 'Golden Gate Park', time: '8 min', status: 'Delayed' },
  { route: 'N', destination: 'Ocean Beach', time: '12 min', status: 'On Time' },
  { route: '38', destination: 'Fort Miley', time: '15 min', status: 'On Time' },
  { route: 'F', destination: 'Fisherman\'s Wharf', time: '18 min', status: 'Early' },
];

export const busRoutes: BusRoute[] = [
    { id: 'route-1', name: 'Route 1', description: 'Transbay Terminal to Ocean Beach', status: 'Active', busNumber: 'B-101', fuelLevel: 75, lastFueled: '2023-10-26T08:00:00Z' },
    { id: 'route-2', name: 'Route 2', description: 'Hayes Valley to Golden Gate Park', status: 'Active', busNumber: 'B-102', fuelLevel: 45, lastFueled: '2023-10-25T12:30:00Z' },
    { id: 'route-3', name: 'Route 3', description: 'Downtown to Fort Miley', status: 'Inactive', busNumber: 'B-103', fuelLevel: 95, lastFueled: '2023-10-27T09:15:00Z' },
    { id: 'route-4', name: 'Route 4', description: 'Judah Line', status: 'Active', busNumber: 'B-104', fuelLevel: 20, lastFueled: '2023-10-26T18:45:00Z' },
    { id: 'route-5', name: 'Route 5', description: 'Market & Wharves', status: 'Active', busNumber: 'B-105', fuelLevel: 60, lastFueled: '2023-10-27T06:00:00Z' },
];

export const students: Student[] = [
  { id: 'student-1', name: 'Alice', usesBus: true },
  { id: 'student-2', name: 'Bob', usesBus: false },
  { id: 'student-3', name: 'Charlie', usesBus: true },
  { id: 'student-4', name: 'David', usesBus: true },
  { id: 'student-5', name: 'Eve', usesBus: false },
  { id: 'student-6', name: 'Frank', usesBus: true },
  { id: 'student-7', name: 'Grace', usesBus: true },
  { id: 'student-8', name: 'Heidi', usesBus: false },
  { id: 'student-9', name: 'Ivan', usesBus: true },
  { id: 'student-10', name: 'Judy', usesBus: true },
  { id: 'student-11', name: 'Mallory', usesBus: true },
  { id: 'student-12', name: 'Niaj', usesBus: false },
  { id: 'student-13', name: 'Olivia', usesBus: true },
  { id: 'student-14', name: 'Peggy', usesBus: true },
  { id: 'student-15', name: 'Sybil', usesBus: false },
];
