import { schemaRouter } from './routes/schema';
import { router } from './trpc';

export const appRouter = router({
  schema: schemaRouter,
});

export type AppRouter = typeof appRouter;
