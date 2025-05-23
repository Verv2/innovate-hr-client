import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

const TopNavbar = () => {
  const router = useRouter();
  return (
    <div className="space-x-4">
      <Button
        className="btn-violet w-[170px]"
        onClick={() => router.push("/admin-dashboard/add-employee")}
      >
        Add New Employee
      </Button>
      <Button className="btn-violet w-[170px]">Send Invitation</Button>
    </div>
  );
};

export default TopNavbar;
