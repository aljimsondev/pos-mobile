import { AppSheetProvider } from '@/components/ui/bottom-sheet';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { ReactNode } from 'react';

const client = new QueryClient();

function RootProvider({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={client}>
      <AppSheetProvider>{children}</AppSheetProvider>;
    </QueryClientProvider>
  );
}

export default RootProvider;
