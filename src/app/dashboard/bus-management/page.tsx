"use client";

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
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
import { Users, Bus } from 'lucide-react';
import { students } from '@/lib/data';
import Link from 'next/link';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';

export default function BusManagementPage() {
  const [selectedVillage, setSelectedVillage] = useState('all');
  const [selectedBus, setSelectedBus] = useState('all');

  const studentsUsingBus = students.filter((student) => student.usesBus).length;
  const studentsNotUsingBus = students.length - studentsUsingBus;

  const uniqueVillages = ['all', ...Array.from(new Set(students.map(s => s.address)))];
  const uniqueBuses = ['all', ...Array.from(new Set(students.filter(s => s.busNumber).map(s => s.busNumber!)))];

  const filteredStudents = students.filter(student => {
    const villageMatch = selectedVillage === 'all' || student.address === selectedVillage;
    const busMatch = selectedBus === 'all' || student.busNumber === selectedBus;
    return villageMatch && busMatch;
  });

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
      <Card>
        <CardHeader>
          <CardTitle>Student Details</CardTitle>
          <CardDescription>
            Filter students by village and bus number.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
             <div className="flex-1">
              <label htmlFor="village-filter" className="text-sm font-medium">Filter by Village</label>
              <Select value={selectedVillage} onValueChange={setSelectedVillage}>
                <SelectTrigger id="village-filter">
                  <SelectValue placeholder="Select Village" />
                </SelectTrigger>
                <SelectContent>
                  {uniqueVillages.map(village => (
                    <SelectItem key={village} value={village}>
                      {village === 'all' ? 'All Villages' : village}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <label htmlFor="bus-filter" className="text-sm font-medium">Filter by Bus Number</label>
              <Select value={selectedBus} onValueChange={setSelectedBus}>
                <SelectTrigger id="bus-filter">
                  <SelectValue placeholder="Select Bus" />
                </SelectTrigger>
                <SelectContent>
                  {uniqueBuses.map(bus => (
                    <SelectItem key={bus} value={bus}>
                      {bus === 'all' ? 'All Buses' : bus}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student Name</TableHead>
                <TableHead>Village</TableHead>
                <TableHead>Bus Number</TableHead>
                <TableHead>Uses Bus</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">
                    <Link href={`/dashboard/bus-management/${student.id}`} className="hover:underline text-primary">
                      {student.name}
                    </Link>
                  </TableCell>
                  <TableCell>{student.address}</TableCell>
                  <TableCell>{student.busNumber || 'N/A'}</TableCell>
                  <TableCell>
                    <Badge
                      variant={student.usesBus ? 'default' : 'secondary'}
                      className={student.usesBus ? 'bg-green-500' : ''}
                    >
                      {student.usesBus ? 'Yes' : 'No'}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
               {filteredStudents.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                    No students found matching your criteria.
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
