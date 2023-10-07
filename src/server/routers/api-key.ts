import { nanoid } from 'nanoid';

import { TRPCError } from '@trpc/server';

import { prisma } from '@/lib/db';
import { protectedProcedure, router } from '@/server/trpc';

export const apiKeyRoute = router({
  getCurrentApiKey: protectedProcedure.query(async ({ ctx }) => {
    const { id: userId } = ctx.session.user;

    return await prisma.apiKey.findFirst({
      where: {
        userId: userId,
        enabled: true,
      },
    });
  }),
  createApiKey: protectedProcedure.mutation(async ({ ctx }) => {
    const { id: userId } = ctx.session.user;

    const existingApiKey = await prisma.apiKey.findFirst({
      where: { userId: userId, enabled: true },
    });

    if (existingApiKey) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'You already have a valid API key.',
      });
    }

    return await prisma.apiKey.create({
      data: {
        userId: userId,
        key: nanoid(32),
      },
    });
  }),
  revokeCurrentApiKey: protectedProcedure.mutation(async ({ ctx }) => {
    const { id: userId } = ctx.session.user;

    const currentApiKey = await prisma.apiKey.findFirst({
      where: {
        userId: userId,
        enabled: true,
      },
    });

    if (!currentApiKey) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Currently you have no active API keys.',
      });
    }

    await prisma.apiKey.update({
      where: {
        id: currentApiKey.id,
      },
      data: {
        enabled: false,
      },
    });
  }),
});
