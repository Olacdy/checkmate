import { z } from 'zod';

import { prisma } from '@/lib/db';
import { protectedProcedure, publicProcedure, router } from '@/server/trpc';

export const todoRouter = router({
  getTodos: publicProcedure.query(async () => {
    return await prisma.todo.findMany();
  }),
  addTodo: protectedProcedure.input(z.string()).mutation(async (opts) => {
    await prisma.todo.create({
      data: {
        content: opts.input,
      },
    });

    return true;
  }),
  checkTodo: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        done: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
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
