import Header from '@/components/bus-watch/header';
import MapView from '@/components/bus-watch/map-view';
import DisruptionAlerts from '@/components/bus-watch/disruption-alerts';
import BusInfoTabs from '@/components/bus-watch/bus-info-tabs';
import { buses, stops, arrivals } from '@/lib/data';
import {
  SidebarProvider,
  Sidebar,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarHeader,
  SidebarTrigger,
  SidebarContent,
  SidebarFooter,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  Route,
  Bus,
  Settings,
  Bell,
  PanelLeft,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';

export default function DashboardPage() {
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
                <h1 className="text-2xl font-bold font-headline text-primary">
                  BusWatch
                </h1>
              </div>
            </SidebarHeader>
            <SidebarContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    href="/dashboard"
                    isActive
                    tooltip="Dashboard"
                  >
                    <LayoutDashboard />
                    Dashboard
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton href="#" tooltip="Routes">
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
                  <SidebarMenuButton href="#" tooltip="Settings">
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
                        admin@buswatch.com
                      </span>
                    </div>
                  </div>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarFooter>
          </Sidebar>
          <SidebarInset>
            <Header />
            <main className="flex-1 overflow-hidden p-4 md:p-6 lg:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
                <div className="lg:col-span-2 h-full flex flex-col gap-6">
                  <DisruptionAlerts />
                  <div className="flex-1 rounded-xl overflow-hidden shadow-lg border">
                    <MapView buses={buses} stops={stops} />
                  </div>
                </div>
                <div className="lg:col-span-1 h-full flex flex-col">
                  <BusInfoTabs stops={stops} arrivals={arrivals} />
                </div>
              </div>
            </main>
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
}
