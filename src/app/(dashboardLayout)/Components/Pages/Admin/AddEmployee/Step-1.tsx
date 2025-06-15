/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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

import { employeeFormSchema } from "@/schema/employee.schema";
import { z } from "zod";
import {
  genderConstant,
  maritalStatusConstant,
  nationalityConstant,
} from "../../../Shared/constants";
import { DateTimePicker } from "@/components/extension/datetime-picker";
import { TBasicInfo } from "@/types";
import Loading from "@/app/(commonLayout)/Components/UI/Loading/Loading";

type TStep1Props = {
  handleUseAddTemporaryEmployee: (formData: FormData) => Promise<any>;
  isPending: boolean;
  basicInfo?: TBasicInfo;
  onRefetch: () => Promise<void>;
};

const Step1 = ({
  handleUseAddTemporaryEmployee,
  isPending,
  basicInfo,
  onRefetch,
}: TStep1Props) => {
  const defaultValues: Omit<
    z.infer<typeof employeeFormSchema>,
    "dateOfBirth"
  > & {
    dateOfBirth: Date | undefined;
  } = {
    firstName: basicInfo?.firstName ?? "",
    middleName: basicInfo?.middleName ?? "",
    lastName: basicInfo?.lastName ?? "",
    dateOfBirth: basicInfo?.dateOfBirth
      ? new Date(basicInfo.dateOfBirth)
      : undefined,
    gender: basicInfo?.gender ?? "",
    homeAddress: basicInfo?.homeAddress ?? "",
    nationality: basicInfo?.nationality ?? "",
    maritalStatus: basicInfo?.maritalStatus ?? "",
  };

  const form = useForm<z.infer<typeof employeeFormSchema>>({
    resolver: zodResolver(employeeFormSchema),
    defaultValues,
  });

  // const { reset } = form;

  // useEffect(() => {
  //   if (basicInfo) {
  //     console.log("basicInfo.gender 👉", basicInfo.gender);
  //     reset({
  //       ...basicInfo,
  //       // Ensure dateOfBirth is in correct format if it's a Date object
  //       dateOfBirth: basicInfo.dateOfBirth
  //         ? new Date(basicInfo.dateOfBirth)
  //         : undefined,
  //     });
  //   }
  // }, [basicInfo, reset]);

  const onSubmit = async (values: z.infer<typeof employeeFormSchema>) => {
    try {
      const data = {
        step: 1,
        basicInfo: values,
      };

      const formData = new FormData();
      formData.append("data", JSON.stringify(data));
      await handleUseAddTemporaryEmployee(formData);
      await onRefetch();
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
      <h2 className="text-2xl mb-12">Basic Information</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter the First Name"
                        type="text"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-4">
              <FormField
                control={form.control}
                name="middleName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Middle Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter the Middle Name"
                        type="text"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-4">
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter the Last Name"
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

          <div className="grid grid-cols-2 gap-4">
            <div className="w-full">
              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date of birth</FormLabel>
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

            <div className="w-full">
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      // defaultValue={field.value}
                      value={field.value ?? ""}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue placeholder="Select a gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {genderConstant.map((item, index) => (
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

          <FormField
            control={form.control}
            name="homeAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Home Address</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter the address"
                    type="text"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <div className="w-full">
              <FormField
                control={form.control}
                name="nationality"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nationality</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue placeholder="Select a nationality" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {nationalityConstant.map((item, index) => (
                          <SelectItem key={index} value={item.nationality}>
                            {item.nationality}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="w-full">
              <FormField
                control={form.control}
                name="maritalStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Marital Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue placeholder="Select a status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {maritalStatusConstant.map((item, index) => (
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

export default Step1;
