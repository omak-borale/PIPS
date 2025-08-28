import type { Arrival } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

type ArrivalTimesProps = {
  arrivals: Arrival[];
};

const getStatusColor = (status: Arrival['status']) => {
    switch (status) {
        case 'On Time':
            return 'bg-green-500 hover:bg-green-600';
        case 'Delayed':
            return 'bg-red-500 hover:bg-red-600';
        case 'Early':
            return 'bg-yellow-500 hover:bg-yellow-600';
        default:
            return 'bg-secondary';
    }
}

export default function ArrivalTimes({ arrivals }: ArrivalTimesProps) {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">Arrivals Time</h3>
      <p className="text-sm text-muted-foreground">
        Real-time arrivals for your selected stop.
      </p>
      <div className="space-y-4">
        {arrivals.map((arrival, index) => (
          <Card key={index} className="flex items-center p-4 justify-between transition-all hover:bg-muted/50">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-primary/10 text-primary rounded-md">
                <p className="font-bold text-lg">{arrival.route}</p>
              </div>
              <div>
                <p className="font-semibold">{arrival.destination}</p>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" /> Arriving in {arrival.time}
                </p>
              </div>
            </div>
            <Badge className={cn("text-white", getStatusColor(arrival.status))}>{arrival.status}</Badge>
          </Card>
        ))}
      </div>
    </div>
  );
}
