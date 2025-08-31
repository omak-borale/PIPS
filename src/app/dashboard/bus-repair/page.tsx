

import BusRepairClient from '@/components/bus-watch/bus-repair-client';
import { getBusRoutesAction } from '@/app/actions';

export default async function BusRepairPage() {
  const busRoutes = await getBusRoutesAction();

  return (
    <main className="flex-1 p-4 md:p-6 lg:p-8">
      <BusRepairClient initialBusRoutes={busRoutes} />
    </main>
  );
}
