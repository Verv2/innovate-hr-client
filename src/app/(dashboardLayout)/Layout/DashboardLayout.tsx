"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import LayoutSidebar from "../Components/Shared/LayoutSidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <LayoutSidebar />
      <section>
        <SidebarTrigger />
        {children}
      </section>
    </SidebarProvider>
  );
};

export default DashboardLayout;
