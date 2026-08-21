import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }).optional().or(z.literal('')),
  phone: z.string().min(9, { message: 'Please enter a valid phone number' }).optional().or(z.literal('')),
  productInterest: z.string().min(1, { message: 'Please select a product' }),
  customerType: z.string().optional(),
  quantity: z.string().optional(),
  deliveryArea: z.string().optional(),
  message: z.string().max(1000, { message: 'Message cannot exceed 1000 characters' }).optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;
