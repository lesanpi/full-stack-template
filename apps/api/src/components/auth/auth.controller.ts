import type { FastifyReply, FastifyRequest } from 'fastify';
import { authService } from '@/components/auth/auth.service';
import { TSignInInput } from '@/components/auth/auth.dto';

async function signIn(
  request: FastifyRequest<{ Body: TSignInInput }>,
  reply: FastifyReply
) {
  return authService.signIn(request.body);
}

export const authController = Object.freeze({ signIn });
