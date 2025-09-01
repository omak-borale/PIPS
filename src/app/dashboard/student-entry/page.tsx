import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import AddStudentForm from '@/components/bus-watch/add-student-form';
import { getVillageFeesAction } from '@/app/actions';

export default async function StudentEntryPage() {
  const villageFees = await getVillageFeesAction();

  return (
    <main className="flex-1 p-4 md:p-6 lg:p-8">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Student Entry</CardTitle>
            <CardDescription>
              Add a new student to the system.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AddStudentForm villageFees={villageFees} />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
