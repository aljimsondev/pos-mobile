import { z } from 'zod';

export const brandFormSchema = z.object({
  name: z.string(),
  description: z.string(),
  website_url: z.string().optional(),
  logo_url: z.string().optional(),
  metadata: z.record(z.string(), z.any()).default({}).optional(),
});
