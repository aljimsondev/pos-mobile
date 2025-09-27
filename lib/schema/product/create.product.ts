import { z } from 'zod';

// Helper function to transform string to number with validation
const stringToNumber = z.string().transform((val, ctx) => {
  // Handle empty strings
  if (val === '' || val.trim() === '') {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Value cannot be empty',
    });
    return z.NEVER;
  }

  const parsed = parseFloat(val);

  // Check if parsing resulted in NaN
  if (isNaN(parsed)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Must be a valid number',
    });
    return z.NEVER;
  }

  return parsed;
});

// Union type that accepts either string or number for unit_price
const unitPriceSchema = z
  .union([z.number(), stringToNumber])
  .refine((val) => val > 0, {
    message: 'Unit price must be greater than 0',
  });

// Similar helper for cost_price (optional)
const optionalPriceSchema = z
  .union([
    z.number(),
    stringToNumber,
    z
      .string()
      .length(0)
      .transform(() => undefined), // Handle empty string as undefined
  ])
  .optional()
  .refine((val) => val === undefined || val > 0, {
    message: 'Cost price must be greater than 0 if provided',
  });

// Helper for quantity and threshold (can be negative or zero)
const quantitySchema = z
  .union([
    z.number(),
    stringToNumber,
    z
      .string()
      .length(0)
      .transform(() => -1), // Handle empty string as default -1
  ])
  .default(-1)
  .optional();

const thresholdSchema = z
  .union([
    z.number(),
    stringToNumber,
    z
      .string()
      .length(0)
      .transform(() => 0), // Handle empty string as default 0
  ])
  .default(0)
  .optional();

export const productVariationSchema = z.object({
  cost_price: optionalPriceSchema,
  unit_price: unitPriceSchema.refine((val) => val !== undefined, {
    message: 'Unit price is required!',
  }),
  unit_of_measurement: z.string().optional(),
  variation_name: z.string().min(1, 'Variation name is required!'),
  quantity: quantitySchema,
  barcode: z.string().min(1, 'Barcode is required!'),
  attributes: z.record(z.string(), z.any()).default({}).optional(),
  low_stock_threshold: thresholdSchema,
  photo: z.any(),
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
