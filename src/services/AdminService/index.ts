/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import axiosInstance from "@/lib/AxiosInstance";
import { AxiosError } from "axios";

export const addTemporaryEmployee = async (
  formData: FormData
): Promise<any> => {
  console.log("Form Data from AdminService");
  try {
    const { data } = await axiosInstance.post(
      "/employee/add-temporary-employee",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return data;
  } catch (error) {
    const axiosError = error as AxiosError;

    console.log(axiosError.response?.data || axiosError.message);

    throw new Error("Failed to add employee.");
  }
};

export const getTemporaryEmployee = async () => {
  console.log("Temporary Employee Data from EmployeeServices");
  try {
    const { data } = await axiosInstance.get(
      "/employee/get-temporary-employee"
    );

    return data.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
