"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, Clock, Users } from "lucide-react";
import CurrentlyAbsence from "./CurrentlyAbsence";
import { useGetAllLeaveToday } from "@/hooks/leave.hooks";

const ThreeTabSection = () => {
  const {
    data: dataOnLeaveToday = {},
    isSuccess: dataOnLeaveTodaySuccess,
    refetch: dataOnLeaveTodayRefetch, // ✅ manual trigger
    isFetching: dataOnLeaveTodayIsFetching,
  } = useGetAllLeaveToday();

  console.log("Three requestedLeaveData", dataOnLeaveToday);

  // console.log("All leave data today", allLeaveDataToday);

  return (
    <div>
      <Tabs defaultValue="absences" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger
            value="absences"
            onClick={() => dataOnLeaveTodayRefetch()}
          >
            <AlertCircle className="w-4 h-4 mr-2" />
            {dataOnLeaveTodayIsFetching ? "Loading..." : "Current Absences"}
          </TabsTrigger>
          <TabsTrigger value="status">
            <Users className="w-4 h-4 mr-2" />
            Current Status
          </TabsTrigger>
          <TabsTrigger value="shifts">
            <Clock className="w-4 h-4 mr-2" />
            Currently on Shift
          </TabsTrigger>
        </TabsList>

        <TabsContent value="absences" className="mt-6">
          <CurrentlyAbsence />
        </TabsContent>

        <TabsContent value="status" className="mt-6">
          <h2>This is currently on status tab</h2>
        </TabsContent>

        <TabsContent value="shifts" className="mt-6">
          <h2>Tis is currently on shift tab</h2>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ThreeTabSection;
