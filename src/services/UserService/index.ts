"use server";

import axiosInstance from "@/lib/AxiosInstance";
import { AxiosError } from "axios";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const getUser = async (): Promise<any> => {
  console.log("From User Service get");
  try {
    const { data } = await axiosInstance.get("user/me");

    return data.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.log(axiosError.response?.data || axiosError.message);
    const errorMessage =
      (axiosError.response?.data as { message?: string })?.message ||
      axiosError.message;

    throw new Error(errorMessage);
  }
};
