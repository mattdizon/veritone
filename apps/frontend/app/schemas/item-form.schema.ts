import { z } from 'zod';

export const itemFormSchema = z.object({
  itemName: z
    .string()
    .min(1, 'Item name is required')
    .max(100, 'Item name must be 100 characters or less'),
  description: z
    .string()
    .max(100, 'Description must be 100 characters or less')
    .optional()
    .default(''),
  quantity: z
    .string()
    .min(1, 'Quantity is required')
    .refine((val) => {
      const num = parseInt(val, 10);
      return !isNaN(num) && num >= 1 && num <= 10;
    }, 'Quantity must be between 1 and 10'),
  purchased: z.boolean().optional().default(false),
});

export type ItemFormSchema = z.infer<typeof itemFormSchema>;

