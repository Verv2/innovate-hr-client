/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  getAllLeaveRequest,
  getAllLeaveToday,
  sendLeaveRequest,
} from "@/services/LeaveService";
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

export const useGetAllLeaveRequest = () => {
  return useQuery({
    queryKey: ["GET_ALL_LEAVE_REQUEST"],
    queryFn: async () => await getAllLeaveRequest(),
  });
};

export const useGetAllLeaveToday = () => {
  return useQuery({
    queryKey: ["GET_ALL_LEAVE_TODAY"],
    queryFn: async () => await getAllLeaveToday(),
    enabled: false, // ⛔️ prevents auto-fetch on mount
  });
};
