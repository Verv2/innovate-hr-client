/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllLeaveRequest, sendLeaveRequest } from "@/services/LeaveService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

export const useSendLeaveRequest = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["SEND_LEAVE_REQUEST"],
    mutationFn: async (userData) => await sendLeaveRequest(userData),
    onSuccess: () => {
      toast.success("Your request has been sent to the management!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useGetAllLeaveRequest = (queryParams: Record<string, string>) => {
  return useQuery({
    queryKey: ["GET_ALL_LEAVE_REQUEST", queryParams],
    queryFn: async () => await getAllLeaveRequest(queryParams),
  });
};
