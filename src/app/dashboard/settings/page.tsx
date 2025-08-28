
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
import { PlusCircle, MoreVertical, KeyRound, User, Shield } from 'lucide-react';
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
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getBusRoutesAction } from '@/app/actions';

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

  const handleAddRoute = (newRoute: Omit<BusRoute, 'id' | 'fuelLevel' | 'lastFueled'>) => {
    // This part would ideally be a server action to update the data source
    const updatedRoute: BusRoute = {
      ...newRoute,
      id: `route-${busRoutes.length + 1}`,
      fuelLevel: 100, // Default fuel level
      lastFueled: new Date().toISOString(),
    }
    setBusRoutes(prevRoutes => [ ...prevRoutes, updatedRoute ]);
    // NOTE: In a real app, you would call a server action here to persist the data
    // For now, we just update the local state.
    setIsDialogOpen(false);
  }

  const handleChangePassword = (event: React.FormEvent<HTMLFormElement>, role: 'Admin' | 'Driver') => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const username = formData.get('username');
    const newPassword = formData.get('password');

    // In a real app, you'd have validation and an API call here.
    // For now, we'll just show a success message.
    if (username && newPassword) {
         toast({
            title: `${role} Credentials Updated`,
            description: `Credentials for ${username} have been updated.`,
        });
        (event.target as HTMLFormElement).reset();
    } else {
         toast({
            variant: 'destructive',
            title: 'Error',
            description: 'Please fill out all fields.',
        });
    }
  }


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
            <Tabs defaultValue="admin">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="admin">
                  <Shield className="mr-2" /> Admin
                </TabsTrigger>
                <TabsTrigger value="driver">
                  <User className="mr-2" /> Driver
                </TabsTrigger>
              </TabsList>
              <TabsContent value="admin" className="pt-4">
                 <form onSubmit={(e) => handleChangePassword(e, 'Admin')} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="adminUsername">Admin Username</Label>
                        <Input id="adminUsername" name="username" defaultValue="admin" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="adminPassword">Admin Password</Label>
                        <Input id="adminPassword" name="password" type="password" placeholder="Enter new password" required />
                    </div>
                     <div className="flex justify-end pt-2">
                        <Button type="submit">Update Admin Credentials</Button>
                    </div>
                 </form>
              </TabsContent>
              <TabsContent value="driver" className="pt-4">
                  <form onSubmit={(e) => handleChangePassword(e, 'Driver')} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="driverUsername">Driver Username</Label>
                        <Input id="driverUsername" name="username" defaultValue="driver" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="driverPassword">Driver Password</Label>
                        <Input id="driverPassword" name="password" type="password" placeholder="Enter new password" required />
                    </div>
                    <div className="flex justify-end pt-2">
                        <Button type="submit">Update Driver Credentials</Button>
                    </div>
                 </form>
              </TabsContent>
            </Tabs>
          </CardContent>
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
                  <AddRouteForm onAddRoute={handleAddRoute} />
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
