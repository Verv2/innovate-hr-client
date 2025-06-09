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

const user = {
  name: "UserName",
  email: "m@example.com",
  avatar: "https://avatar.iran.liara.run/public",
};

const LayoutSidebar = () => {
  const { user: userData } = useUser();
  const pathname = usePathname();

  if (!userData?.role) {
    return null; // or loading UI, or error message
  }

  const currentUserRole: TRole = userData?.role;

  const filteredItems = sidebarMenuItems.filter((item) =>
    item.roles.includes(currentUserRole)
  );

  console.log("User From Dashboard", userData);
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
                          active && "bg-muted font-semibold text-primary"
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
