
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { busRoutes, students } from '@/lib/data';
import type { Student, BusRoute } from '@/lib/types';
import { User, Bus, Users, Phone, Home } from 'lucide-react';
import Link from 'next/link';

// For demonstration, we'll assume the first driver is logged in.
// In a real application, you'd get this from the user's session.
const loggedInDriver: BusRoute | undefined = busRoutes[0];

export default function DriverDashboardPage() {
  if (!loggedInDriver) {
    return (
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <Card>
          <CardHeader>
            <CardTitle>Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p>No driver data available.</p>
          </CardContent>
        </Card>
      </main>
    );
  }

  const assignedStudents = students.filter(
    (student) => student.busNumber === loggedInDriver.busNumber
  );

  return (
    <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <User className="h-8 w-8 text-primary" />
            <div>
              <CardTitle>Welcome, {loggedInDriver.name}</CardTitle>
              <CardDescription>
                Here is your dashboard for today.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
              <Bus className="h-6 w-6 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Assigned Bus</p>
                <p className="font-bold text-lg">{loggedInDriver.busNumber}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
              <Users className="h-6 w-6 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Total Students</p>
                <p className="font-bold text-lg">{assignedStudents.length}</p>
              </div>
            </div>
             <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
              <Home className="h-6 w-6 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Route</p>
                <p className="font-bold text-lg">{loggedInDriver.description}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Assigned Students</CardTitle>
          <CardDescription>
            A list of all students assigned to your bus route.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student Name</TableHead>
                <TableHead>Village / Address</TableHead>
                <TableHead>Parent's Contact</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assignedStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">
                     <Link href={`/dashboard/bus-management/${student.id}`} className="hover:underline text-primary">
                        {student.name}
                     </Link>
                  </TableCell>
                  <TableCell>{student.address}</TableCell>
                  <TableCell>{student.parentContact}</TableCell>
                </TableRow>
              ))}
              {assignedStudents.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="text-center py-8 text-muted-foreground"
                  >
                    No students assigned to your bus.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
}
