"use client";
import { useState } from "react";
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
import { CloudUpload, Paperclip } from "lucide-react";
import { Input } from "@/components/ui/input";

import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from "@/components/extension/file-upload";
import { DateTimePicker } from "@/components/extension/datetime-picker";
import { identificationDocumentsSchema } from "@/schema/employee.schema";
import Loading from "@/app/(commonLayout)/Components/UI/Loading/Loading";
import { TIdentificationDocuments } from "@/types";

type TStep3Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleUseAddTemporaryEmployee: (formData: FormData) => Promise<any>;
  isPending: boolean;
  identificationDocuments?: TIdentificationDocuments;
  onRefetch: () => Promise<void>;
};

const Step3 = ({
  handleUseAddTemporaryEmployee,
  isPending,
  identificationDocuments,
  onRefetch,
}: TStep3Props) => {
  console.log(
    "Contact identificationDocuments from 3",
    identificationDocuments
  );

  const defaultValues: Omit<
    z.infer<typeof identificationDocumentsSchema>,
    "visaExpiryDate"
  > & {
    visaExpiryDate: Date | undefined;
  } = {
    passportOrNationalId: identificationDocuments?.passportOrNationalId ?? "",
    insuranceNumber: identificationDocuments?.insuranceNumber ?? "",
    socialSecurityNumber: identificationDocuments?.socialSecurityNumber ?? "",
    visaExpiryDate: identificationDocuments?.visaExpiryDate
      ? new Date(identificationDocuments.visaExpiryDate)
      : undefined,
    taxIdNumber: identificationDocuments?.taxIdNumber ?? "",
  };

  const [files, setFiles] = useState<File[] | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const dropZoneConfig = {
    maxFiles: 1,
    maxSize: 1024 * 1024 * 4,
    multiple: false,
  };

  const form = useForm<z.infer<typeof identificationDocumentsSchema>>({
    resolver: zodResolver(identificationDocumentsSchema),
    defaultValues,
  });

  // form reset
  // const { reset } = form;

  // useEffect(() => {
  //   if (identificationDocuments) {
  //     reset({
  //       ...identificationDocuments,
  //     });
  //   }
  // }, [identificationDocuments, reset]);

  const onSubmit = async (
    values: z.infer<typeof identificationDocumentsSchema>
  ) => {
    try {
      let isValid = true;
      if (!files || files.length === 0) {
        isValid = false;
        setFileError("Please upload a passport or national ID.");
      }

      if (!isValid) return;

      const data = {
        step: 3,
        identificationDocuments: values,
      };

      const formData = new FormData();
      formData.append("data", JSON.stringify(data));

      if (files) {
        formData.append("passportOrNationalId", files[0]);
      }

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
      <h2 className="text-2xl mb-12">Identification Documents</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="passportOrNationalId"
            render={() => (
              <FormItem>
                <FormLabel>Passport or National ID</FormLabel>
                <FormControl>
                  <FileUploader
                    value={files}
                    onValueChange={setFiles}
                    dropzoneOptions={dropZoneConfig}
                    className="relative bg-background rounded-lg p-2"
                  >
                    <FileInput
                      id="fileInput"
                      className="outline-dashed outline-1 outline-slate-500"
                    >
                      <div className="flex items-center justify-center flex-col p-8 w-full ">
                        <CloudUpload className="text-gray-500 w-10 h-10" />
                        <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>
                          &nbsp; or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          SVG, PNG, JPG or GIF
                        </p>
                      </div>
                    </FileInput>
                    {fileError && (
                      <p className="text-red-500 text-sm mt-2">{fileError}</p>
                    )}
                    <FileUploaderContent>
                      {files &&
                        files.length > 0 &&
                        files.map((file, i) => (
                          <FileUploaderItem key={i} index={i}>
                            <Paperclip className="h-4 w-4 stroke-current" />
                            <span>{file.name}</span>
                          </FileUploaderItem>
                        ))}
                    </FileUploaderContent>
                  </FileUploader>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-6">
              <FormField
                control={form.control}
                name="insuranceNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>National Insurance number </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter the insurance number"
                        type="text"
                        {...field}
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
                name="socialSecurityNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Social Security Number or Equivalent</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter the security number"
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
            <div>
              <FormField
                control={form.control}
                name="visaExpiryDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Work Permit or Visa expiry date </FormLabel>
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
                name="taxIdNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tax Identification Number </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter the tax identification number "
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
          <Button type="submit" className="btn-violet">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Step3;
