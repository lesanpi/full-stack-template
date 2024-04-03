import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';

export const signInInput = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type TSignInInput = z.infer<typeof signInInput>;
export const signInInputJson = zodToJsonSchema(signInInput, 'signInInputJson');
