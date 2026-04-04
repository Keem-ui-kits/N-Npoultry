import { z } from 'zod';

export const quoteSchema = z.object({
  companyName: z.string().min(2, 'Company name is required').max(100),
  contactName: z.string().min(2, 'Contact name is required').max(100),
  email: z.email('Invalid email address'),
  phone: z.string().regex(/^(\+254|0)[17]\d{8}$/, 'Invalid Kenyan phone number'),
  product: z.enum(['table-eggs', 'poultry-manure', 'ex-layer-hens'], {
    message: 'Please select a product',
  }),
  quantity: z.string().min(1, 'Please specify quantity (e.g. 50 trays)'),
  deliveryArea: z.string().min(2, 'Delivery area is required'),
  frequency: z.enum(['one-off', 'weekly', 'monthly'], {
    message: 'Please select delivery frequency',
  }),
  message: z.string().max(1000).optional(),
});

export type QuoteFormData = z.infer<typeof quoteSchema>;
