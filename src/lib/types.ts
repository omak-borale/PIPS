export type Bus = {
  id: string;
  route: string;
  position: {
    lat: number;
    lng: number;
  };
  status: 'On Time' | 'Delayed' | 'Early';
};

export type BusStop = {
  id: string;
  name: string;
  position: {
    lat: number;
    lng: number;
  };
  routes: string[];
};

export type Arrival = {
  route: string;
  destination: string;
  time: string;
  status: 'On Time' | 'Delayed' | 'Early';
};

export type BusRoute = {
    id: string;
    name: string;
    description: string;
    status: 'Active' | 'Inactive';
    busNumber: string;
    fuelLevel: number;
    lastFueled: string;
}

export type Student = {
    id: string;
    name: string;
    usesBus: boolean;
    grade: string;
    parentName: string;
    parentContact: string;
    address: string;
    busNumber?: string;
}
