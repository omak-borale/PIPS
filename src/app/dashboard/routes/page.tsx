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
import { busRoutes } from '@/lib/data';

export default function RoutesPage() {
  return (
    <main className="flex-1 overflow-hidden p-4 md:p-6 lg:p-8">
      <Card>
        <CardHeader>
          <CardTitle>Bus Routes</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Route</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Buses</TableHead>
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
                      className={route.status === 'Active' ? 'bg-green-500' : ''}
                    >
                      {route.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{route.busesRunning}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
}
