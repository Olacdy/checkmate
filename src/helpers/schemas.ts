import { z } from 'zod';

export const contactSchema = z.object({
  firstName: z.string().min(1, {
    message: 'First name must be at least 1 character.',
  }),
  lastName: z.string().min(2, {
    message: 'Last name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: "Doesn't look like an email.",
  }),
  message: z
    .string()
    .min(20, {
      message: 'Message must be at least 20 characters.',
    })
    .max(500, {
      message: 'Too long. Max length is 500 characters.',
    }),
});

export const stringFieldSchema = z.object({
  fieldName: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  isRequired: z.boolean().optional(),
  isEmail: z.boolean().optional(),
  minLength: z
    .union([z.coerce.number().int().nonnegative(), z.literal('')])
    .optional(),
  maxLength: z
    .union([z.coerce.number().int().nonnegative(), z.literal('')])
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
});
