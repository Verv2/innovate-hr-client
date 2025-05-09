import { ReactNode } from "react";
import Navbar from "./Components/Shared/Navbar/Navbar";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <h1>Footer</h1>
    </>
  );
};

export default layout;
