'use client';

import { useState } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { httpBatchLink } from '@trpc/client';

import { SessionProvider } from 'next-auth/react';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';

import { trpc } from '@/trpc/client';

const Providers = ({ children }: ThemeProviderProps) => {
  const [queryClient] = useState(() => new QueryClient({}));
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: 'http://localhost:3000/api/trpc',
        }),
      ],
    })
  );

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
