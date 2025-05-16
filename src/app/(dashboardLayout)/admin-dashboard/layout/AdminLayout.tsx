interface Props {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: Props) => {
  return (
    <section>
      <h2>Admin Dashboard Wrapper</h2>
      <div>{children}</div>
    </section>
  );
};

export default AdminLayout;
