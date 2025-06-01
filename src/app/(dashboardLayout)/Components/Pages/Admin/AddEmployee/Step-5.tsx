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
import { benefitEnrollmentConstant } from "./constants";
import { financialInformationSchema } from "@/schema/employee.schema";
import Loading from "@/app/(commonLayout)/Components/UI/Loading/Loading";
import { TFinancialInformation } from "@/types";
import { useEffect } from "react";

type TStep5Props = {
  handleUseAddTemporaryEmployee: (formData: FormData) => Promise<any>;
  isPending: boolean;
  financialInformation?: TFinancialInformation;
  onRefetch: () => Promise<void>;
};

const Step5 = ({
  handleUseAddTemporaryEmployee,
  isPending,
  financialInformation,
  onRefetch,
}: TStep5Props) => {
  const form = useForm<z.infer<typeof financialInformationSchema>>({
    resolver: zodResolver(financialInformationSchema),
  });

  // form reset
  const { reset } = form;

  useEffect(() => {
    if (financialInformation) {
      reset({
        ...financialInformation,
      });
    }
  }, [financialInformation, reset]);

  const onSubmit = async (
    values: z.infer<typeof financialInformationSchema>
  ) => {
    try {
      const data = {
        step: 5,
        financialInformation: values,
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
      <h2 className="text-2xl mb-12">Financial Information</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 max-w-3xl mx-auto py-10"
        >
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-4">
              <FormField
                control={form.control}
                name="bankName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bank Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter the bank name"
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
                name="accountNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter the account number"
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
                name="accountHolder"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account Holder Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter the account holder name"
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

          <FormField
            control={form.control}
            name="bankAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bank Address</FormLabel>
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

          <div className="grid grid-cols-3 gap-4">
            <div>
              <FormField
                control={form.control}
                name="sortCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sort Code</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter the code"
                        type="text"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <FormField
                control={form.control}
                name="ibanOrSwfit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Iban or Swfit Code</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter the code here"
                        type="text"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <FormField
                control={form.control}
                name="benefitEnrollment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Benefit Enrollment</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue placeholder="Select a benefit" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {benefitEnrollmentConstant.map((item, index) => (
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

export default Step5;
