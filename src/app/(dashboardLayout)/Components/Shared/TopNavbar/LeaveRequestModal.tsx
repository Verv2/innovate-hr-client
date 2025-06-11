"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { leaveTypesConstant } from "@/constants/leaveType";
import { useSendLeaveRequest } from "@/hooks/leave.hooks";
import { cn } from "@/lib/utils";
import { TLeaveRequest } from "@/types";
import { CalendarIcon, Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const LeaveRequestModal = () => {
  const { mutateAsync: handleUseSendLeaveRequest, isPending } =
    useSendLeaveRequest();

  const [open, setOpen] = useState(false);
  const form = useForm<TLeaveRequest>({
    defaultValues: {
      leaveType: "",
      leaveDates: [],
      reason: "",
    },
  });

  const onSubmit = async (data: TLeaveRequest) => {
    try {
      await handleUseSendLeaveRequest(data);
      setOpen(false);
      form.reset();
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="btn-violet">Send Leave Request</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[520px] bg-white border-violet-200 shadow-2xl rounded-2xl">
          <DialogHeader className="pb-6 border-b border-violet-100">
            <DialogTitle className="text-2xl font-bold text-violet-900 flex items-center gap-2">
              <div className="w-8 h-8 bg-violet-100 rounded-full flex items-center justify-center">
                <CalendarIcon className="w-4 h-4 text-violet-600" />
              </div>
              Leave Request
            </DialogTitle>
            <DialogDescription className="text-violet-600 mt-2">
              Submit your leave request by filling out the form below. All
              fields marked with * are required.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 max-w-3xl mx-auto py-10"
            >
              <FormField
                control={form.control}
                name="leaveType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Leave Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue placeholder="Select a leave type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {leaveTypesConstant.map((item, index) => (
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

              <FormField
                control={form.control}
                name="leaveDates"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Leave Dates</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value && field.value.length > 0 ? (
                              <span>{field.value.length} dates selected</span>
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="multiple"
                          selected={
                            field.value?.map((date) => new Date(date)) ?? []
                          }
                          onSelect={(dates) => {
                            const formattedDates =
                              dates?.map(
                                (date) => date.toLocaleDateString("en-CA") // Gives "2025-06-20"
                              ) || [];
                            field.onChange(formattedDates);
                          }}
                          disabled={(date) => date < new Date()}
                          //   initialFocus
                          className="rounded-xl border-0 p-4"
                          classNames={{
                            day_selected:
                              "bg-violet-600 text-white hover:bg-violet-700 hover:text-white focus:bg-violet-700 focus:text-white rounded-lg font-semibold",
                            day_today:
                              "bg-violet-100 text-violet-900 font-semibold rounded-lg",
                          }}
                        />
                      </PopoverContent>
                    </Popover>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reason (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Add any additional information about your leave request.."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full btn-violet">
                <Send />
                {isPending ? "Sending" : "Send"}
                {/* Send */}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LeaveRequestModal;
