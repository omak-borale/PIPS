import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import AddStudentForm from '@/components/bus-watch/add-student-form';

export default function StudentEntryPage() {
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
            <AddStudentForm />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
