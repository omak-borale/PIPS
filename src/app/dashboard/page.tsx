
'use client';

import MapView from '@/components/bus-watch/map-view';
import BusInfoTabs from '@/components/bus-watch/bus-info-tabs';
import { getStops, getRealTimeBusLocations } from '@/lib/data';
import { getArrivalsAction, seedDatabaseAction } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { useEffect, useState } from 'react';
import type { BusStop, Arrival, RealTimeBusLocation } from '@/lib/types';


export default function DashboardPage() {
  const [stops, setStops] = useState<BusStop[]>([]);
  const [arrivals, setArrivals] = useState<Arrival[]>([]);
  const [realTimeBusLocations, setRealTimeBusLocations] = useState<RealTimeBusLocation[]>([]);
  const [isSeeding, setIsSeeding] = useState(false);

  useEffect(() => {
    async function fetchData() {
        const stopsData = await getStops();
        setStops(stopsData);

        const arrivalsData = await getArrivalsAction();
        setArrivals(arrivalsData);

        const busLocationsData = await getRealTimeBusLocations();
        setRealTimeBusLocations(busLocationsData);
    }
    fetchData();
  }, []);

  const handleSeedDatabase = async () => {
    setIsSeeding(true);
    const result = await seedDatabaseAction();
    if (result.success) {
      toast({
        title: "Database Seeded",
        description: result.message,
      });
      // Refetch data after seeding
      const arrivalsData = await getArrivalsAction();
      setArrivals(arrivalsData);
    } else {
      toast({
        variant: "destructive",
        title: "Seeding Failed",
        description: result.error,
      });
    }
    setIsSeeding(false);
  };


  return (
    <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-4">
       <div className="flex justify-end">
            <Button onClick={handleSeedDatabase} disabled={isSeeding}>
                {isSeeding ? 'Seeding...' : 'Seed Database'}
            </Button>
        </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
        <div className="lg:col-span-2 h-full flex flex-col gap-6">
          <div className="flex-1 rounded-xl overflow-hidden shadow-lg border">
            <MapView buses={realTimeBusLocations} stops={stops} />
          </div>
        </div>
        <div className="lg:col-span-1 h-full flex flex-col">
          <BusInfoTabs stops={stops} arrivals={arrivals} />
        </div>
      </div>
    </main>
  );
}
