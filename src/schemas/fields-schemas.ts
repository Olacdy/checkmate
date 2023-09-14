import { z } from 'zod';

const fieldPropertiesSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(2, {
    message: 'Field name must be at least 2 characters.',
  }),
  isRequired: z.boolean().optional(),
});

export const stringFieldSchema = fieldPropertiesSchema.merge(
  z.object({
    isEmail: z.boolean().optional(),
    minLength: z
      .union([z.coerce.number().int().min(1), z.literal('')])
      .optional(),
    maxLength: z
      .union([z.coerce.number().int().min(1), z.literal('')])
      .optional(),
    regex: z
      .string()
      .refine(
        (value) => {
          try {
            new RegExp(value);
            return true;
          } catch (error) {
            return false;
          }
        },
        {
          message: 'Invalid regex pattern.',
        }
      )
      .optional(),
  })
);

export const numberFieldSchema = fieldPropertiesSchema.merge(
  z.object({
    isInt: z.boolean().optional(),
    min: z.union([z.coerce.number(), z.literal('')]).optional(),
    max: z.union([z.coerce.number(), z.literal('')]).optional(),
  })
);

export const dateFieldSchema = fieldPropertiesSchema.merge(
  z.object({
    from: z.date().optional(),
    to: z.date().optional(),
  })
);

export type FieldType =
  | (z.infer<typeof stringFieldSchema> & { type: 'string' })
  | (z.infer<typeof numberFieldSchema> & { type: 'number' })
  | (z.infer<typeof dateFieldSchema> & { type: 'date' });
