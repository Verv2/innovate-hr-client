"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import LayoutSidebar from "./Components/Shared/LayoutSidebar";
import TopNavbar from "./Components/Shared/TopNavbar/TopNavbar";

const DashboardLayout2 = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <LayoutSidebar />
      <section className="w-full">
        <div className="flex items-center justify-between p-4 bg-gray-100 w-full">
          <SidebarTrigger />
          <TopNavbar />
        </div>
        {children}
      </section>
    </SidebarProvider>
  );
};

export default DashboardLayout2;
