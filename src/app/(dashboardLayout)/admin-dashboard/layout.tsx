import type { Metadata } from "next";
import AdminLayout from "./layout/AdminLayout";

export const metadata: Metadata = {
  title: "Dashboard - Innovate HR",
  description: "HR Service",
};

export default function AdminDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <AdminLayout>{children}</AdminLayout>
    </div>
  );
}
