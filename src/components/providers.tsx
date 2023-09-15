'use client';

import { FC, useState } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { SessionProvider } from 'next-auth/react';

import { LazyMotion, domMax } from 'framer-motion';

import { Toaster } from '@/components/ui/toaster';

import ActiveSectionContextProvider from '@/context/active-section-context';
import ThemeContextProvider from '@/context/theme-context';

type ProvidersProps = {
  children: React.ReactNode;
};

const Providers: FC<ProvidersProps> = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient({}));

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <SessionProvider>
          <ThemeContextProvider>
            <ActiveSectionContextProvider>
              <LazyMotion features={domMax}>{children}</LazyMotion>
            </ActiveSectionContextProvider>
          </ThemeContextProvider>
        </SessionProvider>
      </QueryClientProvider>
      <Toaster />
    </>
  );
};

export default Providers;
