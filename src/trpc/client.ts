import { createTRPCReact, httpBatchLink } from '@trpc/react-query';

import { type AppRouter } from '@/server';
import { getUrl } from './shared';

export const trpc = createTRPCReact<AppRouter>({});

export const client = trpc.createClient({
  links: [
    httpBatchLink({
      url: getUrl(),
    }),
  ],
});
