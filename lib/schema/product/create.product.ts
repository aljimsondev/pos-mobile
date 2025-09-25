import { z } from 'zod';

export const productVariationSchema = z.object({
  cost_price: z.number(),
  unit_price: z.number(),
  unit_of_measurement: z.string(),
  variation_name: z.string(),
  quantity: z.number(),
  barcode: z.string(),
  attributes: z.record(z.string(), z.any()),
  low_stock_threshold: z.number().default(0).optional(),
});

export type ProductVariationSchema = z.infer<typeof productVariationSchema>;

export const createProductFormSchema = z.object({
  name: z.string(),
  brand_id: z.string(),
  description: z.string(),
  short_description: z.string().default('').optional(),
  category_id: z.string(),
  is_active: z.boolean().default(true).optional(),
  is_featured: z.boolean().default(true).optional(),
  metadata: z.record(z.string(), z.any()),
  variations: z.array(productVariationSchema),
});
