"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useGetAllUsers } from "@/hooks/user.hooks";
import { useRouter } from "next/navigation";
import SendInvitationForm from "./SendInvitationForm";

const TopNavbar = () => {
  const {
    data: usersData = [],
    // isLoading: listingDataLoading,
    isSuccess: userDataSuccess,
  } = useGetAllUsers({ status: "IN_PROGRESS" });

  // console.log(
  //   "usersData from top navbar",
  //   usersData[0]?.employees?.additionalDocuments?.recentPhotograph
  // );

  const router = useRouter();
  return (
    <div className="flex justify-center items-center gap-5">
      <Button
        className="btn-violet w-[170px]"
        onClick={() => router.push("/dashboard/admin/add-employee")}
      >
        Add New Employee
      </Button>

      <Dialog>
        <DialogTrigger asChild>
          <Button className="btn-violet w-[170px]">Send Invitation</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] lg:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Send Invitation</DialogTitle>
            <DialogDescription>
              Select a user and assign them a role in the system.
            </DialogDescription>
          </DialogHeader>
          {!userDataSuccess ? (
            <div className="text-center py-4">Loading users...</div>
          ) : usersData.length === 0 ? (
            <div className="text-center py-4">
              No users found who are not active.
            </div>
          ) : (
            <SendInvitationForm usersData={usersData} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TopNavbar;
