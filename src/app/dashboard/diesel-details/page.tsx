
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
import { getDieselEntries } from '@/lib/data';
import { format, parseISO } from 'date-fns';
import { useState, useEffect } from 'react';
import type { DieselEntry } from '@/lib/types';

export default function DieselDetailsPage() {
  const [dieselEntries, setDieselEntries] = useState<DieselEntry[]>([]);
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
    async function fetchData() {
        const entries = await getDieselEntries();
        setDieselEntries(entries);
    }
    fetchData();
  }, []);


  return (
    <main className="flex-1 p-4 md:p-6 lg:p-8">
      <Card>
        <CardHeader className="flex flex-row items-start justify-between">
          <div>
            <CardTitle>Diesel Details</CardTitle>
            <CardDescription>
              A log of all diesel refueling events.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Bus Number</TableHead>
                <TableHead>Diesel Pump Name</TableHead>
                <TableHead>Liters Added</TableHead>
                <TableHead>Amount (₹)</TableHead>
                <TableHead>Page Number</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dieselEntries.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell>{isClient ? format(parseISO(entry.date), 'PPP') : ''}</TableCell>
                  <TableCell className="font-medium">
                    {entry.busNumber}
                  </TableCell>
                  <TableCell>{entry.pumpName}</TableCell>
                  <TableCell>{entry.liters.toFixed(2)}</TableCell>
                  <TableCell>{entry.amount.toLocaleString()}</TableCell>
                  <TableCell>{entry.pageNumber}</TableCell>
                </TableRow>
              ))}
              {dieselEntries.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-8 text-muted-foreground"
                  >
                    No diesel entries found.
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
