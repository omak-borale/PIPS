
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { seedDatabaseAction } from '@/app/actions';
import { useRouter } from 'next/navigation';

export default function SeedButton() {
  const [isSeeding, setIsSeeding] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleSeedDatabase = async () => {
    setIsSeeding(true);
    const result = await seedDatabaseAction();
    if (result.success) {
      toast({
        title: "Database Seeded",
        description: result.message,
      });
      router.refresh();
    } else {
      toast({
        variant: "destructive",
        title: "Seeding Failed",
        description: result.error,
      });
    }
    setIsSeeding(false);
  };

  return (
    <Button onClick={handleSeedDatabase} disabled={isSeeding}>
      {isSeeding ? 'Seeding...' : 'Seed Database'}
    </Button>
  );
}
