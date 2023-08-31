'use client';

import { FC, useState } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { SessionProvider } from 'next-auth/react';

import { client, trpc } from '@/trpc/client';

import ThemeContextProvider from '@/context/theme-context';

type ProvidersProps = {
  children: React.ReactNode;
};

const Providers: FC<ProvidersProps> = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient({}));
  const [trpcClient] = useState(client);

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <SessionProvider>
          <ThemeContextProvider>{children}</ThemeContextProvider>
        </SessionProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
};

export default Providers;
