
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { addStudent } from "@/app/actions";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(1, "Student Name is required."),
  fatherName: z.string().min(1, "Father's Name is required."),
  parentContact: z.string().min(1, "Contact number is required."),
  address: z.string().min(1, "Address is required."),
  usesBus: z.boolean().default(false),
  busNumber: z.string().optional(),
}).refine(data => {
    if (data.usesBus && !data.busNumber) {
        return false;
    }
    return true;
}, {
    message: "Bus number is required if student uses bus service.",
    path: ["busNumber"],
});


export default function AddStudentForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      fatherName: "",
      parentContact: "",
      address: "",
      usesBus: false,
    },
  });

  const usesBus = form.watch("usesBus");

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const result = await addStudent(values);
    setIsLoading(false);

    if (result.success) {
      toast({
          title: "Student Added",
          description: `Successfully added ${values.name}.`
      });
      form.reset();
      router.push('/dashboard/bus-management');
    } else {
        toast({
            variant: "destructive",
            title: "Error",
            description: result.error,
        });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Student Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Jane Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="fatherName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Father Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="parentContact"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact.No</FormLabel>
              <FormControl>
                <Input placeholder="e.g., 555-123-4567" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Village / Address</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Sunnyvale" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="usesBus"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel>Uses Bus Service</FormLabel>
                <FormDescription>
                  Does this student use the school bus service?
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        {usesBus && (
          <FormField
            control={form.control}
            name="busNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bus Number</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a bus for the student" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {initialBusRoutes.map(route => (
                      <SelectItem key={route.id} value={route.busNumber}>{route.busNumber} ({route.name})</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>Select the bus the student is assigned to.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <div className="flex justify-end">
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Add Student
          </Button>
        </div>
      </form>
    </Form>
  );
}
