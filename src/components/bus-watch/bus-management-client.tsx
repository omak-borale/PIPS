
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
import Link from 'next/link';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { Student } from '@/lib/types';
import { Input } from '../ui/input';

type BusManagementClientProps = {
  students: Student[];
};

export default function BusManagementClient({ students }: BusManagementClientProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBus, setSelectedBus] = useState('all');

  const uniqueBuses = ['all', ...Array.from(new Set(students.filter(s => s.busNumber).map(s => s.busNumber!)))];

  const filteredStudents = students.filter(student => {
    const busMatch = selectedBus === 'all' || student.busNumber === selectedBus;
    const searchMatch = searchTerm === '' || student.name.toLowerCase().includes(searchTerm.toLowerCase());
    return busMatch && searchMatch;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Student Details</CardTitle>
        <CardDescription>
          Filter students by bus number or search by name.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 mb-6">
           <div className="flex-1">
            <label htmlFor="search-filter" className="text-sm font-medium">Search by Name</label>
            <Input 
              id="search-filter"
              placeholder="Enter student name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
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
              <TableHead>Class</TableHead>
              <TableHead>Bus Number</TableHead>
              <TableHead>Fees (₹)</TableHead>
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
                <TableCell>{student.class} '{student.section}'</TableCell>
                <TableCell>{student.busNumber || 'N/A'}</TableCell>
                <TableCell>{student.fees?.toLocaleString()}</TableCell>
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
