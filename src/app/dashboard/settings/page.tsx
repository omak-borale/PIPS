
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
import type { BusRoute } from '@/lib/types';
import { PlusCircle, MoreVertical, KeyRound, Info, Loader2, Trash } from 'lucide-react';
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
import { getBusRoutesAction, deleteBusRoute } from '@/app/actions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { toast } from '@/hooks/use-toast';

export default function SettingsPage() {
  const [busRoutes, setBusRoutes] = useState<BusRoute[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<BusRoute | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  
  useEffect(() => {
    async function fetchData() {
        const routes = await getBusRoutesAction();
        setBusRoutes(routes);
    }
    fetchData();
  }, []);

  const handleRouteAdded = (newRoute: BusRoute) => {
    setBusRoutes(prevRoutes => [ ...prevRoutes, newRoute ]);
    setIsAddDialogOpen(false);
  };

  const handleRouteUpdated = (updatedRoute: BusRoute) => {
    setBusRoutes(prevRoutes => prevRoutes.map(route => route.id === updatedRoute.id ? updatedRoute : route));
    setIsEditDialogOpen(false);
    setSelectedRoute(null);
  };

  const handleEditClick = (route: BusRoute) => {
    setSelectedRoute(route);
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = (route: BusRoute) => {
    setSelectedRoute(route);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedRoute) return;
    setIsDeleting(true);
    const result = await deleteBusRoute(selectedRoute.id);
    setIsDeleting(false);

    if (result.success) {
      toast({
        title: "Route Deleted",
        description: `Successfully deleted the ${selectedRoute.name} route.`,
      });
      setBusRoutes(prevRoutes => prevRoutes.filter(route => route.id !== selectedRoute.id));
      setIsDeleteDialogOpen(false);
      setSelectedRoute(null);
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: result.error,
      });
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
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
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
                          <DropdownMenuItem onClick={() => handleEditClick(route)}>
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDeleteClick(route)}
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
          <CardFooter className="border-t px-6 py-4">
            <Button disabled>Save Changes</Button>
          </CardFooter>
        </Card>

        {/* Edit Route Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
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

        {/* Delete Route Alert Dialog */}
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
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
                    <AlertDialogAction onClick={confirmDelete} disabled={isDeleting} className="bg-destructive hover:bg-destructive/90">
                        {isDeleting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Trash className="mr-2 h-4 w-4" />}
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

      </div>
    </main>
  );
}
