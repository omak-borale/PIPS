import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Bell, AlertTriangle, Info } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const alerts = [
  {
    id: 1,
    type: 'delay',
    title: 'Bus B-102 Delayed',
    description: 'Bus B-102 on Route 2 is running 15 minutes behind schedule due to heavy traffic.',
    time: '10 minutes ago',
  },
  {
    id: 2,
    type: 'service',
    title: 'Service Due for B-104',
    description: 'Bus B-104 is due for its regular 90-day maintenance check.',
    time: '2 hours ago',
  },
  {
    id: 3,
    type: 'fuel',
    title: 'Low Fuel: B-104',
    description: 'Bus B-104 has a low fuel level (20%). Please refuel soon.',
    time: '1 day ago',
  },
    {
    id: 4,
    type: 'info',
    title: 'Route 3 Inactive',
    description: 'Route 3 (Bus B-103) has been marked as inactive in the system.',
    time: '2 days ago',
  },
];

const getAlertInfo = (type: string) => {
  switch (type) {
    case 'delay':
      return { icon: <AlertTriangle className="h-5 w-5 text-yellow-500" />, color: 'border-yellow-500' };
    case 'service':
      return { icon: <AlertTriangle className="h-5 w-5 text-red-500" />, color: 'border-red-500' };
    case 'fuel':
        return { icon: <AlertTriangle className="h-5 w-5 text-orange-500" />, color: 'border-orange-500' };
    default:
      return { icon: <Info className="h-5 w-5 text-blue-500" />, color: 'border-blue-500' };
  }
};


export default function AlertsPage() {
  return (
    <main className="flex-1 p-4 md:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-6 w-6" />
              Recent Alerts
            </CardTitle>
            <CardDescription>
              A log of all recent system alerts and notifications.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alerts.map((alert) => {
                 const { icon, color } = getAlertInfo(alert.type);
                return (
                <div key={alert.id} className={cn("flex items-start gap-4 p-4 rounded-lg border-l-4", color)}>
                  <div className="mt-1">{icon}</div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                       <h4 className="font-semibold">{alert.title}</h4>
                       <p className="text-xs text-muted-foreground">{alert.time}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">{alert.description}</p>
                  </div>
                </div>
              )})}
               {alerts.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <Bell className="mx-auto h-12 w-12" />
                  <p className="mt-4">No new alerts.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
