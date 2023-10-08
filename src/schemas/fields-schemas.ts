import { z } from 'zod';

const fieldPropertiesSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(2, {
    message: 'Field name must be at least 2 characters.',
  }),
  isRequired: z.boolean().optional(),
  isArray: z.boolean().optional(),
});

export const stringFieldSchema = fieldPropertiesSchema
  .and(
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
  )
  .superRefine((val, ctx) => {
    if (val.minLength && val.maxLength && val.minLength > val.maxLength) {
      ctx.addIssue({
        path: ['minLength'],
        code: z.ZodIssueCode.custom,
        message: 'Should be less than max length.',
      });

      ctx.addIssue({
        path: ['maxLength'],
        code: z.ZodIssueCode.custom,
        message: 'Should be bigger than min length.',
      });
    }
  });

export const numberFieldSchema = fieldPropertiesSchema
  .and(
    z.object({
      isInt: z.boolean().optional(),
      min: z.union([z.coerce.number().min(1), z.literal('')]).optional(),
      max: z.union([z.coerce.number().min(1), z.literal('')]).optional(),
    })
  )
  .superRefine((val, ctx) => {
    if (val.min && val.max && val.min > val.max) {
      ctx.addIssue({
        path: ['min'],
        code: z.ZodIssueCode.custom,
        message: 'Should be less than max.',
      });

      ctx.addIssue({
        path: ['max'],
        code: z.ZodIssueCode.custom,
        message: 'Should be bigger than min.',
      });
    }
  });

export const dateFieldSchema = fieldPropertiesSchema
  .and(
    z.object({
      from: z.date().optional(),
      to: z.date().optional(),
    })
  )
  .superRefine((val, ctx) => {
    if (val.from && val.to && val.from > val.to) {
      ctx.addIssue({
        path: ['from'],
        code: z.ZodIssueCode.custom,
        message: 'Should be before "To".',
      });

      ctx.addIssue({
        path: ['to'],
        code: z.ZodIssueCode.custom,
        message: 'Should be after "From".',
      });
    }
  });

export const booleanFieldSchema = fieldPropertiesSchema;

export const schemaFieldSchema = fieldPropertiesSchema.and(
  z.object({
    referencedSchema: z.union([z.string().cuid(), z.literal('self')], {
      required_error: 'Select one the schemas to reference.',
    }),
  })
);

export type FieldType =
  | (z.infer<typeof stringFieldSchema> & { type: 'string' })
  | (z.infer<typeof numberFieldSchema> & { type: 'number' })
  | (z.infer<typeof dateFieldSchema> & { type: 'date' })
  | (z.infer<typeof booleanFieldSchema> & { type: 'boolean' })
  | (z.infer<typeof schemaFieldSchema> & { type: 'schema' });
