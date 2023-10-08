import { httpBatchLink, loggerLink } from '@trpc/client';

import superjson from 'superjson';

import { appRouter } from '@/server';

export const serverClient = appRouter.createCaller({
  transformer: superjson,
  links: [
    loggerLink({
      enabled: (op) =>
        process.env.NODE_ENV === 'development' ||
        (op.direction === 'down' && op.result instanceof Error),
    }),
    httpBatchLink({
      url: process.env.NEXT_APP_URL
        ? `${process.env.NEXT_APP_URL}/api/trpc`
        : 'http://localhost:3000/api/trpc',
    }),
  ],
});
