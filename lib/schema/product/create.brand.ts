import { z } from 'zod';

export const brandFormSchema = z.object({
  name: z
    .string()
    .min(1, 'Brand name is required!')
    .max(100, 'Brand name must be less than 100 character long!'),
  description: z
    .string()
    .min(1, 'Description is required')
    .max(1000, 'Description must be less than 1000 character long!'),
  website_url: z.string().optional(),
  logo_url: z.string().optional(),
  metadata: z.record(z.string(), z.any()).default({}).optional(),
});
