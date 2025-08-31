
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
import Link from 'next/link';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { Student } from '@/lib/types';

type BusManagementClientProps = {
  students: Student[];
};

export default function BusManagementClient({ students }: BusManagementClientProps) {
  const [selectedVillage, setSelectedVillage] = useState('all');
  const [selectedBus, setSelectedBus] = useState('all');

  const uniqueVillages = ['all', ...Array.from(new Set(students.map(s => s.address)))];
  const uniqueBuses = ['all', ...Array.from(new Set(students.filter(s => s.busNumber).map(s => s.busNumber!)))];

  const filteredStudents = students.filter(student => {
    const villageMatch = selectedVillage === 'all' || student.address === selectedVillage;
    const busMatch = selectedBus === 'all' || student.busNumber === selectedBus;
    return villageMatch && busMatch;
  });

  return (
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
                <SelectItem value="all">All Villages</SelectItem>
                {uniqueVillages.filter(v => v !== 'all').map(village => (
                  <SelectItem key={village} value={village}>
                    {village}
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
                <SelectItem value="all">All Buses</SelectItem>
                {uniqueBuses.filter(b => b !== 'all').map(bus => (
                  <SelectItem key={bus} value={bus}>
                    {bus}
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
  );
}
