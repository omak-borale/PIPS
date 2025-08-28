
"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { BusRoute } from '@/lib/types';
import { PlusCircle, MoreVertical, KeyRound, User, Shield, Info } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import AddRouteForm from '@/components/bus-watch/add-route-form';
import { getBusRoutesAction } from '@/app/actions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function SettingsPage() {
  const [busRoutes, setBusRoutes] = useState<BusRoute[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  useEffect(() => {
    async function fetchData() {
        const routes = await getBusRoutesAction();
        setBusRoutes(routes);
    }
    fetchData();
  }, []);

  const handleRouteAdded = (newRoute: BusRoute) => {
    setBusRoutes(prevRoutes => [ ...prevRoutes, newRoute ]);
    setIsDialogOpen(false);
  };


  return (
    <main className="flex-1 p-4 md:p-6 lg:p-8">
      <div className="space-y-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold">Settings</h1>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <KeyRound className="h-5 w-5" />
              Login Settings
            </CardTitle>
            <CardDescription>
              Manage admin and driver login credentials here.
            </CardDescription>
          </CardHeader>
           <CardContent>
            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>Default Credentials</AlertTitle>
              <AlertDescription>
                <p>For this prototype, the following credentials are used:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li><b>Admin:</b> username: `admin`, password: `password`</li>
                  <li><b>Driver:</b> username: `driver`, password: `password`</li>
                </ul>
                 <p className="mt-2 text-xs text-muted-foreground">Password changes are not supported in this demo.</p>
              </AlertDescription>
            </Alert>
          </CardContent>
           <CardFooter className="border-t px-6 py-4">
            <Button disabled>Save Changes</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Bus Routes</CardTitle>
            <CardDescription>
              Manage your bus routes here. You can add, edit, or remove routes.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-end mb-4">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <PlusCircle className="mr-2" />
                    Add New Route
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add a New Bus Route</DialogTitle>
                    <DialogDescription>
                      Fill in the details below to add a new route to the
                      system.
                    </DialogDescription>
                  </DialogHeader>
                  <AddRouteForm onRouteAdded={handleRouteAdded} />
                </DialogContent>
              </Dialog>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Driver Name</TableHead>
                  <TableHead>Village Routes</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Bus Number</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {busRoutes.map((route) => (
                  <TableRow key={route.id}>
                    <TableCell className="font-medium">{route.name}</TableCell>
                    <TableCell>{route.description}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          route.status === 'Active' ? 'default' : 'destructive'
                        }
                        className={
                          route.status === 'Active' ? 'bg-green-500' : ''
                        }
                      >
                        {route.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{route.busNumber}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
