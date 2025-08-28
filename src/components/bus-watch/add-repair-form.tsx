
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { initialBusRoutes } from "@/lib/data";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import type { ServiceHistory } from "@/lib/types";

const formSchema = z.object({
  busNumber: z.string().min(1, "Bus number is required."),
  date: z.date({ required_error: "A service date is required." }),
  machineName: z.string().min(1, "Machine name is required."),
  contactNumber: z.string().min(1, "Contact number is required."),
  labourCharge: z.coerce.number().min(0, "Labour charge must be a positive number."),
  totalRepairCharge: z.coerce.number().min(0, "Repair charge must be a positive number."),
  remark: z.string().min(1, "Remark is required."),
});

type AddRepairFormProps = {
  onAddRepair: (busNumber: string, data: Omit<ServiceHistory, 'date'> & { date: Date }) => void;
};

export default function AddRepairForm({ onAddRepair }: AddRepairFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      busNumber: "",
      date: new Date(),
      machineName: "",
      contactNumber: "",
      labourCharge: 0,
      totalRepairCharge: 0,
      remark: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onAddRepair(values.busNumber, values);
    toast({
      title: "Repair Logged",
      description: `Successfully logged a repair for bus ${values.busNumber}.`,
    });
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
            <FormField
            control={form.control}
            name="busNumber"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Bus Number</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a bus" />
                    </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                    {initialBusRoutes.map((route) => (
                        <SelectItem key={route.id} value={route.busNumber}>
                        {route.busNumber} ({route.name})
                        </SelectItem>
                    ))}
                    </SelectContent>
                </Select>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                    <FormItem className="flex flex-col">
                    <FormLabel>Service Date</FormLabel>
                    <Popover>
                        <PopoverTrigger asChild>
                        <FormControl>
                            <Button
                            variant={"outline"}
                            className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                            )}
                            >
                            {field.value ? (
                                format(field.value, "PPP")
                            ) : (
                                <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                        </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                        />
                        </PopoverContent>
                    </Popover>
                    <FormMessage />
                    </FormItem>
                )}
                />
        </div>
        <div className="grid grid-cols-2 gap-4">
            <FormField
            control={form.control}
            name="machineName"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Machine Name / Part</FormLabel>
                <FormControl>
                    <Input placeholder="e.g., Brake Pads" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="contactNumber"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Mechanic Contact Number</FormLabel>
                <FormControl>
                    <Input placeholder="e.g., 555-123-4567" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="labourCharge"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Labour Charge (₹)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="e.g., 5000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="totalRepairCharge"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Repair Charge (₹)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="e.g., 2500" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="remark"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Remark</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe the work that was done."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end pt-2">
          <Button type="submit">Add Repair Entry</Button>
        </div>
      </form>
    </Form>
  );
}
