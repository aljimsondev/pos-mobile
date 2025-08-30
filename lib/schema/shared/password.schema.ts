import { z } from 'zod';

export const passwordSchema = z
  .string()
  .min(1, 'Password is required!')
  .min(8, 'Password must be at least 8 characters')
  .max(32, 'Password must be less than 32 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(
    /[^A-Za-z0-9]/,
    'Password must contain at least one special character',
  );
