/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllUsers, sendInvitation } from "@/services/UserService";
import { TInvitationData } from "@/types";
import { useMutation, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

export const useGetAllUsers = (
  queryParams: Record<string, string>,
  options?: Partial<
    UseQueryOptions<
      TInvitationData[], // TData
      Error, // TError
      TInvitationData[], // TSelected (if not using `select`, same as TData)
      [string, Record<string, string>] // TQueryKey
    >
  >
) => {
  return useQuery<
    TInvitationData[],
    Error,
    TInvitationData[],
    [string, Record<string, string>]
  >({
    queryKey: ["GET_ALL_USERS", queryParams],
    queryFn: async () => await getAllUsers(queryParams),
    ...options,
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
