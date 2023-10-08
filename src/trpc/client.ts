import { createTRPCReact, httpBatchLink, loggerLink } from '@trpc/react-query';

import superjson from 'superjson';

import { getBaseUrl } from '@/lib/utils';
import { type AppRouter } from '@/server';

export const trpc = createTRPCReact<AppRouter>({});

export const client = trpc.createClient({
  transformer: superjson,
  links: [
    loggerLink({
      enabled: (op) =>
        process.env.NODE_ENV === 'development' ||
        (op.direction === 'down' && op.result instanceof Error),
    }),
    httpBatchLink({
      url: getBaseUrl() + '/api/trpc',
    }),
  ],
});
