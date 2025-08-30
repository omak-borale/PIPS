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
import { LayoutDashboard, Route, Bus, Settings, Bell, Fuel, PencilLine, UserPlus, Wrench, BookText, User, ClipboardList, ListOrdered, Bot } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex flex-col h-screen bg-background text-foreground">
        <div className="flex h-full">
          <Sidebar>
            <SidebarHeader>
              <div className="flex items-center gap-3">
                <Image
                  src="https://picsum.photos/40/40"
                  alt="School Logo"
                  width={40}
                  height={40}
                  className="rounded-lg"
                  data-ai-hint="computer logo"
                />
                <h1 className="text-xl font-bold font-headline text-primary">
                  Patri swamy international public school
                </h1>
              </div>
            </SidebarHeader>
            <SidebarContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <Link href="/dashboard" passHref>
                    <SidebarMenuButton asChild tooltip="Dashboard">
                      <span>
                        <LayoutDashboard />
                        Dashboard
                      </span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
                 <SidebarMenuItem>
                   <Link href="/dashboard/driver" passHref>
                    <SidebarMenuButton asChild tooltip="Driver Dashboard">
                      <span>
                        <User />
                        Driver View
                      </span>
                    </SidebarMenuButton>
                   </Link>
                </SidebarMenuItem>
                <SidebarMenuItem>
                   <Link href="/dashboard/routes" passHref>
                    <SidebarMenuButton asChild tooltip="Routes">
                      <span>
                        <Route />
                        Routes
                      </span>
                    </SidebarMenuButton>
                   </Link>
                </SidebarMenuItem>
                 <SidebarMenuItem>
                   <Link href="/dashboard/diesel" passHref>
                    <SidebarMenuButton asChild tooltip="Diesel">
                      <span>
                        <Fuel />
                        Diesel Management
                      </span>
                    </SidebarMenuButton>
                   </Link>
                </SidebarMenuItem>
                <SidebarMenuItem>
                   <Link href="/dashboard/diesel-entry" passHref>
                    <SidebarMenuButton asChild tooltip="Diesel Entry">
                      <span>
                        <PencilLine />
                        Diesel Entry
                      </span>
                    </SidebarMenuButton>
                   </Link>
                </SidebarMenuItem>
                 <SidebarMenuItem>
                  <Link href="/dashboard/diesel-details" passHref>
                    <SidebarMenuButton asChild tooltip="Diesel Details">
                      <span>
                        <BookText />
                        Diesel Details
                      </span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <Link href="/dashboard/daily-log" passHref>
                    <SidebarMenuButton asChild tooltip="Daily Log">
                      <span>
                        <ClipboardList />
                        Daily Log
                      </span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
                 <SidebarMenuItem>
                  <Link href="/dashboard/daily-log-details" passHref>
                    <SidebarMenuButton asChild tooltip="Daily Log Details">
                      <span>
                        <ListOrdered />
                        Daily Log Details
                      </span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
                 <SidebarMenuItem>
                  <Link href="/dashboard/student-entry" passHref>
                    <SidebarMenuButton asChild tooltip="Student Entry">
                      <span>
                        <UserPlus />
                        Student Entry
                      </span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <Link href="/dashboard/bus-management" passHref>
                    <SidebarMenuButton asChild tooltip="Bus management">
                      <span>
                        <Bus />
                        Bus management
                      </span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <Link href="/dashboard/bus-repair" passHref>
                    <SidebarMenuButton asChild tooltip="Bus Repair">
                      <span>
                        <Wrench />
                        Bus Repair
                      </span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
                 <SidebarMenuItem>
                  <Link href="/dashboard/disruption-analysis" passHref>
                    <SidebarMenuButton asChild tooltip="Disruption Analysis">
                      <span>
                        <Bot />
                        AI Analysis
                      </span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <Link href="/dashboard/alerts" passHref>
                    <SidebarMenuButton asChild tooltip="Alerts">
                      <span>
                        <Bell />
                        Alerts
                      </span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarContent>
            <SidebarFooter>
              <SidebarMenu>
                <SidebarMenuItem>
                  <Link href="/dashboard/settings" passHref>
                    <SidebarMenuButton asChild tooltip="Settings">
                      <span>
                        <Settings />
                        Settings
                      </span>
                    </SidebarMenuButton>
                  </Link>
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
