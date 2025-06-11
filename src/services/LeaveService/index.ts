"use server";

import axiosInstance from "@/lib/AxiosInstance";
import { AxiosError } from "axios";
import { FieldValues } from "react-hook-form";

export const sendLeaveRequest = async (leaveRequestData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post(
      "/leave/leave-request",
      leaveRequestData
    );

    return data;
  } catch (error) {
    const axiosError = error as AxiosError;

    console.log(axiosError.response?.data || axiosError.message);
    const errorMessage =
      (axiosError.response?.data as { message?: string })?.message ||
      axiosError.message;

    throw new Error(errorMessage);
  }
};

export const getAllLeaveRequest = async (
  queryParams: Record<string, string>
) => {
  try {
    const { data } = await axiosInstance.get("/leave", {
      params: queryParams,
    });

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
