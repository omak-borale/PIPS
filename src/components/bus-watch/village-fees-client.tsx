
"use client";

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { MapPinned, PlusCircle, IndianRupee } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/dialog';
import type { VillageFee } from '@/lib/types';
import AddVillageFeeForm from './add-village-fee-form';
import { toast } from '@/hooks/use-toast';
import { addVillageFeeAction } from '@/app/actions';

type VillageFeesClientProps = {
  initialFees: VillageFee[];
};

export default function VillageFeesClient({ initialFees }: VillageFeesClientProps) {
  const [fees, setFees] = useState<VillageFee[]>(initialFees);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddFee = async (values: Omit<VillageFee, 'id'>) => {
    const result = await addVillageFeeAction(values);
    if (result.success) {
      setFees(prev => [...prev, result.data]);
      toast({
        title: 'Fee Added',
        description: `Successfully added fee for ${values.villageName}.`,
      });
      setIsDialogOpen(false);
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: result.error,
      });
    }
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <MapPinned className="h-6 w-6" />
              Village Fees Structure
            </CardTitle>
            <CardDescription>
              Define and manage bus fee structures based on village locations.
            </CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2" />
                Add Village Fee
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Village Fee</DialogTitle>
                <DialogDescription>
                  Set a specific bus fee for a village.
                </DialogDescription>
              </DialogHeader>
              <AddVillageFeeForm onAddFee={handleAddFee} />
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Village Name</TableHead>
                <TableHead className="text-right">Fee Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fees.map((fee) => (
                <TableRow key={fee.id}>
                  <TableCell className="font-medium">{fee.villageName}</TableCell>
                  <TableCell className="text-right flex items-center justify-end gap-1">
                     <IndianRupee className="h-4 w-4" /> 
                    {fee.feeAmount.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
              {fees.length === 0 && (
                <TableRow>
                  <TableCell colSpan={2} className="text-center py-12 text-muted-foreground">
                    No village-specific fees have been added yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
