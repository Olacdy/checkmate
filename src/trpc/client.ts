import { createTRPCReact, httpBatchLink, loggerLink } from '@trpc/react-query';

import superjson from 'superjson';

import { type AppRouter } from '@/server';

import { getUrl } from './shared';

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
      url: getUrl(),
    }),
  ],
});
