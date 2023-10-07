import { protectedProcedure, publicProcedure, router } from '@/server/trpc';

import { prisma } from '@/lib/db';
import {
  getValidationByIdSchema,
  getValidationsBySchemaIdSchema,
} from '@/schemas/validation-route-schemas';

export const validationRouter = router({
  getValidations: protectedProcedure.query(async ({ ctx }) => {
    const { id: userId } = ctx.session.user;

    return await prisma.validation.findMany({
      orderBy: [
        {
          createdAt: 'desc',
        },
      ],
      where: {
        schema: {
          userId: userId,
        },
      },
      include: {
        schema: {
          select: {
            name: true,
          },
        },
      },
    });
  }),
  getValidationById: publicProcedure
    .input(getValidationByIdSchema)
    .query(async ({ input }) => {
      const { id: validationId } = input;

      return await prisma.validation.findFirst({
        where: {
          id: validationId,
        },
        include: {
          schema: {
            select: {
              name: true,
            },
          },
        },
      });
    }),
  getValidationBySchemaId: protectedProcedure
    .input(getValidationsBySchemaIdSchema)
    .query(async ({ input }) => {
      const { schemaId } = input;

      return await prisma.validation.findMany({
        orderBy: [
          {
            createdAt: 'desc',
          },
        ],
        where: {
          schemaId: schemaId,
        },
        include: {
          schema: {
            select: {
              name: true,
            },
          },
        },
      });
    }),
});
