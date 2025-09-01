
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { Loader2, IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { VillageFee } from "@/lib/types";

const formSchema = z.object({
  villageName: z.string().min(1, "Village name is required."),
  feeAmount: z.coerce.number().min(0, "Fee must be a positive number."),
});

type AddVillageFeeFormProps = {
  onAddFee: (values: Omit<VillageFee, 'id'>) => Promise<void>;
};

export default function AddVillageFeeForm({ onAddFee }: AddVillageFeeFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      villageName: "",
      feeAmount: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    await onAddFee(values);
    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="villageName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Village Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Sonala" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="feeAmount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fee Amount</FormLabel>
               <div className="relative">
                <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input type="number" placeholder="e.g., 1200" className="pl-8" {...field} />
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end pt-2">
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Fee
          </Button>
        </div>
      </form>
    </Form>
  );
}
