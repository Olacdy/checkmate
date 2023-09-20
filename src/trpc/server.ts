import { httpBatchLink, loggerLink } from '@trpc/client';

import superjson from 'superjson';

import { appRouter } from '@/server';

import { getUrl } from './shared';

export const serverClient = appRouter.createCaller({
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
