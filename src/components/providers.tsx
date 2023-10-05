'use client';

import { FC, useState } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { LazyMotion, domMax } from 'framer-motion';

import { SessionProvider } from 'next-auth/react';

import { Toaster } from 'sonner';

import { client, trpc } from '@/trpc/client';

import ActiveSectionContextProvider from '@/context/active-section-context';
import ThemeContextProvider from '@/context/theme-context';

type ProvidersProps = {
  children: React.ReactNode;
};

const Providers: FC<ProvidersProps> = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient({}));
  const [trpcClient] = useState(client);

  return (
    <>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <SessionProvider>
            <ThemeContextProvider>
              <ActiveSectionContextProvider>
                <LazyMotion features={domMax}>{children}</LazyMotion>
              </ActiveSectionContextProvider>
            </ThemeContextProvider>
          </SessionProvider>
        </QueryClientProvider>
      </trpc.Provider>
      <Toaster richColors closeButton />
    </>
  );
};

export default Providers;
