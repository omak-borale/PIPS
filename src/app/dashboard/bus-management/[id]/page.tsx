

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { notFound } from 'next/navigation';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Phone, User, Bus, School, IndianRupee, MapPin } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import type { Student } from '@/lib/types';
import { getStudentsAction } from '@/app/actions';

export default async function StudentDetailPage({ params }: { params: { id: string } }) {
  const studentId = params.id;
  const allStudents = await getStudentsAction();
  const student = allStudents.find((s) => s.id === studentId);

  if (!student) {
    notFound();
  }

  return (
    <main className="flex-1 p-4 md:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Button asChild variant="outline" size="icon">
            <Link href="/dashboard/bus-management">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back to Bus Management</span>
            </Link>
          </Button>
          <h1 className="text-2xl font-bold">Student Details</h1>
        </div>
        <Card>
          <CardHeader className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="text-3xl">
                {student.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <CardTitle className="text-3xl">{student.name}</CardTitle>
              <CardDescription>
                Detailed information for {student.name}.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Student Name</p>
                  <p className="font-medium">{student.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <School className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Class</p>
                  <p className="font-medium">{student.class} '{student.section}'</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Bus className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Bus Number</p>
                  <p className="font-medium">{student.busNumber || 'N/A'}</p>
                </div>
              </div>
               <div className="flex items-center gap-3">
                <IndianRupee className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Fees (₹)</p>
                  <p className="font-medium">{student.fees?.toLocaleString() || 'N/A'}</p>
                </div>
              </div>
               <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Village</p>
                  <p className="font-medium">{student.village || 'N/A'}</p>
                </div>
              </div>
               <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Parent's Contact</p>
                  <p className="font-medium">{student.parentContact || 'N/A'}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
