import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import DieselEntryForm from '@/components/bus-watch/diesel-entry-form';

export default function DieselEntryPage() {
  return (
    <main className="flex-1 p-4 md:p-6 lg:p-8">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Diesel Entry</CardTitle>
            <CardDescription>
              Log a new diesel refueling event for a bus.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DieselEntryForm />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
