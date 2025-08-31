
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { seedDatabaseAction } from '@/app/actions';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function SeedButton() {
  const [isSeeding, setIsSeeding] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleSeedDatabase = async () => {
    setIsSeeding(true);
    const result = await seedDatabaseAction();

    if (result && result.success) {
      toast({
        title: 'Database Seeded',
        description: 'The database has been populated with initial data.',
      });
      router.refresh();
    } else {
      toast({
        variant: 'destructive',
        title: 'Seeding Failed',
        description: result?.error || 'An unknown error occurred.',
      });
    }
    setIsSeeding(false);
  };

  return (
    <Button onClick={handleSeedDatabase} disabled={isSeeding}>
      {isSeeding ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Seeding...
        </>
      ) : (
        'Seed Database'
      )}
    </Button>
  );
}
