
'use client';

import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';
import type { RealTimeBusLocation, BusStop } from '@/lib/types';
import BusIcon from '@/components/icons/bus-icon';
import { MapPin } from 'lucide-react';
import { Card } from '../ui/card';

type MapViewProps = {
  buses: RealTimeBusLocation[];
  stops: BusStop[];
};

const MapView = ({ buses, stops }: MapViewProps) => {
  // IMPORTANT: You need to add your Google Maps API key to your environment variables.
  // Create a .env.local file in the root of your project and add the following line:
  // NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="YOUR_API_KEY"
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey || apiKey === 'YOUR_API_KEY_HERE') {
    return (
      <div className="flex items-center justify-center h-full bg-muted">
        <div className="text-center p-4">
          <h3 className="text-lg font-semibold">Map not available</h3>
          <p className="text-muted-foreground">
            Please provide a Google Maps API key in your .env.local file.
          </p>
        </div>
      </div>
    );
  }
  
  const defaultCenter = buses && buses.length > 0 
    ? { lat: buses[0].lat, lng: buses[0].lon } 
    : { lat: 37.7749, lng: -122.4194 };


  return (
    <APIProvider apiKey={apiKey}>
      <Map
        defaultCenter={defaultCenter}
        defaultZoom={13}
        mapId="buswatch_map"
        gestureHandling={'greedy'}
        disableDefaultUI={true}
      >
        {buses.map((bus) => (
          <AdvancedMarker key={bus.busId} position={{ lat: bus.lat, lng: bus.lon }}>
            <Card className="p-1 rounded-full bg-primary text-primary-foreground shadow-lg">
                <BusIcon className="w-5 h-5" />
            </Card>
          </AdvancedMarker>
        ))}

        {stops.map((stop) => (
          <AdvancedMarker key={stop.id} position={stop.position} title={stop.name}>
             <MapPin className="w-6 h-6 text-accent fill-accent" />
          </AdvancedMarker>
        ))}
      </Map>
    </APIProvider>
  );
};

export default MapView;
