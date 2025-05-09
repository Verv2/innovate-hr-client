"use client";

import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import UserProvider from "@/context/user.provider";

interface ProvidersProps {
  children: ReactNode;
}

const queryClient = new QueryClient();

const Providers = ({ children }: ProvidersProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <Toaster position="top-center" />
        {children}
      </UserProvider>
    </QueryClientProvider>
  );
};

export default Providers;
