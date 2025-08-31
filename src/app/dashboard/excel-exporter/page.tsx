
import ExcelExporterClient from '@/components/bus-watch/excel-exporter-client';

export default function ExcelExporterPage() {
  return (
    <main className="flex-1 p-4 md:p-6 lg:p-8">
      <div className="max-w-2xl mx-auto">
        <ExcelExporterClient />
      </div>
    </main>
  );
}
