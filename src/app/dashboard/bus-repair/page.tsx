
"use client";

import { useState } from 'react';
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { busRoutes as initialBusRoutes } from '@/lib/data';
import { format, subDays, parseISO } from 'date-fns';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Wrench, Phone, CircleDollarSign, NotebookText, Hammer, Banknote, PlusCircle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import type { BusRoute, ServiceHistory } from '@/lib/types';
import AddRepairForm from '@/components/bus-watch/add-repair-form';

export default function BusRepairPage() {
  const [busRoutes, setBusRoutes] = useState<BusRoute[]>(initialBusRoutes);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const getRepairStatus = (route: BusRoute) => {
    const lastServiceDate = route.serviceHistory && route.serviceHistory.length > 0
      ? parseISO(route.serviceHistory[0].date)
      : subDays(parseISO(route.lastFueled), 20); // Mocking service date if no history

    const daysSinceService =
      (new Date().getTime() - lastServiceDate.getTime()) / (1000 * 3600 * 24);

    if (daysSinceService > 90) {
      return { text: 'Needs Service', color: 'bg-red-500' };
    }
    if (daysSinceService > 60) {
      return { text: 'Service Due', color: 'bg-yellow-500' };
    }
    return { text: 'Good', color: 'bg-green-500' };
  };

  const handleAddRepair = (busNumber: string, newService: Omit<ServiceHistory, 'date'> & { date: Date }) => {
    setBusRoutes(prevRoutes =>
      prevRoutes.map(route => {
        if (route.busNumber === busNumber) {
          const updatedHistory = [
            { ...newService, date: newService.date.toISOString() },
            ...(route.serviceHistory || []),
          ];
          return { ...route, serviceHistory: updatedHistory };
        }
        return route;
      })
    );
    setIsDialogOpen(false);
  };


  return (
    <main className="flex-1 p-4 md:p-6 lg:p-8">
      <div className="space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Bus Repair Status</CardTitle>
              <CardDescription>
                Overview of the maintenance status for each bus. Click on a service date to see details.
              </CardDescription>
            </div>
             <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <PlusCircle className="mr-2" />
                  Add Repair Details
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Add New Bus Repair Details</DialogTitle>
                  <DialogDescription>
                    Fill out the form below to log a new service event for a bus.
                  </DialogDescription>
                </DialogHeader>
                <AddRepairForm onAddRepair={handleAddRepair} />
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Bus Number</TableHead>
                  <TableHead>Driver Name</TableHead>
                  <TableHead>Last Service</TableHead>
                  <TableHead>Repair Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {busRoutes.map((route) => {
                  const status = getRepairStatus(route);
                  const lastServiceHistory = route.serviceHistory?.[0];
                   const lastServiceDate = lastServiceHistory
                    ? parseISO(lastServiceHistory.date)
                    : subDays(parseISO(route.lastFueled), 20);

                  return (
                    <TableRow key={route.id}>
                      <TableCell className="font-medium">
                        {route.busNumber}
                      </TableCell>
                      <TableCell>{route.name}</TableCell>
                      <TableCell>
                        {lastServiceHistory ? (
                           <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="link" className="p-0 h-auto">
                                {format(lastServiceDate, 'PPP')}
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Service Details for {route.busNumber}</DialogTitle>
                                <DialogDescription>
                                   Service performed on {format(lastServiceDate, 'PPP')}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4 py-4">
                                <div className="grid grid-cols-2 gap-4">
                                   <div className="flex items-center gap-4">
                                    <Wrench className="h-5 w-5 text-muted-foreground" />
                                    <div>
                                      <p className="text-sm text-muted-foreground">Machine Name</p>
                                      <p className="font-medium">{lastServiceHistory.machineName}</p>
                                    </div>
                                  </div>
                                   <div className="flex items-center gap-4">
                                    <Phone className="h-5 w-5 text-muted-foreground" />
                                    <div>
                                      <p className="text-sm text-muted-foreground">Contact Number</p>
                                      <p className="font-medium">{lastServiceHistory.contactNumber}</p>
                                    </div>
                                  </div>
                                </div>

                                <div className="flex items-start gap-4">
                                  <NotebookText className="h-5 w-5 text-muted-foreground mt-1" />
                                   <div>
                                    <p className="text-sm text-muted-foreground">Remark</p>
                                    <p className="font-medium">{lastServiceHistory.remark}</p>
                                  </div>
                                </div>

                                <Separator />

                                <div className="space-y-2">
                                  <div className="flex justify-between items-center">
                                      <div className="flex items-center gap-4">
                                        <CircleDollarSign className="h-5 w-5 text-muted-foreground" />
                                        <p className="text-sm">Labour Charge</p>
                                      </div>
                                      <p className="font-medium">₹{lastServiceHistory.labourCharge.toLocaleString()}</p>
                                  </div>
                                  <div className="flex justify-between items-center">
                                      <div className="flex items-center gap-4">
                                        <Hammer className="h-5 w-5 text-muted-foreground" />
                                        <p className="text-sm">Total Repair Charge</p>
                                      </div>
                                      <p className="font-medium">₹{lastServiceHistory.totalRepairCharge.toLocaleString()}</p>
                                  </div>
                                </div>

                                <Separator />
                                
                                <div className="flex justify-between items-center text-lg font-bold text-primary">
                                    <div className="flex items-center gap-4">
                                      <Banknote className="h-6 w-6" />
                                      <p>Total Amount</p>
                                    </div>
                                    <p>₹{(lastServiceHistory.labourCharge + lastServiceHistory.totalRepairCharge).toLocaleString()}</p>
                                </div>

                              </div>
                            </DialogContent>
                          </Dialog>
                        ) : (
                           format(lastServiceDate, 'PPP')
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="default"
                          className={cn('text-white', status.color)}
                        >
                          {status.text}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
