
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { MapPinned } from 'lucide-react';

export default function VillageFeesPage() {
  return (
    <main className="flex-1 p-4 md:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPinned className="h-6 w-6" />
              Village Fees Structure
            </CardTitle>
            <CardDescription>
              Define and manage bus fee structures based on village locations. This feature is coming soon.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12 text-muted-foreground">
              <p>This page is under construction.</p>
              <p className="text-sm">You will soon be able to set different fee amounts for each village.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
