

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
import { getBusRoutesAction } from '@/app/actions';

export default async function RoutesPage() {
  const busRoutes = await getBusRoutesAction();
  
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
                <TableHead>Bus Number</TableHead>
                <TableHead>Driver Name</TableHead>
                <TableHead>Route</TableHead>
                <TableHead>Contact</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {busRoutes.map((route) => {
                return (
                  <TableRow key={route.id}>
                    <TableCell className="font-medium">{route.busNumber}</TableCell>
                    <TableCell>{route.driverName}</TableCell>
                    <TableCell>{route.route}</TableCell>
                    <TableCell>{route.contact}</TableCell>
                  </TableRow>
                );
              })}
               {busRoutes.length === 0 && (
                <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                        No bus routes found.
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
