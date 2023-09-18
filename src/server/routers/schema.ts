import { protectedProcedure, router } from '@/server/trpc';

import { prisma } from '@/lib/db';
import {
  addSchemaSchema,
  deleteSchemaSchema,
  editSchemaSchema,
  getSchemaByIdSchema,
} from '@/schemas/schemas-schema';

export const schemaRouter = router({
  getSchemasCount: protectedProcedure.query(async ({ ctx }) => {
    const { id: userId } = ctx.session.user;

    return {
      count: await prisma.schema.count({
        where: { userId: userId },
      }),
    };
  }),
  getSchemaById: protectedProcedure
    .input(getSchemaByIdSchema)
    .query(async ({ ctx, input }) => {
      const { id } = input;
      const { id: userId } = ctx.session.user;

      return await prisma.schema.findFirst({
        where: { id: id, userId: userId },
        include: {
          validations: {
            include: {
              schema: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      });
    }),
  getSchemas: protectedProcedure.query(async ({ ctx }) => {
    const { id: userId } = ctx.session.user;

    return await prisma.schema.findMany({
      where: { userId: userId },
      include: {
        validations: {
          include: {
            schema: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
  }),
  addSchema: protectedProcedure
    .input(addSchemaSchema)
    .mutation(async ({ ctx, input }) => {
      const { name, fields: rawFields } = input;
      const { id: userId } = ctx.session.user;

      return await prisma.schema.create({
        data: {
          name: name,
          fields: JSON.parse(rawFields),
          userId: userId,
        },
      });
    }),
  editSchema: protectedProcedure
    .input(editSchemaSchema)
    .mutation(async ({ ctx, input }) => {
      const { id, name, fields: rawFields } = input;
      const { id: userId } = ctx.session.user;

      return await prisma.schema.update({
        where: { id: id, userId: userId },
        data: {
          name: name,
          fields: rawFields && JSON.parse(rawFields),
        },
      });
    }),
  deleteSchema: protectedProcedure
    .input(deleteSchemaSchema)
    .mutation(async ({ ctx, input }) => {
      const { id } = input;
      const { id: userId } = ctx.session.user;

      return await prisma.schema.delete({
        where: { id: id, userId: userId },
      });
    }),
});
