
'use client';

import { useState } from 'react';
import {
  getStudentsAction,
  getBusRoutesAction,
  getDieselEntriesAction,
  getDailyLogsAction,
} from '@/app/actions';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { Download, Loader2, FileSpreadsheet } from 'lucide-react';
import type { Student, BusRoute, DieselEntry, DailyLog } from '@/lib/types';

type DataType = 'students' | 'busRoutes' | 'dieselEntries' | 'dailyLogs';

// Utility to convert array of objects to CSV
function convertToCSV<T extends object>(data: T[]): string {
  if (data.length === 0) return '';
  const headers = Object.keys(data[0]);
  const csvRows = [
    headers.join(','),
    ...data.map(row =>
      headers
        .map(header => {
          let cell = (row as any)[header];
          // Handle complex objects like serviceHistory by JSON stringifying them
          if (typeof cell === 'object' && cell !== null) {
            cell = JSON.stringify(cell);
          }
          // Escape commas and quotes
          const strCell = String(cell);
          if (strCell.includes(',') || strCell.includes('"')) {
            return `"${strCell.replace(/"/g, '""')}"`;
          }
          return strCell;
        })
        .join(',')
    ),
  ];
  return csvRows.join('\n');
}

// Utility to trigger CSV download
function downloadCSV(csvString: string, filename: string) {
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

export default function ExcelExporterClient() {
  const [dataType, setDataType] = useState<DataType>('students');
  const [isLoading, setIsLoading] = useState(false);

  const handleExport = async () => {
    setIsLoading(true);
    try {
      let data: any[] = [];
      let filename = `${dataType}.csv`;

      switch (dataType) {
        case 'students':
          data = await getStudentsAction();
          break;
        case 'busRoutes':
          data = await getBusRoutesAction();
          break;
        case 'dieselEntries':
          data = await getDieselEntriesAction();
          break;
        case 'dailyLogs':
          data = await getDailyLogsAction();
          break;
      }

      if (data.length === 0) {
        toast({
          variant: 'destructive',
          title: 'No Data Found',
          description: `There is no data to export for ${dataType}.`,
        });
        return;
      }

      const csv = convertToCSV(data);
      downloadCSV(csv, filename);

      toast({
        title: 'Export Successful',
        description: `Successfully downloaded ${filename}.`,
      });
    } catch (error) {
      console.error('Export failed:', error);
      toast({
        variant: 'destructive',
        title: 'Export Failed',
        description: 'An unexpected error occurred while exporting the data.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileSpreadsheet className="h-6 w-6" />
          Excel Data Exporter
        </CardTitle>
        <CardDescription>
          Select a data type and click export to download a CSV file.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <label
            htmlFor="data-type-select"
            className="block text-sm font-medium text-muted-foreground mb-2"
          >
            Data to Export
          </label>
          <Select
            value={dataType}
            onValueChange={(value: DataType) => setDataType(value)}
          >
            <SelectTrigger id="data-type-select">
              <SelectValue placeholder="Select data type..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="students">Students</SelectItem>
              <SelectItem value="busRoutes">Bus Routes</SelectItem>
              <SelectItem value="dieselEntries">Diesel Entries</SelectItem>
              <SelectItem value="dailyLogs">Daily Logs</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex justify-end">
          <Button onClick={handleExport} disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Download className="mr-2 h-4 w-4" />
            )}
            Export to CSV
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
