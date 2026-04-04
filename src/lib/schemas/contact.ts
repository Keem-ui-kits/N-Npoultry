import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.email('Invalid email address'),
  website: z.url('Invalid URL').optional().or(z.literal('')),
  message: z.string().max(1000).optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;
