import { TRole } from "@/types";
import { Home, RotateCcwKey, UserRoundPen, FolderInput } from "lucide-react";
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
    roles: ["ADMIN", "SUPER_ADMIN"],
  },
  {
    title: "Home Employee",
    url: "/dashboard/employee",
    icon: Home,
    roles: ["EMPLOYEE"],
  },
  {
    title: "Home Manager",
    url: "/dashboard/manager",
    icon: Home,
    roles: ["MANAGER"],
  },
  {
    title: "Add Employee",
    url: "/dashboard/admin/add-employee",
    icon: FolderInput,
    roles: ["ADMIN", "SUPER_ADMIN", "MANAGER"],
  },
  {
    title: "Profile",
    url: "/dashboard/profile",
    icon: UserRoundPen,
    roles: ["ADMIN", "MANAGER", "EMPLOYEE"],
  },
  {
    title: "Change Password",
    url: "/dashboard/change-password",
    icon: RotateCcwKey,
    roles: ["ADMIN", "SUPER_ADMIN", "MANAGER", "EMPLOYEE"],
  },

  // {
  //   title: "Super Admin Panel",
  //   url: "/super-admin",
  //   icon: ShieldCheck,
  //   roles: ["SUPER_ADMIN"],
  // },
];
