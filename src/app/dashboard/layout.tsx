import Header from '@/components/bus-watch/header';
import {
  SidebarProvider,
  Sidebar,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { LayoutDashboard, Route, Bus, Settings, Bell } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { ReactNode } from 'react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex flex-col h-screen bg-background text-foreground">
        <div className="flex h-full">
          <Sidebar>
            <SidebarHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary text-primary-foreground rounded-lg">
                  <Bus className="h-6 w-6" />
                </div>
                <h1 className="text-xl font-bold font-headline text-primary">
                  Patri swamy international public school
                </h1>
              </div>
            </SidebarHeader>
            <SidebarContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton href="/dashboard" tooltip="Dashboard">
                    <LayoutDashboard />
                    Dashboard
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton href="/dashboard/routes" tooltip="Routes">
                    <Route />
                    Routes
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton href="#" tooltip="Buses">
                    <Bus />
                    Buses
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton href="#" tooltip="Alerts">
                    <Bell />
                    Alerts
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton href="/dashboard/settings" tooltip="Settings">
                    <Settings />
                    Settings
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <div className="flex items-center gap-2 p-2">
                    <Avatar>
                      <AvatarImage src="https://picsum.photos/100/100" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold">Admin User</span>
                      <span className="text-xs text-muted-foreground">
                        boraleojai@gmail.com
                      </span>
                    </div>
                  </div>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarFooter>
          </Sidebar>
          <SidebarInset>
            <Header />
            {children}
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
}
