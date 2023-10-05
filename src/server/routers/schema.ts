import { protectedProcedure, router } from '@/server/trpc';

import { prisma } from '@/lib/db';
import { getReferencesComparison } from '@/lib/utils';

import {
  addSchemaSchema,
  deleteSchemaSchema,
  editSchemaSchema,
  getSchemaByIdSchema,
} from '@/schemas/schema-route-schemas';
import { Prisma } from '@prisma/client';

export const schemaRouter = router({
  getSchemasCount: protectedProcedure.query(async ({ ctx }) => {
    const { id: userId } = ctx.session.user;

    return await prisma.schema.count({
      where: { userId: userId },
    });
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

      const fields = JSON.parse(rawFields);

      const schema = await prisma.schema.create({
        data: {
          name: name,
          fields: fields,
          userId: userId,
        },
      });

      const referencesToCreate = fields
        .filter((field: any) => field.type === 'schema')
        .map((field: any) => {
          return {
            referrerId: schema.id,
            referringId: field.schema === 'self' ? schema.id : field.schema,
          };
        });

      await prisma.schemaReference.createMany({
        data: referencesToCreate,
      });

      return schema;
    }),
  editSchema: protectedProcedure
    .input(editSchemaSchema)
    .mutation(async ({ ctx, input }) => {
      const { id, name, fields: rawFields } = input;
      const { id: userId } = ctx.session.user;

      const fields = rawFields && JSON.parse(rawFields);

      const incomingReferences = fields
        .filter((field: any) => field.type === 'schema')
        .map((field: any) => {
          return {
            referrerId: id,
            referringId: field.schema === 'self' ? id : field.schema,
          };
        });

      const currentReferences = await prisma.schemaReference.findMany({
        where: {
          referrerId: id,
        },
      });

      const { referencesToAdd, referencesToUpdate, referencesToDelete } =
        getReferencesComparison(currentReferences, incomingReferences);

      console.log('To add ', referencesToAdd);
      console.log('To update ', referencesToUpdate);
      console.log('To delete ', referencesToDelete);

      await prisma.schemaReference.createMany({
        data: referencesToAdd,
      });

      for (const referenceToUpdate of referencesToUpdate) {
        await prisma.schemaReference.update({
          where: {
            referrerId_referringId: {
              referrerId: referenceToUpdate.referrerId,
              referringId: referenceToUpdate.referringId,
            },
          },
          data: referenceToUpdate,
        });
      }

      for (const referenceToDelete of referencesToDelete) {
        await prisma.schemaReference.delete({
          where: {
            referrerId_referringId: {
              referrerId: referenceToDelete.referrerId,
              referringId: referenceToDelete.referringId,
            },
          },
        });
      }

      return await prisma.schema.update({
        where: { id: id, userId: userId },
        data: {
          name: name,
          fields: fields,
        },
      });
    }),
  deleteSchema: protectedProcedure
    .input(deleteSchemaSchema)
    .mutation(async ({ ctx, input }) => {
      const { id } = input;
      const { id: userId } = ctx.session.user;

      const referrerers = await prisma.schemaReference.findMany({
        where: {
          referringId: id,
        },
      });

      for (const referrer of referrerers) {
        const schema = await prisma.schema.findFirst({
          where: {
            id: referrer.referrerId,
            userId: userId,
          },
        });

        const fields = schema?.fields as Prisma.JsonArray;

        const clearedFields = fields.filter((field: any) => {
          if (field.type === 'schema' && field.schema === id) {
            return false;
          }
          return true;
        });

        await prisma.schema.update({
          where: {
            id: referrer.referrerId,
            userId: userId,
          },
          data: {
            fields: clearedFields,
          },
        });
      }

      await prisma.schemaReference.deleteMany({
        where: {
          referrerId: id,
        },
      });

      return await prisma.schema.delete({
        where: { id: id, userId: userId },
      });
    }),
});
