import { z } from 'zod';

export const schema = z.object({
  firstName: z.string().nonempty('This field is required.'),
  lastName: z.string().optional(),
  email: z
    .string()
    .nonempty('This field is required')
    .email('Invalid email format.'),
  phone: z
    .string()
    .nonempty('This field is required.')
    .min(5, 'Phone number must contain at least 5 numbers.')
    .max(12, 'Phone number must contain at most 12 numbers.'),
  country: z.string().nonempty('This field is required.'),
  city: z.string().optional(),
  apartment: z.string().nonempty('This field is required.'),
  zip: z
    .string()
    .nonempty('This field is required.')
    .min(5, 'Zip code must contain at least 5 characters.')
    .max(10, 'Zip code must contain at most 12 characters.'),

  notes: z.string().optional(),
  sending: z.boolean().refine(value => value, {
    message: 'This field must be checked.',
  }),
  agreement: z.boolean().refine(value => value, {
    message: 'This field must be checked.',
  }),
});
