/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { departmentConstant, employmentTypeConstant } from "./constants";
import { DateTimePicker } from "@/components/extension/datetime-picker";
import { employeeDetailsSchema } from "@/schema/employee.schema";
import Loading from "@/app/(commonLayout)/Components/UI/Loading/Loading";
import { TEmployeeDetails } from "@/types";
import { useEffect } from "react";

type TStep4Props = {
  handleUseAddTemporaryEmployee: (formData: FormData) => Promise<any>;
  isPending: boolean;
  employeeDetails?: TEmployeeDetails;
  onRefetch: () => Promise<void>;
};

const Step4 = ({
  handleUseAddTemporaryEmployee,
  isPending,
  employeeDetails,
  onRefetch,
}: TStep4Props) => {
  const form = useForm<z.infer<typeof employeeDetailsSchema>>({
    resolver: zodResolver(employeeDetailsSchema),
    defaultValues: {
      dateOfJoining: undefined,
    },
  });

  const { reset } = form;

  useEffect(() => {
    if (employeeDetails) {
      reset({
        ...employeeDetails,
        // Ensure dateOfBirth is in correct format if it's a Date object
        dateOfJoining: employeeDetails.dateOfJoining
          ? new Date(employeeDetails.dateOfJoining)
          : undefined,
      });
    }
  }, [employeeDetails, reset]);

  const onSubmit = async (values: z.infer<typeof employeeDetailsSchema>) => {
    try {
      const data = {
        step: 4,
        employeeDetails: values,
      };
      const formData = new FormData();
      formData.append("data", JSON.stringify(data));

      await handleUseAddTemporaryEmployee(formData);
      await onRefetch();

      // View contents
      // for (const pair of formData.entries()) {
      //   console.log(pair[0], pair[1]);
      // }
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  };

  if (isPending) {
    return <Loading />;
  }

  return (
    <div className="max-w-3xl mx-auto mt-12">
      <h2 className="text-2xl mb-12">Employment Details</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-2 gap-4">
            <div className="w-full">
              <FormField
                control={form.control}
                name="employeeIdNumber"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Employee Id Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter the id number"
                        type="text"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full">
              <FormField
                control={form.control}
                name="jobTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter the job title"
                        type="text"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue placeholder="Select a department" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {departmentConstant.map((item, index) => (
                          <SelectItem key={index} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <FormField
                control={form.control}
                name="dateOfJoining"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Joining</FormLabel>
                    <DateTimePicker
                      granularity="day"
                      value={field.value}
                      onChange={field.onChange}
                    />

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <FormField
                control={form.control}
                name="employmentType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Employment Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue placeholder="Select a type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {employmentTypeConstant.map((item, index) => (
                          <SelectItem key={index} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button type="submit" className="btn-violet">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Step4;
