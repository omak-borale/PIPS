
import { getVillageFeesAction } from '@/app/actions';
import VillageFeesClient from '@/components/bus-watch/village-fees-client';


export default async function VillageFeesPage() {
    const initialFees = await getVillageFeesAction();
  return (
    <main className="flex-1 p-4 md:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <VillageFeesClient initialFees={initialFees} />
      </div>
    </main>
  );
}
