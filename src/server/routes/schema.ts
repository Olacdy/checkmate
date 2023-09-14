import { protectedProcedure, publicProcedure, router } from '@/server/trpc';

import { prisma } from '@/lib/db';

import {
  addSchemaSchema,
  deleteSchemaSchema,
  editSchemaSchema,
} from '@/schemas/schemas-schema';

export const schemaRouter = router({
  getSchemas: publicProcedure.query(async () => {
    return await prisma.schema.findMany();
  }),
  addSchema: protectedProcedure
    .input(addSchemaSchema)
    .mutation(async (opts) => {
      await prisma.schema.create({
        data: {
          name: opts.input.name,
          schema: JSON.parse(opts.input.schema),
          userId: opts.ctx.session.user.id,
        },
      });

      return true;
    }),
  editSchema: protectedProcedure
    .input(editSchemaSchema)
    .mutation(async (opts) => {
      await prisma.schema.update({
        where: { id: opts.input.id },
        data: {
          name: opts.input.name,
          schema: opts.input.schema && JSON.parse(opts.input.schema),
          userId: opts.ctx.session.user.id,
        },
      });

      return true;
    }),
  deleteSchema: protectedProcedure
    .input(deleteSchemaSchema)
    .mutation(async (opts) => {
      await prisma.schema.delete({
        where: { id: opts.input.id },
      });

      return true;
    }),
});
