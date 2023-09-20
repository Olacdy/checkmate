import { protectedProcedure, router } from '@/server/trpc';

import { prisma } from '@/lib/db';

import { increaseQuotaSchema } from '@/schemas/user-route-schemas';

export const userRouter = router({
  increaseQuota: protectedProcedure
    .input(increaseQuotaSchema)
    .mutation(async ({ ctx, input }) => {
      const { id: userId } = ctx.session.user;
      const { increaseBy } = input;

      return await prisma.user.update({
        where: { id: userId },
        data: {
          quota: { increment: increaseBy },
        },
      });
    }),
  getQuota: protectedProcedure.query(async ({ ctx }) => {
    const { id: userId } = ctx.session.user;

    return (
      await prisma.user.findFirst({
        where: { id: userId },
        select: {
          quota: true,
        },
      })
    )?.quota;
  }),
});
