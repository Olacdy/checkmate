import { protectedProcedure, router } from '@/server/trpc';

import { prisma } from '@/lib/db';
import {
  addSchemaSchema,
  deleteSchemaSchema,
  editSchemaSchema,
} from '@/schemas/schemas-schema';

export const schemaRouter = router({
  getSchemas: protectedProcedure.query(async ({ ctx }) => {
    const { id: userId } = ctx.session.user;

    return await prisma.schema.findMany({
      where: { userId: userId },
      include: {
        validations: true,
      },
    });
  }),
  addSchema: protectedProcedure
    .input(addSchemaSchema)
    .mutation(async ({ ctx, input }) => {
      const { name, schema: rawSchema } = input;
      const { id: userId } = ctx.session.user;

      return await prisma.schema.create({
        data: {
          name: name,
          schema: JSON.parse(rawSchema),
          userId: userId,
        },
      });
    }),
  editSchema: protectedProcedure
    .input(editSchemaSchema)
    .mutation(async ({ ctx, input }) => {
      const { id, name, schema: rawSchema } = input;
      const { id: userId } = ctx.session.user;

      return await prisma.schema.update({
        where: { id: id, userId: userId },
        data: {
          name: name,
          schema: rawSchema && JSON.parse(rawSchema),
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
