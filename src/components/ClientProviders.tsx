'use client';
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  const [queryClient] = React.useState(() => new QueryClient());
  // debug - will appear in browser console
  // eslint-disable-next-line no-console
  console.log('ClientProviders: queryClient is', queryClient && queryClient.constructor && queryClient.constructor.name, queryClient);
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
