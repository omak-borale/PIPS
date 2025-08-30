
import DisruptionAlerts from '@/components/bus-watch/disruption-alerts';

export default function DisruptionAnalysisPage() {
  return (
    <main className="flex-1 p-4 md:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <DisruptionAlerts />
      </div>
    </main>
  );
}
