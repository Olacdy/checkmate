import { serverClient } from '@/trpc/server';
import { z } from 'zod';

export const schemaSchema = z.object({
  name: z.string().min(2, {
    message: 'Schema name must be at least 2 characters.',
  }),
});

export const addSchemaSchema = z
  .object({
    schema: z.string().refine(
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
  })
  .merge(schemaSchema);

export const deleteSchemaSchema = z.object({
  id: z.string().cuid(),
});

export const editSchemaSchema = deleteSchemaSchema.merge(
  addSchemaSchema.partial()
);

export type SchemaType = Awaited<
  ReturnType<typeof serverClient.schema.getSchemas>
>[number];
