/* eslint-disable @typescript-eslint/no-explicit-any */
import { sendLeaveRequest } from "@/services/LeaveService";
import { useMutation } from "@tanstack/react-query";
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
