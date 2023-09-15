import { protectedProcedure, router } from '@/server/trpc';

import {
  addSchemaSchema,
  deleteSchemaSchema,
  editSchemaSchema,
} from '@/schemas/schemas-schema';
import { prisma } from '@/lib/db';

export const schemaRouter = router({
  getSchemas: protectedProcedure.query(async () => {
    return await prisma.schema.findMany();
  }),
  addSchema: protectedProcedure
    .input(addSchemaSchema)
    .mutation(async ({ctx, input }) => {
      await prisma.schema.create({
        data: {
          name: input.name,
          schema: JSON.parse(input.schema),
          userId: ctx.session.user.id,
        },
      });

      return true;
    }),
  editSchema: protectedProcedure
    .input(editSchemaSchema)
    .mutation(async ({ ctx, input }) => {
      await prisma.schema.update({
        where: { id: input.id },
        data: {
          name: input.name,
          schema: input.schema && JSON.parse(input.schema),
          userId: ctx.session.user.id,
        },
      });

      return true;
    }),
  deleteSchema: protectedProcedure
    .input(deleteSchemaSchema)
    .mutation(async ({ input }) => {
      await prisma.schema.delete({
        where: { id: input.id },
      });

      return true;
    }),
});
