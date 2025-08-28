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
import { Badge } from '@/components/ui/badge';
import { busRoutes } from '@/lib/data';
import { format, subDays, parseISO } from 'date-fns';
import { cn } from '@/lib/utils';

export default function BusRepairPage() {

  const getRepairStatus = (lastFueled: string) => {
    const lastServiceDate = subDays(parseISO(lastFueled), 20); // Mocking service date
    const daysSinceService = (new Date().getTime() - lastServiceDate.getTime()) / (1000 * 3600 * 24);

    if (daysSinceService > 90) {
      return { text: 'Needs Service', color: 'bg-red-500' };
    }
    if (daysSinceService > 60) {
      return { text: 'Service Due', color: 'bg-yellow-500' };
    }
    return { text: 'Good', color: 'bg-green-500' };
  };

  return (
    <main className="flex-1 p-4 md:p-6 lg:p-8">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Bus Repair Status</CardTitle>
            <CardDescription>
              Overview of the maintenance status for each bus.
            </CardDescription>
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
                  const status = getRepairStatus(route.lastFueled);
                  const lastServiceDate = subDays(parseISO(route.lastFueled), 20);

                  return (
                    <TableRow key={route.id}>
                      <TableCell className="font-medium">{route.busNumber}</TableCell>
                      <TableCell>{route.name}</TableCell>
                      <TableCell>{format(lastServiceDate, 'PPP')}</TableCell>
                      <TableCell>
                        <Badge variant="default" className={cn('text-white', status.color)}>
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
