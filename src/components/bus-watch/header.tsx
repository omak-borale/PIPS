import { SidebarTrigger } from '@/components/ui/sidebar';

const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 border-b bg-card">
      <div className="flex items-center gap-3">
        <SidebarTrigger />
        <h1 className="text-2xl font-bold font-headline text-primary">
          Bus management
        </h1>
      </div>
    </header>
  );
};

export default Header;
