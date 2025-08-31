
'use client';

import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';
import type { Student } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

type StudentLocatorClientProps = {
    students: (Student & { lat: number; lon: number })[];
}

const StudentLocatorClient = ({ students }: StudentLocatorClientProps) => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey || apiKey === "YOUR_API_KEY_HERE") {
    return (
        <div className="flex items-center justify-center h-[70vh]">
            <div className="text-center p-4 bg-muted rounded-lg">
            <h3 className="text-lg font-semibold">Map not available</h3>
            <p className="text-muted-foreground">
                Please provide a Google Maps API key in your .env.local file and restart the server.
            </p>
            </div>
        </div>
    );
  }
  
  const defaultCenter = students.length > 0
    ? { lat: students[0].lat, lng: students[0].lon } 
    : { lat: 37.7749, lng: -122.4194 };

  return (
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
                    ))}
                </Map>
            </APIProvider>
         </CardContent>
      </Card>
  );
};

export default StudentLocatorClient;
