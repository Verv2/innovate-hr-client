import { Heart, Plane, User, Users } from "lucide-react";

export const leaveTypesConstant = [
  { value: "SICK_LEAVE", label: "Sick Leave" },
  { value: "ANNUAL_LEAVE", label: "Annual Leave" },
  { value: "UNPAID_LEAVE", label: "Unpaid Leave" },
  { value: "PATERNITY_LEAVE", label: "Paternity Leave" },
  { value: "MATERNITY_LEAVE", label: "Maternity Leave" },
] as const;

export const leaveTypeConfig = {
  ANNUAL_LEAVE: {
    id: 1,
    name: "Annual Leave",
    icon: Plane,
    gradient: "from-blue-500 to-blue-600",
  },
  SICK_LEAVE: {
    id: 2,
    name: "Sick Leave",
    icon: Heart,
    gradient: "from-red-500 to-red-600",
  },
  UNPAID_LEAVE: {
    id: 3,
    name: "Unpaid Leave",
    icon: User,
    gradient: "from-green-500 to-green-600",
  },
  PATERNITY_LEAVE: {
    id: 4,
    name: "Paternity Leave",
    icon: Users,
    gradient: "from-purple-500 to-purple-600",
  },
  MATERNITY_LEAVE: {
    id: 5,
    name: "Maternity Leave",
    icon: Users,
    gradient: "from-indigo-500 to-indigo-600",
  },
} as const;
