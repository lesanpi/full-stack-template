import { authController } from '@/components/auth/auth.controller';
import type { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { TSignInInput, signInInputJson } from '@/components/auth/auth.dto';

export async function authRouter(
  fastify: FastifyInstance,
  options?: FastifyPluginOptions
) {
  fastify.get<{ Body: TSignInInput }>(
    '/v1/auth/sign-in',
    { schema: { body: signInInputJson } },
    authController.signIn
  );
}
