
import MapView from '@/components/bus-watch/map-view';
import BusInfoTabs from '@/components/bus-watch/bus-info-tabs';
import { getStops, getRealTimeBusLocations } from '@/lib/data';
import { getArrivalsAction } from '@/app/actions';

export default async function DashboardPage() {
  const stops = await getStops();
  const arrivals = await getArrivalsAction();
  const realTimeBusLocations = await getRealTimeBusLocations();

  return (
    <main className="flex-1 p-4 md:p-6 lg:p-8">
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
