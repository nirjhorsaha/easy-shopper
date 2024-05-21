import { z } from 'zod';

export const productSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number().positive({ message: 'Price must be a positive number' }),
  category: z.string(),
  tags: z.array(z.string()).min(1, { message: 'At least one tag is required' }),
  variants: z
    .array(
      z.object({
        type: z.string(),
        value: z.string(),
      }),
    )
    .min(1, { message: 'At least one variant is required' }),
  inventory: z.object({
    quantity: z
      .number()
      .int()
      .nonnegative({ message: 'Quantity must be a non-negative integer' }),
    inStock: z.boolean(),
  }),
});
