
import { getArrivalsAction } from '@/app/actions';
import ArrivalTimesClient from '@/components/bus-watch/arrival-times-client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Clock } from 'lucide-react';

export default async function ArrivalTimesPage() {
  const initialArrivals = await getArrivalsAction();

  return (
    <main className="flex-1 p-4 md:p-6 lg:p-8">
      <div className="space-y-6 max-w-4xl mx-auto">
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
            <ArrivalTimesClient initialArrivals={initialArrivals} />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
