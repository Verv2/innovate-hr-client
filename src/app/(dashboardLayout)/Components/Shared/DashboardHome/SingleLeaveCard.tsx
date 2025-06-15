import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getEmploymentTypeLabel, getInitials } from "@/lib/utils";
import { TLeaveToday } from "@/types";
import { Calendar, Sparkles } from "lucide-react";

const SingleLeaveCard = ({ item }: { item: TLeaveToday }) => {
  const totalLeaveTaken =
    item.employee.employeeLeaves.totalLeaveDays -
    item.employee.employeeLeaves.availableLeaveDays;

  return (
    <div className="relative py-2">
      <Card className="relative w-64 mx-auto bg-white border-0 shadow-md shadow-violet-200/30 overflow-hidden px-0 py-2">
        {/* Animated background pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-transparent to-purple-50"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.05),transparent_50%)]"></div>

        <CardHeader className="pt-4 px-4 relative z-10">
          <div className="flex flex-col items-center space-y-2">
            <div className="relative group">
              <Avatar className="w-10 h-10 border-2 border-white">
                <AvatarImage
                  src={item.employee.additionalDocuments?.recentPhotograph}
                  alt={item.employee.firstName}
                  className="object-cover"
                />
                <AvatarFallback className="bg-gradient-to-br from-violet-500 to-purple-600 text-white text-sm font-semibold">
                  {getInitials(
                    `${item.employee.firstName} ${item.employee.lastName}`
                  )}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-emerald-400 to-green-400 rounded-full flex items-center justify-center shadow-sm">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
              </div>
            </div>
            <div className="text-center">
              <h3 className="font-bold text-sm text-gray-800 leading-tight">
                {item.employee.firstName} {item.employee.middleName}{" "}
                {item.employee.lastName}
              </h3>
              <p className="text-xs text-violet-600 font-medium truncate">
                {item.employee.employmentDetails.jobTitle}
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="px-4 pb-4 space-y-3 relative z-10">
          {/* Current Leave Status */}
          <div className="flex items-center justify-center w-full">
            <Badge className="bg-gradient-to-r from-violet-500 to-purple-500 text-white text-xs px-2.5 py-1 shadow-sm border border-white/20 w-full">
              <Calendar className="w-3 h-3 mr-1.5" />
              {getEmploymentTypeLabel(item.leaveType)}
            </Badge>
          </div>

          {/* Leave Statistics - Compact Grid */}
          <div className="grid grid-cols-3 gap-2 text-center mt-1">
            <div className="bg-violet-50 rounded-lg p-2 border border-violet-100 hover:bg-violet-100/50 transition-all duration-300">
              <div className="text-base font-bold text-violet-700">
                {item.employee.employeeLeaves.totalLeaveDays}
              </div>
              <div className="text-xs text-violet-600 font-medium">Total</div>
            </div>
            <div className="bg-emerald-50 rounded-lg p-2 border border-emerald-100 hover:bg-emerald-100/50 transition-all duration-300">
              <div className="text-base font-bold text-emerald-600">
                {item.employee.employeeLeaves.availableLeaveDays}
              </div>
              <div className="text-xs text-emerald-500 font-medium">Left</div>
            </div>
            <div className="bg-orange-50 rounded-lg p-2 border border-orange-100 hover:bg-orange-100/50 transition-all duration-300">
              <div className="text-base font-bold text-orange-600">
                {totalLeaveTaken}
              </div>
              <div className="text-xs text-orange-500 font-medium">Used</div>
            </div>
          </div>

          {/* Stunning Progress Visualization */}
          <div className="space-y-2.5 mt-1">
            <div className="flex justify-between items-center text-xs font-medium">
              <div className="flex items-center space-x-1.5">
                <Sparkles className="w-3 h-3 text-violet-500" />
                <span className="text-violet-700">Progress</span>
              </div>
              <span className="font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                {Math.round(
                  (totalLeaveTaken /
                    item.employee.employeeLeaves.totalLeaveDays) *
                    100
                )}
                %
              </span>
            </div>

            {/* Futuristic Progress Bar */}
            <div className="relative">
              <div className="w-full bg-violet-100 rounded-full h-2.5">
                <div
                  className="bg-gradient-to-r from-violet-500 via-purple-500 to-violet-600 h-2.5 rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                  style={{
                    width: `${
                      (totalLeaveTaken /
                        item.employee.employeeLeaves.totalLeaveDays) *
                      100
                    }%`,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
    // <div className="relative py-2">
    //   <Card className="relative w-64 mx-auto bg-white border-0 shadow-md shadow-violet-200/30 overflow-hidden px-0 py-2">
    //     <CardHeader className="relative z-10">
    //       <div className="flex flex-col items-center space-y-2">
    //         <div className="relative group">
    //           <div className="absolute -inset-1 bg-gradient-to-r from-violet-400 to-purple-400 rounded-full blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
    //           <img
    //             src={employee.image || "/placeholder.svg"}
    //             alt={employee.fullName}
    //             className="relative w-10 h-10 rounded-full object-cover border-2 border-white"
    //           />
    //           <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-emerald-400 to-green-400 rounded-full flex items-center justify-center shadow-sm">
    //             <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
    //           </div>
    //         </div>
    //         <div className="text-center">
    //           <h3 className="font-bold text-sm text-gray-800 leading-tight">
    //             {employee.fullName}
    //           </h3>
    //           <p className="text-xs text-violet-600 font-medium truncate">
    //             {employee.jobTitle}
    //           </p>
    //         </div>
    //       </div>
    //     </CardHeader>

    //     <CardContent className="space-y-3 relative z-10">
    //       {/* Current Leave Status */}
    //       <div className="flex items-center justify-center w-full">
    //         <Badge className="bg-gradient-to-r from-violet-500 to-purple-500 text-white text-xs px-2.5 py-1 shadow-sm border border-white/20 w-full">
    //           <Calendar className="w-3 h-3 mr-1.5" />
    //           {employee.currentLeaveType}
    //         </Badge>
    //       </div>

    //       {/* Leave Statistics - Compact Grid */}
    //       <div className="grid grid-cols-3 gap-2 text-center mt-1">
    //         <div className="bg-violet-50 rounded-lg p-2 border border-violet-100 hover:bg-violet-100/50 transition-all duration-300">
    //           <div className="text-base font-bold text-violet-700">
    //             {employee.totalLeaves}
    //           </div>
    //           <div className="text-xs text-violet-600 font-medium">Total</div>
    //         </div>
    //         <div className="bg-orange-50 rounded-lg p-2 border border-orange-100 hover:bg-orange-100/50 transition-all duration-300">
    //           <div className="text-base font-bold text-orange-600">
    //             {employee.leavesTaken}
    //           </div>
    //           <div className="text-xs text-orange-500 font-medium">Used</div>
    //         </div>
    //         <div className="bg-emerald-50 rounded-lg p-2 border border-emerald-100 hover:bg-emerald-100/50 transition-all duration-300">
    //           <div className="text-base font-bold text-emerald-600">
    //             {employee.remainingLeaves}
    //           </div>
    //           <div className="text-xs text-emerald-500 font-medium">Left</div>
    //         </div>
    //       </div>

    //       {/* Stunning Progress Visualization */}
    //       <div className="space-y-2.5 mt-1">
    //         <div className="flex justify-between items-center text-xs font-medium">
    //           <div className="flex items-center space-x-1.5">
    //             <Sparkles className="w-3 h-3 text-violet-500" />
    //             <span className="text-violet-700">Progress</span>
    //           </div>
    //           <span className="font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
    //             {Math.round(
    //               (employee.leavesTaken / employee.totalLeaves) * 100
    //             )}
    //             %
    //           </span>
    //         </div>

    //         {/* Futuristic Progress Bar */}
    //         <div className="relative">
    //           <div className="w-full bg-violet-100 rounded-full h-2.5">
    //             <div
    //               className="bg-gradient-to-r from-violet-500 via-purple-500 to-violet-600 h-2.5 rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
    //               style={{
    //                 width: `${
    //                   (employee.leavesTaken / employee.totalLeaves) * 100
    //                 }%`,
    //               }}
    //             >
    //               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse"></div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </CardContent>
    //   </Card>
    // </div>
  );
};

export default SingleLeaveCard;
