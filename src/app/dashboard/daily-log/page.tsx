import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import DailyLogForm from '@/components/bus-watch/daily-log-form';

export default function DailyLogPage() {
  return (
    <main className="flex-1 p-4 md:p-6 lg:p-8">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Daily Bus Log</CardTitle>
            <CardDescription>
              Enter daily operational data for a bus.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DailyLogForm />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
