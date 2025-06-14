import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { getEmploymentTypeLabel } from "@/lib/utils";
import { TRequestedLeaveUser } from "@/types";
import { Calendar, ChevronDown, Mail, MapPin, Phone, User } from "lucide-react";
import React, { useState } from "react";

const getLeaveTypeColor = (type: string) => {
  switch (type) {
    case "SICK_LEAVE":
      return "bg-blue-100 text-blue-800 hover:bg-blue-200";
    case "ANNUAL_LEAVE":
      return "bg-red-100 text-red-800 hover:bg-red-200";
    case "UNPAID_LEAVE":
      return "bg-green-100 text-green-800 hover:bg-green-200";
    case "PATERNITY_LEAVE":
      return "bg-purple-100 text-purple-800 hover:bg-purple-200";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-200";
  }
};

const PendingRequestModal = ({
  requestedLeaveData,
}: {
  requestedLeaveData: TRequestedLeaveUser[];
}) => {
  // console.log("Leave Request Modal", userData);

  const [selectedEmployee, setSelectedEmployee] =
    useState<TRequestedLeaveUser>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleRequestClick = (request: TRequestedLeaveUser) => {
    setSelectedEmployee(request);
    setIsDialogOpen(true);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="relative btn-violet">
            <Badge variant="secondary" className="mr-2">
              {requestedLeaveData.length}
            </Badge>
            <span className="mr-2">pending requests</span>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-96 p-0" align="start">
          <div className="p-4 border-b">
            <h3 className="font-semibold text-lg">Pending Leave Requests</h3>
            <p className="text-sm text-muted-foreground">
              requests awaiting approval
            </p>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {requestedLeaveData.map((request) => (
              <DropdownMenuItem
                key={request.id}
                className="p-4 cursor-pointer hover:bg-muted/50 focus:bg-muted/50"
                onClick={() => handleRequestClick(request)}
              >
                <div className="flex items-center space-x-3 w-full">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={
                        request.employee.additionalDocuments
                          ?.recentPhotograph || "/placeholder.svg"
                      }
                      alt={request.employee.firstName}
                    />
                    <AvatarFallback>
                      {`${request.employee?.firstName?.[0] ?? ""}${
                        request.employee?.lastName?.[0] ?? ""
                      }`.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-sm truncate">
                        {request.employee?.firstName}{" "}
                        {request.employee?.firstName}
                      </p>
                      <Badge
                        variant="secondary"
                        className={`text-xs ${getLeaveTypeColor(
                          request.leaveType
                        )}`}
                      >
                        {getEmploymentTypeLabel(request.leaveType)}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-xs text-muted-foreground">
                        {request.leaveDates.length} day
                        {request.leaveDates.length !== 1 ? "s" : ""}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(request.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
              </DropdownMenuItem>
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="w-full">
          {selectedEmployee && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={
                        selectedEmployee.employee.additionalDocuments
                          ?.recentPhotograph || "/placeholder.svg"
                      }
                      alt={selectedEmployee.employee?.firstName}
                    />
                    <AvatarFallback>
                      {`${selectedEmployee.employee?.firstName?.[0] ?? ""}${
                        selectedEmployee.employee?.lastName?.[0] ?? ""
                      }`.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-xl font-semibold">
                      {selectedEmployee.employee.firstName}{" "}
                      {selectedEmployee.employee.firstName}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {selectedEmployee.employee.employmentDetails.jobTitle}
                    </p>
                  </div>
                </DialogTitle>
                <DialogDescription>
                  Leave request details and employee information
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-6 mt-6">
                {/* Leave Request Details */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Calendar className="h-5 w-5" />
                      <span>Leave Request Details</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Leave Type
                        </label>
                        <div className="mt-1">
                          <Badge
                            className={getLeaveTypeColor(
                              selectedEmployee.leaveType
                            )}
                          >
                            {getEmploymentTypeLabel(selectedEmployee.leaveType)}
                          </Badge>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Duration
                        </label>
                        <p className="mt-1 font-medium">
                          {selectedEmployee.leaveDates.length} day
                          {selectedEmployee.leaveDates.length !== 1 ? "s" : ""}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Start Date
                        </label>
                        <p className="mt-1">
                          {formatDate(selectedEmployee.leaveDates[0])}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          End Date
                        </label>
                        <p className="mt-1">
                          {formatDate(
                            selectedEmployee.leaveDates[
                              selectedEmployee.leaveDates.length - 1
                            ]
                          )}
                        </p>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Reason
                      </label>
                      <p className="mt-1">{selectedEmployee.reason}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Employee Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <User className="h-5 w-5" />
                      <span>Employee Information</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Department
                        </label>
                        <p className="mt-1">
                          {
                            selectedEmployee.employee.employmentDetails
                              .department
                          }
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Position
                        </label>
                        <p className="mt-1">
                          {selectedEmployee.employee.employmentDetails.jobTitle}
                        </p>
                      </div>
                    </div>
                    <Separator />
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          {selectedEmployee.employee.contactInformation.email}
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          {
                            selectedEmployee.employee.contactInformation
                              .phoneNumber
                          }
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          {selectedEmployee.employee.homeAddress}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-3 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Close
                  </Button>
                  <Button variant="destructive">Reject</Button>
                  <Button>Approve</Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PendingRequestModal;
