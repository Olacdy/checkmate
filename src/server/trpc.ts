import { getServerAuthSession } from '@/lib/nextauth';
import { initTRPC, TRPCError } from '@trpc/server';
import superjson from 'superjson';
import { ZodError } from 'zod';

const t = initTRPC.create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const router = t.router;

const enforceUserIsAuthed = t.middleware(async ({ next }) => {
  const session = await getServerAuthSession();

  if (!session || !session.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next({
    ctx: {
      session: { ...session, user: session.user },
    },
  });
});

export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(enforceUserIsAuthed);
