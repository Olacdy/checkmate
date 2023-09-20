import { z } from 'zod';

export const increaseQuotaSchema = z.object({
  increaseBy: z.number().int().positive(),
});
