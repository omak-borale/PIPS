
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Users, Bus } from 'lucide-react';
import type { Student } from '@/lib/types';
import { getStudentsAction } from '@/app/actions';
import BusManagementClient from '@/components/bus-watch/bus-management-client';

export default async function BusManagementPage() {
  const students = await getStudentsAction();

  const studentsUsingBus = students.filter((student) => student.usesBus).length;
  const studentsNotUsingBus = students.length - studentsUsingBus;

  return (
    <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Students Using Bus
            </CardTitle>
            <Bus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{studentsUsingBus}</div>
            <p className="text-xs text-muted-foreground">
              out of {students.length} total students
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Students Not Using Bus
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{studentsNotUsingBus}</div>
            <p className="text-xs text-muted-foreground">
              out of {students.length} total students
            </p>
          </CardContent>
        </Card>
      </div>
      <BusManagementClient students={students} />
    </main>
  );
}
