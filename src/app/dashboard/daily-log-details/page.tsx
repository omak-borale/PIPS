

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
import { format, parseISO } from 'date-fns';
import { getDailyLogsAction } from '@/app/actions';

export default async function DailyLogDetailsPage() {
  const dailyLogs = await getDailyLogsAction();

  return (
    <main className="flex-1 p-4 md:p-6 lg:p-8">
      <Card>
        <CardHeader className="flex flex-row items-start justify-between">
          <div>
            <CardTitle>Daily Log Details</CardTitle>
            <CardDescription>
              A log of all daily bus operational data.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Bus Number</TableHead>
                <TableHead>Start Time</TableHead>
                <TableHead>End Time</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dailyLogs.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell>{format(parseISO(entry.date), 'PPP')}</TableCell>
                  <TableCell className="font-medium">
                    {entry.busNumber}
                  </TableCell>
                  <TableCell>{entry.startTime}</TableCell>
                  <TableCell>{entry.endTime}</TableCell>
                  <TableCell>{entry.notes || 'N/A'}</TableCell>
                </TableRow>
              ))}
              {dailyLogs.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-8 text-muted-foreground"
                  >
                    No daily logs found.
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
