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
import { Users, Bus } from 'lucide-react';
import { students } from '@/lib/data';
import Link from 'next/link';

export default function BusManagementPage() {
  const studentsUsingBus = students.filter((student) => student.usesBus).length;
  const studentsNotUsingBus = students.length - studentsUsingBus;

  return (
    <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Students Using Bus
            </CardTitle>
            <Bus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{studentsUsingBus}</div>
            <p className="text-xs text-muted-foreground">
              out of {students.length} total students
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Students Not Using Bus
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{studentsNotUsingBus}</div>
            <p className="text-xs text-muted-foreground">
              out of {students.length} total students
            </p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Student Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student Name</TableHead>
                <TableHead>Uses Bus</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">
                    <Link href={`/dashboard/bus-management/${student.id}`} className="hover:underline text-primary">
                      {student.name}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={student.usesBus ? 'default' : 'secondary'}
                      className={student.usesBus ? 'bg-green-500' : ''}
                    >
                      {student.usesBus ? 'Yes' : 'No'}
                    </Badge>
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