import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Welcome to BusWatch</h1>
        <p className="text-muted-foreground">Your real-time bus tracking and management solution.</p>
        <Button asChild>
          <Link href="/dashboard">
            Go to Dashboard
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
