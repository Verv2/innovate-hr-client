/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  addEmployee,
  addTemporaryEmployee,
  getTemporaryEmployee,
} from "@/services/AdminService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const useAddEmployee = () => {
  return useMutation<any, Error>({
    mutationKey: ["ADD_EMPLOYEE"],
    mutationFn: async () => await addEmployee(),
    onSuccess: () => {
      toast.success("Employee added successfully!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useAddTemporaryEmployee = () => {
  return useMutation<any, Error, FormData>({
    mutationKey: ["ADD_TEMPORARY_EMPLOYEE"],
    mutationFn: async (temporaryData) =>
      await addTemporaryEmployee(temporaryData),
    onSuccess: () => {
      console.log("Employee Information Added Successfully!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useGetTemporaryEmployee = () => {
  return useQuery({
    queryKey: ["GET_TEMPORARY_EMPLOYEE"],
    queryFn: async () => await getTemporaryEmployee(),
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    staleTime: 0,
  });
};
