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
    { 
        id: 'route-1', 
        name: 'Route 1', 
        description: 'Transbay Terminal to Ocean Beach', 
        status: 'Active', 
        busNumber: 'B-101', 
        fuelLevel: 75, 
        lastFueled: '2023-10-26T08:00:00Z',
        serviceHistory: [
            { date: '2023-10-05T00:00:00Z', machineName: 'Engine Filter', contactNumber: '555-1111', labourCharge: 5000, remark: 'Replaced engine air filter.' },
        ]
    },
    { 
        id: 'route-2', 
        name: 'Route 2', 
        description: 'Hayes Valley to Golden Gate Park', 
        status: 'Active', 
        busNumber: 'B-102', 
        fuelLevel: 45, 
        lastFueled: '2023-10-25T12:30:00Z',
        serviceHistory: [
            { date: '2023-09-15T00:00:00Z', machineName: 'Brake Pads', contactNumber: '555-2222', labourCharge: 8000, remark: 'Replaced front and rear brake pads.' },
        ]
    },
    { 
        id: 'route-3', 
        name: 'Route 3', 
        description: 'Downtown to Fort Miley', 
        status: 'Inactive', 
        busNumber: 'B-103', 
        fuelLevel: 95, 
        lastFueled: '2023-10-27T09:15:00Z',
        serviceHistory: [
             { date: '2023-08-20T00:00:00Z', machineName: 'Tire Rotation', contactNumber: '555-3333', labourCharge: 3000, remark: 'Rotated all tires and checked pressure.' },
        ]
    },
    { 
        id: 'route-4', 
        name: 'Route 4', 
        description: 'Judah Line', 
        status: 'Active', 
        busNumber: 'B-104', 
        fuelLevel: 20, 
        lastFueled: '2023-10-26T18:45:00Z',
         serviceHistory: [
            { date: '2023-10-10T00:00:00Z', machineName: 'Oil Change', contactNumber: '555-4444', labourCharge: 4500, remark: 'Full synthetic oil change and fluid top-up.' },
        ]
    },
    { 
        id: 'route-5', 
        name: 'Route 5', 
        description: 'Market & Wharves', 
        status: 'Active', 
        busNumber: 'B-105', 
        fuelLevel: 60, 
        lastFueled: '2023-10-27T06:00:0Z',
         serviceHistory: [
            { date: '2023-07-30T00:00:00Z', machineName: 'AC System', contactNumber: '555-5555', labourCharge: 12000, remark: 'Repaired AC compressor and recharged freon.' },
        ]
    },
];

export const students: Student[] = [
  { id: 'student-1', name: 'Alice', usesBus: true, fatherName: 'John Doe', parentContact: '555-1234', address: '123 Main St, Anytown, USA', busNumber: 'B-101' },
  { id: 'student-2', name: 'Bob', usesBus: false, fatherName: 'Jane Smith', parentContact: '555-5678', address: '456 Oak Ave, Anytown, USA' },
  { id: 'student-3', name: 'Charlie', usesBus: true, fatherName: 'Peter Jones', parentContact: '555-8765', address: '789 Pine Ln, Anytown, USA', busNumber: 'B-102' },
  { id: 'student-4', name: 'David', usesBus: true, fatherName: 'Mary Brown', parentContact: '555-4321', address: '321 Maple Dr, Anytown, USA', busNumber: 'B-101' },
  { id: 'student-5', name: 'Eve', usesBus: false, fatherName: 'David Williams', parentContact: '555-9876', address: '654 Elm St, Anytown, USA' },
  { id: 'student-6', name: 'Frank', usesBus: true, fatherName: 'Susan Garcia', parentContact: '555-3456', address: '987 Birch Rd, Anytown, USA', busNumber: 'B-103' },
  { id: 'student-7', name: 'Grace', usesBus: true, fatherName: 'Robert Miller', parentContact: '555-6543', address: '159 Cedar Blvd, Anytown, USA', busNumber: 'B-102' },
  { id: 'student-8', name: 'Heidi', usesBus: false, fatherName: 'Patricia Davis', parentContact: '555-7890', address: '753 Spruce Way, Anytown, USA' },
  { id: 'student-9', name: 'Ivan', usesBus: true, fatherName: 'Michael Rodriguez', parentContact: '555-1122', address: '852 Fir Ct, Anytown, USA', busNumber: 'B-104' },
  { id: 'student-10', name: 'Judy', usesBus: true, fatherName: 'Linda Martinez', parentContact: '555-3344', address: '951 Redwood Pkwy, Anytown, USA', busNumber: 'B-101' },
  { id: 'student-11', name: 'Mallory', usesBus: true, fatherName: 'James Hernandez', parentContact: '555-5566', address: '357 Aspen Grove, Anytown, USA', busNumber: 'B-105' },
  { id: 'student-12', name: 'Niaj', usesBus: false, fatherName: 'Barbara Lopez', parentContact: '555-7788', address: '246 Willow Creek, Anytown, USA' },
  { id: 'student-13', name: 'Olivia', usesBus: true, fatherName: 'William Gonzalez', parentContact: '555-9900', address: '135 Poplar Pl, Anytown, USA', busNumber: 'B-102' },
  { id: 'student-14', name: 'Peggy', usesBus: true, fatherName: 'Richard Wilson', parentContact: '555-2468', address: '791 Sequoia Trail, Anytown, USA', busNumber: 'B-103' },
  { id: 'student-15', name: 'Sybil', usesBus: false, fatherName: 'Joseph Anderson', parentContact: '555-1357', address: '975 Cypress Point, Anytown, USA' },
];
