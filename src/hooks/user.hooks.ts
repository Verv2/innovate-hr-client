/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllUsers, sendInvitation } from "@/services/UserService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

export const useGetAllUsers = (queryParams: Record<string, string>) => {
  return useQuery({
    queryKey: ["GET_ALL_USERS", queryParams],
    queryFn: async () => await getAllUsers(queryParams),
  });
};

export const useSendInvitation = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["SEND_INVITATION"],
    mutationFn: async (userData) => await sendInvitation(userData),
    onSuccess: () => {
      toast.success("Invitation has been sent to the user");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
