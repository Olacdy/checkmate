import { z } from 'zod';

import { Prisma } from '@prisma/client';

export const schemaId = z.string().cuid();

export const schemaName = z.string().min(2, {
  message: 'Schema name must be at least 2 characters.',
});

export const createSchemaSchema = z.object({
  id: schemaId.optional(),
  name: schemaName,
});

export const getSchemaByIdSchema = z.object({
  id: schemaId,
});

export const addSchemaSchema = createSchemaSchema.extend({
  fields: z.string().refine(
    (jsonString) => {
      try {
        JSON.parse(jsonString);
        return true;
      } catch (error) {
        return false;
      }
    },
    {
      message: 'Invalid JSON schema.',
    }
  ),
});

export const deleteSchemaSchema = z.object({
  id: schemaId,
});

export const editSchemaSchema = deleteSchemaSchema.merge(
  addSchemaSchema.partial()
);

export type SchemaType = Prisma.SchemaGetPayload<{
  include: {
    validations: {
      include: {
        schema: {
          select: {
            name: true;
          };
        };
      };
    };
  };
}>;

export type ValidationType = Prisma.ValidationGetPayload<{
  include: {
    schema: {
      select: {
        name: true;
      };
    };
  };
}>;
