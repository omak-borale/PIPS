
'use client';

import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';
import { getStudentsAction } from '@/app/actions';
import type { Student } from '@/lib/types';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const StudentLocatorPage = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    async function fetchStudents() {
      const allStudents = await getStudentsAction();
      setStudents(allStudents.filter(s => s.lat && s.lon));
    }
    fetchStudents();
  }, []);

  if (!apiKey || apiKey === 'YOUR_API_KEY_HERE') {
    return (
      <main className="flex-1 p-4 md:p-6 lg:p-8 flex items-center justify-center">
        <div className="text-center p-4 bg-muted rounded-lg">
          <h3 className="text-lg font-semibold">Map not available</h3>
          <p className="text-muted-foreground">
            Please provide a Google Maps API key in your .env.local file.
          </p>
        </div>
      </main>
    );
  }
  
  const defaultCenter = students.length > 0 && students[0].lat && students[0].lon
    ? { lat: students[0].lat, lng: students[0].lon } 
    : { lat: 37.7749, lng: -122.4194 };


  return (
    <main className="flex-1 p-4 md:p-6 lg:p-8">
       <Card>
        <CardHeader>
          <CardTitle>Student Locator</CardTitle>
          <CardDescription>
            Last known location of students on the map.
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[600px] p-0 rounded-b-lg overflow-hidden">
            <APIProvider apiKey={apiKey}>
                <Map
                    defaultCenter={defaultCenter}
                    defaultZoom={12}
                    mapId="student_locator_map"
                    gestureHandling={'greedy'}
                    disableDefaultUI={true}
                >
                    {students.map((student) => (
                    student.lat && student.lon && (
                         <AdvancedMarker key={student.id} position={{ lat: student.lat, lng: student.lon }} title={student.name}>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Avatar className="h-9 w-9 border-2 border-primary shadow-lg cursor-pointer">
                                            <AvatarFallback>
                                                {student.name.charAt(0)}
                                            </AvatarFallback>
                                        </Avatar>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>{student.name}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </AdvancedMarker>
                    )
                    ))}
                </Map>
            </APIProvider>
         </CardContent>
      </Card>
    </main>
  );
};

export default StudentLocatorPage;
