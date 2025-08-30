

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
  id: string;
  route: string;
  destination: string;
  time: string;
  status: 'On Time' | 'Delayed' | 'Early';
};

export type ServiceHistory = {
    date: string;
    machineName: string;
    contactNumber: string;
    labourCharge: number;
    totalRepairCharge: number;
    remark: string;
}

export type BusRoute = {
    id: string;
    name: string;
    description: string;
    status: 'Active' | 'Inactive';
    busNumber: string;
    fuelLevel: number;
    lastFueled: string;
    serviceHistory?: ServiceHistory[];
}

export type Student = {
    id: string;
    name: string;
    usesBus: boolean;
    fatherName: string;
    parentContact: string;
    address: string;
    busNumber?: string;
    lat?: number;
    lon?: number;
}

export type DieselEntry = {
    id: string;
    busNumber: string;
    pumpName: string;
    liters: number;
    amount: number;
    date: string;
    pageNumber: number;
}

export type DailyLog = {
    id: string;
    busNumber: string;
    date: string;
    startTime: string;
    endTime: string;
    notes?: string;
}

export type RealTimeBusLocation = {
    busId: string;
    lat: number;
    lon: number;
    timestamp: string;
}
