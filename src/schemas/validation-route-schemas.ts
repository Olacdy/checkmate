import { serverClient } from '@/trpc/server';
import z from 'zod';

export const addValidationSchema = z.object({
  success: z.boolean(),
  input: z.string().refine(
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
  schemaId: z.string().cuid(),
});

export const getValidationByIdSchema = z.object({
  id: z.string().cuid(),
});

export const getValidationsBySchemaIdSchema = z.object({
  schemaId: z.string().cuid(),
});

export type ValidationType = NonNullable<
  Awaited<ReturnType<typeof serverClient.validation.getValidationById>>
>;
