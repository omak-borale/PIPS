import { Bus } from 'lucide-react';

const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 border-b bg-card">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary text-primary-foreground rounded-lg">
          <Bus className="h-6 w-6" />
        </div>
        <h1 className="text-2xl font-bold font-headline text-primary">BusWatch</h1>
      </div>
    </header>
  );
};

export default Header;
