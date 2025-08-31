
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { BusRoute, Arrival } from '@/lib/types';
import { PlusCircle, MoreVertical, KeyRound, Info, Loader2, Trash, Clock } from 'lucide-react';
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import AddRouteForm from '@/components/bus-watch/add-route-form';
import EditRouteForm from '@/components/bus-watch/edit-route-form';
import AddArrivalForm from '@/components/bus-watch/add-arrival-form';
import EditArrivalForm from '@/components/bus-watch/edit-arrival-form';
import { getBusRoutesAction, deleteBusRoute, getArrivalsAction, deleteArrival } from '@/app/actions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';


export default function SettingsPage() {
  const [busRoutes, setBusRoutes] = useState<BusRoute[]>([]);
  const [arrivals, setArrivals] = useState<Arrival[]>([]);

  // Dialog states for Routes
  const [isAddRouteDialogOpen, setIsAddRouteDialogOpen] = useState(false);
  const [isEditRouteDialogOpen, setIsEditRouteDialogOpen] = useState(false);
  const [isDeleteRouteDialogOpen, setIsDeleteRouteDialogOpen] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<BusRoute | null>(null);
  const [isDeletingRoute, setIsDeletingRoute] = useState(false);
  
  // Dialog states for Arrivals
  const [isAddArrivalDialogOpen, setIsAddArrivalDialogOpen] = useState(false);
  const [isEditArrivalDialogOpen, setIsEditArrivalDialogOpen] = useState(false);
  const [isDeleteArrivalDialogOpen, setIsDeleteArrivalDialogOpen] = useState(false);
  const [selectedArrival, setSelectedArrival] = useState<Arrival | null>(null);
  const [isDeletingArrival, setIsDeletingArrival] = useState(false);


  useEffect(() => {
    async function fetchData() {
        const routes = await getBusRoutesAction();
        setBusRoutes(routes);
        const arrivalsData = await getArrivalsAction();
        setArrivals(arrivalsData);
    }
    fetchData();
  }, []);

  // Handlers for Bus Routes
  const handleRouteAdded = (newRoute: BusRoute) => {
    setBusRoutes(prevRoutes => [ ...prevRoutes, newRoute ]);
    setIsAddRouteDialogOpen(false);
  };

  const handleRouteUpdated = (updatedRoute: BusRoute) => {
    setBusRoutes(prevRoutes => prevRoutes.map(route => route.id === updatedRoute.id ? updatedRoute : route));
    setIsEditRouteDialogOpen(false);
    setSelectedRoute(null);
  };

  const handleEditRouteClick = (route: BusRoute) => {
    setSelectedRoute(route);
    setIsEditRouteDialogOpen(true);
  };

  const handleDeleteRouteClick = (route: BusRoute) => {
    setSelectedRoute(route);
    setIsDeleteRouteDialogOpen(true);
  };

  const confirmDeleteRoute = async () => {
    if (!selectedRoute) return;
    setIsDeletingRoute(true);
    const result = await deleteBusRoute(selectedRoute.id);
    setIsDeletingRoute(false);

    if (result.success) {
      toast({
        title: "Route Deleted",
        description: `Successfully deleted the ${selectedRoute.name} route.`,
      });
      setBusRoutes(prevRoutes => prevRoutes.filter(route => route.id !== selectedRoute.id));
      setIsDeleteRouteDialogOpen(false);
      setSelectedRoute(null);
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: result.error,
      });
    }
  };

  // Handlers for Arrivals
  const handleArrivalAdded = (newArrival: Arrival) => {
    setArrivals(prev => [...prev, newArrival]);
    setIsAddArrivalDialogOpen(false);
  };

  const handleArrivalUpdated = (updatedArrival: Arrival) => {
    setArrivals(prev => prev.map(item => item.id === updatedArrival.id ? updatedArrival : item));
    setIsEditArrivalDialogOpen(false);
    setSelectedArrival(null);
  };

  const handleEditArrivalClick = (arrival: Arrival) => {
    setSelectedArrival(arrival);
    setIsEditArrivalDialogOpen(true);
  };

  const handleDeleteArrivalClick = (arrival: Arrival) => {
    setSelectedArrival(arrival);
    setIsDeleteArrivalDialogOpen(true);
  };

  const confirmDeleteArrival = async () => {
    if (!selectedArrival) return;
    setIsDeletingArrival(true);
    const result = await deleteArrival(selectedArrival.id);
    setIsDeletingArrival(false);

    if (result.success) {
      toast({
        title: "Arrival Deleted",
        description: `Successfully deleted the arrival for route ${selectedArrival.route}.`,
      });
      setArrivals(prev => prev.filter(item => item.id !== selectedArrival.id));
      setIsDeleteArrivalDialogOpen(false);
      setSelectedArrival(null);
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: result.error,
      });
    }
  };
  
    const getStatusColor = (status: Arrival['status']) => {
        switch (status) {
            case 'On Time':
            return 'bg-green-500';
            case 'Delayed':
            return 'bg-red-500';
            case 'Early':
            return 'bg-yellow-500';
            default:
            return 'bg-secondary';
        }
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
                  <li><b>Admin:</b> username: `SIDRAM`, password: `123456`</li>
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
              <Dialog open={isAddRouteDialogOpen} onOpenChange={setIsAddRouteDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <PlusCircle className="mr-2" />
                    Add New Route
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-sm">
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
                          <DropdownMenuItem onClick={() => handleEditRouteClick(route)}>
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDeleteRouteClick(route)}
                            className="text-destructive"
                          >
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
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Arrival Times
            </CardTitle>
            <CardDescription>
              Manage arrival times displayed on the dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-end mb-4">
              <Dialog open={isAddArrivalDialogOpen} onOpenChange={setIsAddArrivalDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <PlusCircle className="mr-2" />
                    Add New Arrival
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add a New Arrival Time</DialogTitle>
                    <DialogDescription>
                      Fill in the details below to add a new arrival time.
                    </DialogDescription>
                  </DialogHeader>
                  <AddArrivalForm onArrivalAdded={handleArrivalAdded} />
                </DialogContent>
              </Dialog>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Route</TableHead>
                  <TableHead>Destination</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {arrivals.map((arrival) => (
                  <TableRow key={arrival.id}>
                    <TableCell className="font-medium">{arrival.route}</TableCell>
                    <TableCell>{arrival.destination}</TableCell>
                     <TableCell>{arrival.time}</TableCell>
                    <TableCell>
                      <Badge
                        variant="default"
                        className={cn('text-white', getStatusColor(arrival.status))}
                      >
                        {arrival.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEditArrivalClick(arrival)}>
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDeleteArrivalClick(arrival)}
                            className="text-destructive"
                          >
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


        {/* Edit Route Dialog */}
        <Dialog open={isEditRouteDialogOpen} onOpenChange={setIsEditRouteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Bus Route</DialogTitle>
              <DialogDescription>
                Update the details for the selected route.
              </DialogDescription>
            </DialogHeader>
            {selectedRoute && <EditRouteForm route={selectedRoute} onRouteUpdated={handleRouteUpdated} />}
          </DialogContent>
        </Dialog>
        
        {/* Edit Arrival Dialog */}
        <Dialog open={isEditArrivalDialogOpen} onOpenChange={setIsEditArrivalDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Arrival Time</DialogTitle>
              <DialogDescription>
                Update the details for the selected arrival.
              </DialogDescription>
            </DialogHeader>
            {selectedArrival && <EditArrivalForm arrival={selectedArrival} onArrivalUpdated={handleArrivalUpdated} />}
          </DialogContent>
        </Dialog>

        {/* Delete Route Alert Dialog */}
        <AlertDialog open={isDeleteRouteDialogOpen} onOpenChange={setIsDeleteRouteDialogOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the bus route
                        for <span className="font-semibold">{selectedRoute?.name}</span>.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={confirmDeleteRoute} disabled={isDeletingRoute} className="bg-destructive hover:bg-destructive/90">
                        {isDeletingRoute ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Trash className="mr-2 h-4 w-4" />}
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
        
        {/* Delete Arrival Alert Dialog */}
        <AlertDialog open={isDeleteArrivalDialogOpen} onOpenChange={setIsDeleteArrivalDialogOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the arrival entry
                        for route <span className="font-semibold">{selectedArrival?.route}</span>.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={confirmDeleteArrival} disabled={isDeletingArrival} className="bg-destructive hover:bg-destructive/90">
                        {isDeletingArrival ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Trash className="mr-2 h-4 w-4" />}
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

      </div>
    </main>
  );
}
