import { leaveTypeConfig } from "@/constants/leaveType";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

type LeaveTypeKey = keyof typeof leaveTypeConfig;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (dateString?: string | Date) => {
  if (!dateString) return "N/A";
  const date =
    typeof dateString === "string" ? new Date(dateString) : dateString;
  if (isNaN(date.getTime())) return "Invalid date";
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const getEmploymentTypeLabel = (type: string) => {
  return type
    .replace("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (l) => l.toUpperCase());
};

export const getDocumentName = (url: string) => {
  const parts = url.split("-");
  return parts[parts.length - 1].replace(".pdf", "").replace(/[_]/g, " ");
};

export const transformLeaveMetaToArray = (
  meta: Partial<Record<LeaveTypeKey, number>>
) => {
  return Object.entries(meta)
    .filter(([type]) => type in leaveTypeConfig)
    .map(([type, count]) => {
      const config = leaveTypeConfig[type as LeaveTypeKey];
      return {
        id: config.id,
        name: config.name,
        icon: config.icon,
        gradient: config.gradient,
        currentAbsent: count ?? 0,
      };
    });
};

export const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .toUpperCase()
    .slice(0, 2);
};
