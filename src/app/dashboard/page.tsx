
import DisruptionAlerts from '@/components/bus-watch/disruption-alerts';
import MapView from '@/components/bus-watch/map-view';
import BusInfoTabs from '@/components/bus-watch/bus-info-tabs';
import { getBuses, getStops, getArrivals } from '@/lib/data';

export default async function DashboardPage() {
  const buses = await getBuses();
  const stops = await getStops();
  const arrivals = await getArrivals();

  return (
    <main className="flex-1 p-4 md:p-6 lg:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
        <div className="lg:col-span-2 h-full flex flex-col gap-6">
          <DisruptionAlerts />
          <div className="flex-1 rounded-xl overflow-hidden shadow-lg border">
            <MapView buses={buses} stops={stops} />
          </div>
        </div>
        <div className="lg:col-span-1 h-full flex flex-col">
          <BusInfoTabs stops={stops} arrivals={arrivals} />
        </div>
      </div>
    </main>
  );
}
