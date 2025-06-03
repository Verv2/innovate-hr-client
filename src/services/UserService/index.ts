/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import axiosInstance from "@/lib/AxiosInstance";
import { AxiosError } from "axios";
import { FieldValues } from "react-hook-form";

export const getAllUsers = async (queryParams: Record<string, string>) => {
  try {
    const { data } = await axiosInstance.get("/user", {
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

export const sendInvitation = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post(
      "/user/send-invitation",
      userData
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
