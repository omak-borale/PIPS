
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { Loader2 } from "lucide-react";

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
import { toast } from "@/hooks/use-toast";
import type { BusRoute } from "@/lib/types";
import { updateBusRoute } from "@/app/actions";


const formSchema = z.object({
  name: z.string().min(1, "Driver Name is required."),
  description: z.string().min(1, "Village routes are required."),
  busNumber: z.string().min(1, "Bus number is required."),
  status: z.enum(["Active", "Inactive"]),
});

type EditRouteFormProps = {
    route: BusRoute;
    onRouteUpdated: (updatedRoute: BusRoute) => void;
}

export default function EditRouteForm({ route, onRouteUpdated }: EditRouteFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: route.name,
      description: route.description,
      busNumber: route.busNumber,
      status: route.status,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const updatedRouteData: BusRoute = {
      ...route,
      ...values,
    };

    const result = await updateBusRoute(updatedRouteData);
    setIsLoading(false);

    if (result.success) {
        toast({
            title: "Route Updated",
            description: `Successfully updated the ${values.name} route.`
        });
        onRouteUpdated(result.data);
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
              <FormLabel>Driver Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., John Doe" {...field} />
              </FormControl>
              <FormDescription>The name of the driver.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Village Routes</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Town Hall to West Village" {...field} />
              </FormControl>
              <FormDescription>A brief description of the route's path.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="busNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bus Number</FormLabel>
              <FormControl>
                <Input placeholder="e.g., B-42" {...field} />
              </FormControl>
              <FormDescription>The number of the bus assigned to this route.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
               <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Set whether the route is currently active or not.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
           <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Changes
          </Button>
        </div>
      </form>
    </Form>
  );
}
