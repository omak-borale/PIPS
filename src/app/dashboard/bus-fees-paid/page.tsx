
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import BusFeesPaidForm from '@/components/bus-watch/bus-fees-paid-form';
import { getStudentsAction, getBusRoutesAction, getBusFeesSettingsAction, getVillageFeesAction } from '@/app/actions';

export default async function BusFeesPaidPage() {
  const students = await getStudentsAction();
  const busRoutes = await getBusRoutesAction();
  const feeSettings = await getBusFeesSettingsAction();
  const villageFees = await getVillageFeesAction();
  const studentsWithBus = students.filter(s => s.usesBus);

  return (
    <main className="flex-1 p-4 md:p-6 lg:p-8">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Bus Fees Paid Form</CardTitle>
            <CardDescription>
              Log a new bus fee payment for a student.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <BusFeesPaidForm 
              students={studentsWithBus} 
              busRoutes={busRoutes}
              feeSettings={feeSettings}
              villageFees={villageFees}
            />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
