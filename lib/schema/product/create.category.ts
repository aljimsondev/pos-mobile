import { z } from 'zod';

export const categoryFormSchema = z.object({
  name: z
    .string()
    .min(1, 'Category name is required!')
    .max(100, 'Category name must be less than 100 character long!'),
  image_url: z.string().optional(),
  parent_id: z.string().optional(),
});

export type CategoryFormSchema = z.infer<typeof categoryFormSchema>;
