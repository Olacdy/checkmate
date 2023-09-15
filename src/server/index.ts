import { schemaRouter } from '@/server/routers/schema';
import { router } from '@/server/trpc';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = router({
  schema: schemaRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
