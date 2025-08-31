

import { getStudentsAction } from '@/app/actions';
import StudentLocatorClient from '@/components/bus-watch/student-locator-client';

const StudentLocatorPage = async () => {
  const allStudents = await getStudentsAction();
  const studentsWithLocation = allStudents.filter(s => s.lat && s.lon);
  
  return (
    <main className="flex-1 p-4 md:p-6 lg:p-8">
      <StudentLocatorClient students={studentsWithLocation} />
    </main>
  );
};

export default StudentLocatorPage;
