"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { userRoles } from "../constants";
import { inviteUserFormSchema } from "@/schema/user.schema";
import { TInvitationData } from "@/types";
import { useSendInvitation } from "@/hooks/user.hooks";

type TFormData = z.infer<typeof inviteUserFormSchema>;

const SendInvitationForm = ({
  usersData,
}: {
  usersData: TInvitationData[];
}) => {
  const { mutateAsync: handleSendInvitation, isPending } = useSendInvitation();

  const [isEmailEditable, setIsEmailEditable] = useState(false);

  const form = useForm<TFormData>({
    resolver: zodResolver(inviteUserFormSchema),
    defaultValues: {
      userId: "",
      email: "",
      role: "",
    },
  });

  const handleUserSelect = (userId: string) => {
    const user = usersData.find((u) => u.id === userId);
    if (user) {
      form.setValue("userId", userId);
      form.setValue("email", user.email);
      setIsEmailEditable(false); // Reset email editing state when user changes
    }
  };

  const handleChangeEmail = () => {
    setIsEmailEditable(true);
    // Focus the email input after state update
    setTimeout(() => {
      const emailInput = document.getElementById("email-input");
      emailInput?.focus();
    }, 0);
  };

  const onSubmit = async (data: TFormData) => {
    console.log("Form submitted:", data);
    try {
      await handleSendInvitation(data);
    } catch (error) {
      console.error("Error sending invitation", error);
    }
  };

  return (
    isPending || (
      <div className="w-full max-w-2xl mx-auto p-6">
        <Card>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* User Selection */}
                <FormField
                  control={form.control}
                  name="userId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select User</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={handleUserSelect}
                      >
                        <FormControl className="w-full">
                          <SelectTrigger>
                            <SelectValue placeholder="Choose a user" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {usersData.map((user) => {
                            const employee = user.employees;
                            const fullName = `${employee?.firstName || ""} ${
                              employee?.lastName || ""
                            }`.trim();
                            const initials = fullName
                              ? fullName
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")
                              : "U"; // fallback initial for "Unknown"

                            return (
                              <SelectItem key={user.id} value={user.id}>
                                <div className="flex items-center gap-3 py-2">
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage
                                      src={
                                        employee?.additionalDocuments
                                          ?.recentPhotograph
                                      }
                                      alt={fullName || user.email}
                                    />
                                    <AvatarFallback>{initials}</AvatarFallback>
                                  </Avatar>
                                  <div className="flex flex-col text-left">
                                    <span className="font-medium">
                                      {fullName || "Unnamed User"}
                                    </span>
                                    <span className="text-sm text-muted-foreground">
                                      {user.email}
                                    </span>
                                  </div>
                                </div>
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email Input */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <div className="flex gap-2">
                        <div className="flex-1">
                          <FormControl>
                            <Input
                              id="email-input"
                              type="email"
                              {...field}
                              placeholder="User email will appear here"
                              readOnly={!isEmailEditable}
                              className={
                                !isEmailEditable
                                  ? "bg-muted cursor-default"
                                  : ""
                              }
                            />
                          </FormControl>
                        </div>
                        {!isEmailEditable && (
                          <Button
                            type="button"
                            //   variant="outline"
                            className="btn-violet"
                            onClick={handleChangeEmail}
                          >
                            Change Email
                          </Button>
                        )}
                        {/* {isEmailEditable && (
                        <Button
                          type="button"
                          variant="outline"
                          className="whitespace-nowrap"
                          onClick={() => setIsEmailEditable(false)}
                        >
                          Lock Email
                        </Button>
                      )} */}
                      </div>
                      <FormDescription>
                        {!isEmailEditable
                          ? "Email is auto-filled from selected user. Click 'Change Email' to edit."
                          : "You can now edit the email address. Click 'Lock Email' to prevent further changes."}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Role Selection */}
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Assign Role</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl className="w-full">
                          <SelectTrigger>
                            <SelectValue placeholder="Select a role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {userRoles.map((role) => (
                            <SelectItem key={role.value} value={role.value}>
                              {role.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <div className="w-full">
                  <Button type="submit" className="w-full btn-violet">
                    Send Invitation
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    )
  );
};

export default SendInvitationForm;
