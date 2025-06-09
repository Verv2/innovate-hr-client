import { TRole } from "@/types";
import {
  Home,
  Inbox,
  Calendar,
  Search,
  Settings,
  ShieldCheck,
  RotateCcwKey,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface MenuItem {
  title: string;
  url: string;
  icon: LucideIcon;
  roles: TRole[];
}

export const sidebarMenuItems: MenuItem[] = [
  {
    title: "Home Admin",
    url: "/dashboard/admin",
    icon: Home,
    roles: ["ADMIN", "SUPER-ADMIN"],
  },
  {
    title: "Home Employee",
    url: "/dashboard/employee",
    icon: Home,
    roles: ["EMPLOYEE"],
  },
  {
    title: "Change Password",
    url: "/dashboard/change-password",
    icon: RotateCcwKey,
    roles: ["ADMIN", "SUPER-ADMIN", "EMPLOYEE"],
  },
  {
    title: "Inbox",
    url: "/inbox",
    icon: Inbox,
    roles: ["ADMIN", "EMPLOYEE"],
  },
  {
    title: "Calendar",
    url: "/calendar",
    icon: Calendar,
    roles: ["ADMIN", "SUPER-ADMIN"],
  },
  {
    title: "Search",
    url: "/search",
    icon: Search,
    roles: ["EMPLOYEE"],
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
    roles: ["ADMIN", "SUPER-ADMIN"],
  },
  {
    title: "Super Admin Panel",
    url: "/super-admin",
    icon: ShieldCheck,
    roles: ["SUPER-ADMIN"],
  },
];
