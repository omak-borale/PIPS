"use client"
import { SidebarTrigger } from '@/components/ui/sidebar';
import { usePathname } from 'next/navigation';

const getTitleFromPath = (path: string) => {
  if (path === '/dashboard') return 'Dashboard';
  if (path.startsWith('/dashboard/routes')) return 'Routes';
  if (path.startsWith('/dashboard/diesel-entry')) return 'Diesel Entry';
  if (path.startsWith('/dashboard/diesel')) return 'Diesel Management';
  if (path.startsWith('/dashboard/settings')) return 'Settings';
  return 'Bus Management';
}

const Header = () => {
  const pathname = usePathname();
  const title = getTitleFromPath(pathname);

  return (
    <header className="flex items-center justify-between p-4 border-b bg-card">
      <div className="flex items-center gap-3">
        <SidebarTrigger />
        <h1 className="text-2xl font-bold font-headline text-primary">
          {title}
        </h1>
      </div>
    </header>
  );
};

export default Header;
