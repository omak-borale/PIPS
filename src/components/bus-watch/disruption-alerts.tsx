'use client';

import { useState } from 'react';
import { AlertTriangle, Bell, Bot, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getDisruptionAnalysis } from '@/app/actions';
import type { AnalyzeBusDisruptionsOutput } from '@/ai/flows/analyze-bus-disruptions';

export default function DisruptionAlerts() {
  const [analysis, setAnalysis] = useState<AnalyzeBusDisruptionsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    setIsLoading(true);
    setError(null);
    setAnalysis(null);
    const result = await getDisruptionAnalysis();
    if (result.success) {
      setAnalysis(result.data);
    } else {
      setError(result.error);
    }
    setIsLoading(false);
  };

  return (
    <Card className="shadow-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <Bot className="h-6 w-6 text-primary" />
          <CardTitle className="text-lg font-headline">AI Disruption Analysis</CardTitle>
        </div>
        <Button onClick={handleAnalyze} disabled={isLoading} size="sm">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            'Analyze Disruptions'
          )}
        </Button>
      </CardHeader>
      <CardContent>
        {!isLoading && !analysis && !error && (
          <p className="text-muted-foreground text-sm">Click "Analyze Disruptions" to get the latest AI-powered updates on service status.</p>
        )}
        {isLoading && (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}
        {error && (
           <div className="text-destructive flex items-center gap-2 text-sm">
             <AlertTriangle className="h-4 w-4" />
             <p>{error}</p>
           </div>
        )}
        {analysis && (
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold flex items-center gap-2 mb-2"><AlertTriangle className="h-5 w-5 text-destructive" /> Potential Disruptions</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                {analysis.potentialDisruptions.map((disruption, index) => (
                  <li key={index}>{disruption}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold flex items-center gap-2 mb-2"><Bell className="h-5 w-5 text-accent" /> Recommendations</h3>
              <p className="text-sm">{analysis.recommendations}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
