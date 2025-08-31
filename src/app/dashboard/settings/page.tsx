
"use client";

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { KeyRound, Info } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';


export default function SettingsPage() {
  return (
    <main className="flex-1 p-4 md:p-6 lg:p-8">
      <div className="space-y-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold">Settings</h1>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <KeyRound className="h-5 w-5" />
              Login Settings
            </CardTitle>
            <CardDescription>
              Manage admin and driver login credentials here.
            </CardDescription>
          </CardHeader>
           <CardContent>
            <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle>Default Credentials</AlertTitle>
              <AlertDescription>
                <p>For this prototype, the following credentials are used:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li><b>Admin:</b> username: `SIDRAM`, password: `123456`</li>
                  <li><b>Driver:</b> username: `driver`, password: `password`</li>
                </ul>
                 <p className="mt-2 text-xs text-muted-foreground">Password changes are not supported in this demo.</p>
              </AlertDescription>
            </Alert>
          </CardContent>
           <CardFooter className="border-t px-6 py-4">
            <Button disabled>Save Changes</Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
