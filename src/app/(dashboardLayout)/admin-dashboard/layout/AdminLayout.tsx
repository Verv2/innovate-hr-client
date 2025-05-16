import DashboardLayout from "../../Layout/DashboardLayout";

interface Props {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: Props) => {
  return (
    <>
      <DashboardLayout>{children}</DashboardLayout>
    </>
  );
};

export default AdminLayout;
