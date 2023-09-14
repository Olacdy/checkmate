import { z } from 'zod';

export const addSchemaSchema = z.object({
  name: z.string().min(2, {
    message: 'Schema name must be at least 2 characters.',
  }),
  schema: z.string(),
});

export const editSchemaSchema = z
  .object({
    id: z.string().uuid(),
  })
  .merge(addSchemaSchema);

export const deleteSchemaSchema = z.object({
  id: z.string().uuid(),
});
