import { router } from '@/server/trpc';

import { apiKeyRoute } from '@/server/routers/api-key';
import { schemaRouter } from '@/server/routers/schema';
import { userRouter } from '@/server/routers/user';
import { validationRouter } from '@/server/routers/validation';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = router({
  user: userRouter,
  schema: schemaRouter,
  validation: validationRouter,
  apiKey: apiKeyRoute,
});

// export type definition of API
export type AppRouter = typeof appRouter;
