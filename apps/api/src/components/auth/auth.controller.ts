import type { FastifyReply, FastifyRequest } from 'fastify';
import { authService } from '@/components/auth/auth.service';
import { TSignInInput } from '@/components/auth/auth.dto';

async function signIn(
  request: FastifyRequest<{ Body: TSignInInput }>,
  reply: FastifyReply
) {
  // TODO: fix this type here
  return authService.signIn(request.body as any);
}

export const authController = Object.freeze({ signIn });
