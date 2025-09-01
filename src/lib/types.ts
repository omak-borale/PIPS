
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
    driverName: string;
    route: string;
    busNumber: string;
    contact: string;
}

export type Student = {
    id: string;
    name: string;
    class: string;
    busNumber: string;
    fees: number;
    section?: string;
    // Deprecated fields from old spec
    fatherName?: string;
    parentContact?: string;
    village?: string;
    usesBus?: boolean;
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

export type GeneralSettings = {
  id: string;
  appTheme: "light" | "dark";
  notifications: boolean;
  currency: string;
}

export type BusFeesSettings = {
  id: string;
  monthlyFee: number;
  lateFee: number;
}

export type ProfileSettings = {
  id: string;
  schoolName: string;
  contactNumber: string;
  address: string;
}
