import { passwordSchema } from '@/lib/schema/shared/password.schema';
import { z } from 'zod';

export const setupAccountSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });
