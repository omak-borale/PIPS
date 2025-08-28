import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import LoginForm from '@/components/bus-watch/login-form';
import { Bus } from 'lucide-react';

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-muted/40">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
             <div className="flex justify-center items-center mb-4">
                <div className="p-3 bg-primary text-primary-foreground rounded-full">
                  <Bus className="h-8 w-8" />
                </div>
              </div>
            <CardTitle>Login to Bus Management</CardTitle>
            <CardDescription>
              Enter your credentials to access the dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
