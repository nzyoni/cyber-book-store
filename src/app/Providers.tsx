"use client";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

// const queryClient = new QueryClient();

export const Providers: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
