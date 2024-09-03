"use client";

import { QueryProvider } from "@/components/query-provider";

type ProvidersProps = {
  children: React.ReactNode;
};

export const Providers = ({ children }: ProvidersProps) => {
  return <QueryProvider>{children}</QueryProvider>;
};
