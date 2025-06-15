"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import NavUser from "./NavUser";
import { useUser } from "@/context/user.provider";
import { sidebarMenuItems } from "@/constants/sidebarMenuItems";
import { TRole } from "@/types";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import SidebarLoading from "@/app/(commonLayout)/Components/UI/Loading/SidebarLoading";

const LayoutSidebar = () => {
  const { user: userData, isLoading } = useUser();
  const pathname = usePathname();

  if (isLoading) {
    return <SidebarLoading />;
  }

  if (!userData?.role) {
    return null;
  }

  const currentUserRole: TRole = userData?.role;

  let user: { name: string; email: string; avatar: string } | null = null;

  if (userData.role === "SUPER_ADMIN") {
    user = {
      name: "Super User",
      email: userData.email,
      avatar: "https://avatar.iran.liara.run/public",
    };
  } else if (!userData.employees) {
    user = {
      name: "Setup Employee",
      email: userData.email,
      avatar: "https://avatar.iran.liara.run/public",
    };
  } else {
    user = {
      name: userData.employees.firstName,
      email: userData.email,
      avatar:
        userData.employees.additionalDocuments?.recentPhotograph ||
        "https://avatar.iran.liara.run/public",
    };
  }

  const filteredItems = sidebarMenuItems.filter((item) =>
    item.roles.includes(currentUserRole)
  );

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredItems.map((item) => {
                const active = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link
                        href={item.url}
                        className={cn(
                          "flex items-center gap-2 p-2 rounded-md hover:bg-muted",
                          active && "bg-violet-100 font-semibold text-primary"
                        )}
                      >
                        <item.icon className="w-4 h-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
};

export default LayoutSidebar;
