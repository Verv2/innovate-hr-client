"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, Clock, Users } from "lucide-react";
import CurrentlyAbsence from "./CurrentlyAbsence";
import { useGetAllLeaveToday } from "@/hooks/leave.hooks";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const ThreeTabSection = () => {
  const [activeTab, setActiveTab] = useState("absences");

  const {
    data: dataOnLeaveToday = {},
    isSuccess: dataOnLeaveTodaySuccess,
    refetch: dataOnLeaveTodayRefetch,
    isFetching: dataOnLeaveTodayIsFetching,
  } = useGetAllLeaveToday();

  useEffect(() => {
    if (activeTab === "absences") {
      dataOnLeaveTodayRefetch();
    }
  }, [activeTab, dataOnLeaveTodayRefetch]);

  return (
    <div>
      <Tabs
        className="w-full"
        defaultValue="absences"
        value={activeTab}
        onValueChange={(value) => setActiveTab(value)}
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="absences">
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
          {dataOnLeaveTodaySuccess ? (
            <CurrentlyAbsence
              meta={dataOnLeaveToday?.meta}
              data={dataOnLeaveToday?.data}
            />
          ) : (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[200px]" />
                    <Skeleton className="h-4 w-[160px]" />
                  </div>
                </div>
              ))}
            </div>
          )}
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
