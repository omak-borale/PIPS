import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import AddRouteForm from '@/components/bus-watch/add-route-form';
import { useRouter } from 'next/navigation';


export default function AddBusRoutePage() {
  
  return (
    <main className="flex-1 p-4 md:p-6 lg:p-8">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Add New Bus Route</CardTitle>
            <CardDescription>
              Fill in the details below to add a new route to the system.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AddRouteForm onRouteAdded={() => {
                // useRouter is a client hook, so we can't use it directly here.
                // The form itself will handle redirection.
            }} />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
