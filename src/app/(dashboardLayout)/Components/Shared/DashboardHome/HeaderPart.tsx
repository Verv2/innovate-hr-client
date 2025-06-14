"use client";

// import { Button } from "@/components/ui/button";
import { useUser } from "@/context/user.provider";
import { useGetAllLeaveRequest } from "@/hooks/leave.hooks";
import PendingRequestModal from "./PendingRequestModal";

const HeaderPart = () => {
  const { user: userData, isLoading } = useUser();

  const {
    data: requestedLeaveData = [],
    isSuccess: requestedLeaveDataSuccess,
    // isPending: requestedLeaveDataPending,
  } = useGetAllLeaveRequest();

  //   if (isLoading) {
  //     return <h2>Loading...</h2>;
  //   }
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-xl">
        {isLoading ? "Loading..." : `${userData?.role}'s Dashboard`}
      </h2>
      {requestedLeaveDataSuccess && (
        <PendingRequestModal requestedLeaveData={requestedLeaveData} />
      )}
    </div>
  );
};

export default HeaderPart;
