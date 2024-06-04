import type { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { healthController } from './health.controller';

export async function healthRoutes(
  fastify: FastifyInstance,
  options?: FastifyPluginOptions
) {
  fastify.get('/health', healthController.check());
}
