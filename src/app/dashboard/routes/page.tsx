
"use client";
import {
  Card,
  CardContent,
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Users } from 'lucide-react';

export default function RoutesPage() {
  const getStudentCountForBus = (busNumber: string) => {
    return students.filter(student => student.usesBus && student.busNumber === busNumber).length;
  };

  return (
    <main className="flex-1 p-4 md:p-6 lg:p-8">
      <Card>
        <CardHeader>
          <CardTitle>Bus Routes</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Driver Name</TableHead>
                <TableHead>Village Routes</TableHead>
                <TableHead>Students on Bus</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Bus Number</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {busRoutes.map((route) => {
                const studentCount = getStudentCountForBus(route.busNumber);
                return (
                  <TableRow key={route.id}>
                    <TableCell className="font-medium">{route.name}</TableCell>
                    <TableCell>{route.description}</TableCell>
                    <TableCell className="font-medium text-center">{studentCount}</TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Badge
                            variant={
                              route.status === 'Active' ? 'default' : 'destructive'
                            }
                            className={`${route.status === 'Active' ? 'bg-green-500' : ''} cursor-pointer`}
                          >
                            {route.status}
                          </Badge>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                              <Users />
                              Student Count for {route.busNumber}
                            </DialogTitle>
                            <DialogDescription>
                              This bus route is assigned to {studentCount} students.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="py-4">
                            <p className="text-4xl font-bold text-center">{studentCount}</p>
                            <p className="text-sm text-muted-foreground text-center mt-2">
                              Students currently using this bus service.
                            </p>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                    <TableCell>{route.busNumber}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
}
