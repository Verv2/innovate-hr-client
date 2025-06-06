/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
// import { cn } from "@/lib/utils";
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
import { PhoneInput } from "@/components/extension/phone-input";
import { contactInformationFormSchema } from "@/schema/employee.schema";
import Loading from "@/app/(commonLayout)/Components/UI/Loading/Loading";
import { TContactInformation } from "@/types";
// import { useEffect } from "react";

type TStep2Props = {
  handleUseAddTemporaryEmployee: (formData: FormData) => Promise<any>;
  isPending: boolean;
  contactInformation?: TContactInformation;
  onRefetch: () => Promise<void>;
};

const Step2 = ({
  handleUseAddTemporaryEmployee,
  isPending,
  contactInformation,
  onRefetch,
}: TStep2Props) => {
  const defaultValues: z.infer<typeof contactInformationFormSchema> = {
    phoneNumber: contactInformation?.phoneNumber ?? "",
    email: contactInformation?.email ?? "",
    residentialAddress: contactInformation?.residentialAddress ?? "",
    name: contactInformation?.name ?? "",
    relationship: contactInformation?.relationship ?? "",
    emergencyPhoneNumber: contactInformation?.emergencyPhoneNumber ?? "",
  };

  const form = useForm<z.infer<typeof contactInformationFormSchema>>({
    resolver: zodResolver(contactInformationFormSchema),
    defaultValues,
  });

  // form reset
  // const { reset } = form;

  // useEffect(() => {
  //   if (contactInformation) {
  //     reset({
  //       ...contactInformation,
  //     });
  //   }
  // }, [contactInformation, reset]);

  const onSubmit = async (
    values: z.infer<typeof contactInformationFormSchema>
  ) => {
    try {
      const data = {
        step: 2,
        contactInformation: values,
      };
      const formData = new FormData();
      formData.append("data", JSON.stringify(data));

      // View contents
      // for (const pair of formData.entries()) {
      //   console.log(pair[0], pair[1]);
      // }

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
      <h2 className="text-2xl mb-12">Contact Information</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-6">
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-start">
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl className="w-full">
                      <PhoneInput
                        placeholder="Enter the Phone Number"
                        {...field}
                        defaultCountry="TR"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="col-span-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter the email"
                        type="email"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <FormField
            control={form.control}
            name="residentialAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Residential Address</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter the current address"
                    type="text"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <h2 className="text-2xl mb-12">Emergency Contact Information</h2>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter the name of the person"
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
                name="relationship"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Relation Status</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter the relation status with the employee"
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
                name="emergencyPhoneNumber"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-start">
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl className="w-full">
                      <PhoneInput
                        placeholder="Enter the phone number of the person"
                        {...field}
                        defaultCountry="TR"
                      />
                    </FormControl>

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

export default Step2;
