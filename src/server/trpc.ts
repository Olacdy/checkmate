import { initTRPC, TRPCError } from '@trpc/server';

import { ZodError } from 'zod';

import { getServerAuthSession } from '@/lib/nextauth';

const t = initTRPC.create({
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

export const publicProcedure = t.procedure;

const isAuth = t.middleware(async ({ next }) => {
  const session = await getServerAuthSession();

  if (!session || !session.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next({
    ctx: {
      // infers the `session` as non-nullable
      session: { ...session, user: session.user },
    },
  });
});

export const protectedProcedure = t.procedure.use(isAuth);
