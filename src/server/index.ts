import { z } from 'zod';

import { prisma } from '@/lib/db';
import { publicProcedure, router } from './trpc';

export const appRouter = router({
  getTodos: publicProcedure.query(async () => {
    return await prisma.todo.findMany();
  }),
  addTodo: publicProcedure.input(z.string()).mutation(async (opts) => {
    await prisma.todo.create({
      data: {
        content: opts.input,
      },
    });

    return true;
  }),
  checkTodo: publicProcedure
    .input(
      z.object({
        id: z.string(),
        done: z.boolean(),
      })
    )
    .mutation(async (opts) => {
      const { input } = opts;

      await prisma.todo.update({
        where: {
          id: input.id,
        },
        data: {
          done: input.done,
        },
      });

      return true;
    }),
});

export type AppRouter = typeof appRouter;
