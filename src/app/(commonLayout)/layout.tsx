import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <h2>Navbar</h2>
      <main>{children}</main>
      <h1>Footer</h1>
    </>
  );
};

export default layout;
