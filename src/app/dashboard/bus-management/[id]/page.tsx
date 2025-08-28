
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getStudents } from '@/lib/data';
import { notFound, useParams } from 'next/navigation';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Phone, Home, User, GraduationCap, Bus } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { Student } from '@/lib/types';

export default function StudentDetailPage() {
  const params = useParams();
  const studentId = typeof params.id === 'string' ? params.id : '';
  const [student, setStudent] = useState<Student | undefined>(undefined);
  
  useEffect(() => {
    async function fetchStudent() {
      const allStudents = await getStudents();
      const currentStudent = allStudents.find((s) => s.id === studentId);
      setStudent(currentStudent);
    }
    if (studentId) {
      fetchStudent();
    }
  }, [studentId]);


  if (!student) {
    // You might want to show a loading state here
    if (student === undefined) return <div>Loading...</div>; 
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Student Name</p>
                    <p className="font-medium">{student.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Father Name</p>
                    <p className="font-medium">{student.fatherName}</p>
                  </div>
                </div>
                 <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Parent's Contact</p>
                    <p className="font-medium">{student.parentContact}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Home className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Village</p>
                    <p className="font-medium">{student.address}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Bus className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Uses Bus Service</p>
                     <Badge
                      variant={student.usesBus ? 'default' : 'secondary'}
                      className={student.usesBus ? 'bg-green-500 text-white' : ''}
                    >
                      {student.usesBus ? 'Yes' : 'No'}
                    </Badge>
                  </div>
                </div>
                {student.usesBus && student.busNumber && (
                   <div className="flex items-center gap-3">
                    <Bus className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Bus Name</p>
                      <p className="font-medium">{student.busNumber}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
