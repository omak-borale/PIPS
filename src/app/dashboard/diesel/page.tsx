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
import { Progress } from '@/components/ui/progress';
import { busRoutes } from '@/lib/data';
import { format, parseISO } from 'date-fns';

export default function DieselManagementPage() {
  return (
    <main className="flex-1 p-4 md:p-6 lg:p-8">
      <Card>
        <CardHeader>
          <CardTitle>Diesel Management</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bus Number</TableHead>
                <TableHead>Driver Name</TableHead>
                <TableHead>Fuel Level</TableHead>
                <TableHead>Last Refueled</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {busRoutes.map((route) => (
                <TableRow key={route.id}>
                  <TableCell className="font-medium">{route.busNumber}</TableCell>
                  <TableCell>{route.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={route.fuelLevel} className="w-32" />
                      <span>{route.fuelLevel}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                     {format(parseISO(route.lastFueled), 'PPP')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
}
