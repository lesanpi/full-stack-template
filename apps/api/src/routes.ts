import { FastifyInstance } from 'fastify';
import { validateUser } from './middleware/jwtMiddleware';
import { authRouter } from '@/components/auth/auth.routes';

export const adminRoutes = async (fastify: FastifyInstance, _opts: any) => {
  // Add authorization middleware
  fastify.addHook('preHandler', validateUser); //TODO: Uncomment this line for prod

  // Admin Routes
  await fastify.register(authRouter, { prefix: 'auth' });
};
