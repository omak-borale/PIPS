

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { User, Bus, Users, Home } from 'lucide-react';
import Link from 'next/link';
import { Label } from '@/components/ui/label';
import { getBusRoutesAction, getStudentsAction } from '@/app/actions';
import DriverDashboardClient from '@/components/bus-watch/driver-dashboard-client';

export default async function DriverDashboardPage() {
  const busRoutes = await getBusRoutesAction();
  const students = await getStudentsAction();

  return (
    <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-6">
      <DriverDashboardClient busRoutes={busRoutes} students={students} />
    </main>
  );
}
