import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const SidebarLoading = () => {
  return (
    <div className="w-16 h-screen bg-white border-r border-gray-200 flex flex-col items-center py-4">
      {/* Logo */}
      <div className="mb-6">
        <Skeleton className="h-8 w-8 rounded-lg" />
      </div>

      {/* Navigation Icons */}
      <div className="flex-1 space-y-4">
        {[1, 2, 3, 4, 5, 6, 7].map((item) => (
          <Skeleton key={item} className="h-6 w-6 rounded-md" />
        ))}
      </div>

      {/* User Avatar */}
      <div className="mt-auto">
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
    </div>
  );
};

export default SidebarLoading;
