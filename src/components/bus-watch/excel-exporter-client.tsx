
'use client';

import { useState } from 'react';
import {
  getStudentsAction,
  getBusRoutesAction,
  getDieselEntriesAction,
  getDailyLogsAction,
  getAllDataAsJsonAction,
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
import { Download, Loader2, FileSpreadsheet, FileJson } from 'lucide-react';
import type { Student, BusRoute, DieselEntry, DailyLog } from '@/lib/types';
import { Separator } from '../ui/separator';

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

// Utility to trigger file download
function downloadFile(content: string, filename: string, contentType: string) {
  const blob = new Blob([content], { type: contentType });
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
  const [isCsvLoading, setIsCsvLoading] = useState(false);
  const [isJsonLoading, setIsJsonLoading] = useState(false);

  const handleExportCsv = async () => {
    setIsCsvLoading(true);
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
      downloadFile(csv, filename, 'text/csv;charset=utf-8;');

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
      setIsCsvLoading(false);
    }
  };

  const handleExportJson = async () => {
    setIsJsonLoading(true);
    try {
        const result = await getAllDataAsJsonAction();
        if(result.success) {
            downloadFile(result.data, 'data.json', 'application/json');
            toast({
                title: 'Export Successful',
                description: 'Successfully downloaded data.json.',
            });
        } else {
            throw new Error(result.error);
        }
    } catch (error) {
      console.error('JSON Export failed:', error);
      toast({
        variant: 'destructive',
        title: 'JSON Export Failed',
        description: 'An unexpected error occurred while exporting the data to JSON.',
      });
    } finally {
        setIsJsonLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileSpreadsheet className="h-6 w-6" />
          Excel Workbook
        </CardTitle>
        <CardDescription>
          Export specific data types as a CSV file, or download all application data as a single JSON file.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className='space-y-4'>
            <h3 className="text-lg font-medium">Export to CSV</h3>
            <div className='space-y-2'>
                <label
                    htmlFor="data-type-select"
                    className="block text-sm font-medium text-muted-foreground"
                >
                    Data to Export
                </label>
                <Select
                    value={dataType}
                    onValueChange={(value: DataType) => setDataType(value)}
                >
                    <SelectTrigger id="data-type-select" className="max-w-sm">
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
            <div className="flex justify-start">
            <Button onClick={handleExportCsv} disabled={isCsvLoading}>
                {isCsvLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                <Download className="mr-2 h-4 w-4" />
                )}
                Export to CSV
            </Button>
            </div>
        </div>

        <Separator />

        <div className='space-y-4'>
            <h3 className="text-lg font-medium">Export All Data</h3>
            <p className="text-sm text-muted-foreground">Download a single JSON file containing all students, routes, logs, and settings from the database.</p>
            <Button onClick={handleExportJson} disabled={isJsonLoading} variant="secondary">
                {isJsonLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    <FileJson className="mr-2 h-4 w-4" />
                )}
                Export All to JSON
            </Button>
        </div>

      </CardContent>
    </Card>
  );
}
