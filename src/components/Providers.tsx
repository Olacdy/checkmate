'use client';

import { useState } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { SessionProvider } from 'next-auth/react';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';

import { client, trpc } from '@/trpc/client';

const Providers = ({ children }: ThemeProviderProps) => {
  const [queryClient] = useState(() => new QueryClient({}));
  const [trpcClient] = useState(client);

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <NextThemesProvider
          attribute='class'
          defaultTheme='system'
          enableSystem>
          <SessionProvider>{children}</SessionProvider>
        </NextThemesProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
};

export default Providers;
