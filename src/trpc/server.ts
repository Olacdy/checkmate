import { httpBatchLink } from '@trpc/client';

import { appRouter } from '@/server';
import { getUrl } from './shared';

export const serverClient = appRouter.createCaller({
  links: [
    httpBatchLink({
      url: getUrl(),
    }),
  ],
});
