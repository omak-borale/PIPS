
"use client";

import { useState, useEffect } from 'react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { Student, BusRoute } from '@/lib/types';
import { User, Bus, Users, Home } from 'lucide-react';
import Link from 'next/link';
import { Label } from '@/components/ui/label';

type DriverDashboardClientProps = {
  busRoutes: BusRoute[];
  students: Student[];
};

export default function DriverDashboardClient({ busRoutes, students }: DriverDashboardClientProps) {
  const [selectedRouteId, setSelectedRouteId] = useState<string | undefined>(busRoutes[0]?.id);

  const selectedDriver = busRoutes.find(
    (route) => route.id === selectedRouteId
  );

  const assignedStudents = selectedDriver
    ? students.filter(
        (student) => student.busNumber === selectedDriver.busNumber
      )
    : [];

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Driver Route Selection</CardTitle>
          <CardDescription>
            Select a route to view its details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="max-w-xs">
            <Label htmlFor="route-select">Select a Route</Label>
            <Select
              value={selectedRouteId}
              onValueChange={(value) => setSelectedRouteId(value)}
            >
              <SelectTrigger id="route-select">
                <SelectValue placeholder="Select a route..." />
              </SelectTrigger>
              <SelectContent>
                {busRoutes.map((route) => (
                  <SelectItem key={route.id} value={route.id}>
                    {route.name} ({route.busNumber}) - {route.description}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {selectedDriver ? (
        <>
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <User className="h-8 w-8 text-primary" />
                <div>
                  <CardTitle>Welcome, {selectedDriver.name}</CardTitle>
                  <CardDescription>
                    Here is your dashboard for the selected route.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                  <Bus className="h-6 w-6 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Assigned Bus
                    </p>
                    <p className="font-bold text-lg">
                      {selectedDriver.busNumber}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                  <Users className="h-6 w-6 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Total Students
                    </p>
                    <p className="font-bold text-lg">
                      {assignedStudents.length}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                  <Home className="h-6 w-6 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Route</p>
                    <p className="font-bold text-lg">
                      {selectedDriver.description}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Assigned Students</CardTitle>
              <CardDescription>
                A list of all students assigned to this bus route.
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
                        <Link
                          href={`/dashboard/bus-management/${student.id}`}
                          className="hover:underline text-primary"
                        >
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
                        No students assigned to this bus.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </>
      ) : (
        <Card>
          <CardContent className="p-8 text-center text-muted-foreground">
            <p>Please select a route to view details.</p>
          </CardContent>
        </Card>
      )}
    </>
  );
}
