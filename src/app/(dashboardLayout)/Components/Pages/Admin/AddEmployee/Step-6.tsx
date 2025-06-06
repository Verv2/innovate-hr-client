/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useEffect, useRef, useState } from "react";
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
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from "@/components/extension/file-upload";
import { additionalDocumentsSchema } from "@/schema/employee.schema";
import Loading from "@/app/(commonLayout)/Components/UI/Loading/Loading";

type TStep6Props = {
  handleUseAddTemporaryEmployee: (formData: FormData) => Promise<any>;
  isPending: boolean;
  onRefetch: () => Promise<void>;
};

const Step6 = ({
  handleUseAddTemporaryEmployee,
  isPending,
  onRefetch,
}: TStep6Props) => {
  const [signedContractPaperwork, setSignedContractPaperwork] = useState<
    File[] | null
  >(null);
  const [educationalCertificates, setEducationalCertificates] = useState<
    File[] | null
  >(null);
  const [professionalCertificates, setProfessionalCertificates] = useState<
    File[] | null
  >(null);
  const [recentPhotograph, setRecentPhotograph] = useState<File[] | null>(null);

  const signedContractPaperworkRef = useRef<HTMLDivElement>(null);
  const educationalCertificatesRef = useRef<HTMLDivElement>(null);

  const [fileErrors, setFileErrors] = useState<{
    signed?: string;
    educational?: string;
  }>({});

  const signedContractPaperworkConfig = {
    maxFiles: 1,
    maxSize: 1024 * 1024 * 4,
    multiple: true,
  };

  const educationalCertificatesConfig = {
    maxFiles: 2,
    maxSize: 1024 * 1024 * 4,
    multiple: true,
  };

  const professionalCertificatesConfig = {
    maxFiles: 2,
    maxSize: 1024 * 1024 * 4,
    multiple: true,
  };

  const recentPhotographConfig = {
    maxFiles: 1,
    maxSize: 1024 * 1024 * 4,
    multiple: true,
  };

  const form = useForm<z.infer<typeof additionalDocumentsSchema>>({
    resolver: zodResolver(additionalDocumentsSchema),
  });

  const onSubmit = async (
    values: z.infer<typeof additionalDocumentsSchema>
  ) => {
    try {
      const data = { step: 6 };
      const errors: typeof fileErrors = {};

      if (!signedContractPaperwork || signedContractPaperwork.length === 0) {
        errors.signed = "Please upload signed contract paperwork.";
      }

      if (!educationalCertificates || educationalCertificates.length === 0) {
        errors.educational = "Please upload educational certificates.";
      }

      if (Object.keys(errors).length > 0) {
        setFileErrors(errors);
        return;
      }

      setFileErrors({}); // Clear errors
      const formData = new FormData();
      formData.append("data", JSON.stringify(data));

      if (signedContractPaperwork) {
        formData.append("signedContractPaperwork", signedContractPaperwork[0]);
      }

      if (educationalCertificates) {
        for (const certificate of educationalCertificates) {
          formData.append("educationalCertificates", certificate);
        }
      }
      if (professionalCertificates) {
        for (const certificate of professionalCertificates) {
          formData.append("professionalCertificates", certificate);
        }
      }

      if (recentPhotograph) {
        formData.append("recentPhotograph", recentPhotograph[0]);
      }

      await handleUseAddTemporaryEmployee(formData);
      await onRefetch();
    } catch (error) {
      console.error("Form submission error", error);
    }
  };

  useEffect(() => {
    if (fileErrors.signed) {
      signedContractPaperworkRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    } else if (fileErrors.educational) {
      educationalCertificatesRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [fileErrors]);

  if (isPending) {
    return <Loading />;
  }

  return (
    <div className="max-w-3xl mx-auto mt-12">
      <h2 className="text-2xl mb-12">Additional Documents</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="signedContractPaperwork"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Signed Contract Paperwork</FormLabel>
                <FormControl>
                  <FileUploader
                    value={signedContractPaperwork}
                    onValueChange={setSignedContractPaperwork}
                    dropzoneOptions={signedContractPaperworkConfig}
                    className="relative bg-background rounded-lg p-2"
                    ref={signedContractPaperworkRef}
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
                    {fileErrors.signed && (
                      <p className="text-red-500 text-sm mt-2">
                        {fileErrors.signed}
                      </p>
                    )}
                    <FileUploaderContent>
                      {signedContractPaperwork &&
                        signedContractPaperwork.length > 0 &&
                        signedContractPaperwork.map((file, i) => (
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

          <FormField
            control={form.control}
            name="educationalCertificates"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Educational Certificates</FormLabel>
                <FormControl>
                  <FileUploader
                    value={educationalCertificates}
                    onValueChange={setEducationalCertificates}
                    dropzoneOptions={educationalCertificatesConfig}
                    className="relative bg-background rounded-lg p-2"
                    ref={educationalCertificatesRef}
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
                    {fileErrors.educational && (
                      <p className="text-red-500 text-sm mt-2">
                        {fileErrors.educational}
                      </p>
                    )}
                    <FileUploaderContent>
                      {educationalCertificates &&
                        educationalCertificates.length > 0 &&
                        educationalCertificates.map((file, i) => (
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

          <FormField
            control={form.control}
            name="professionalCertificates"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Professional Certificates</FormLabel>
                <FormControl>
                  <FileUploader
                    value={professionalCertificates}
                    onValueChange={setProfessionalCertificates}
                    dropzoneOptions={professionalCertificatesConfig}
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
                    <FileUploaderContent>
                      {professionalCertificates &&
                        professionalCertificates.length > 0 &&
                        professionalCertificates.map((file, i) => (
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

          <FormField
            control={form.control}
            name="recentPhotograph"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Recent Photograph</FormLabel>
                <FormControl>
                  <FileUploader
                    value={recentPhotograph}
                    onValueChange={setRecentPhotograph}
                    dropzoneOptions={recentPhotographConfig}
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
                    <FileUploaderContent>
                      {recentPhotograph &&
                        recentPhotograph.length > 0 &&
                        recentPhotograph.map((file, i) => (
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
          <Button type="submit" className="btn-violet">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Step6;
