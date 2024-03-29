import type { FastifyInstance } from 'fastify';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';

export async function swaggerPlugin(server: FastifyInstance) {
  await server.register(fastifySwagger, {
    swagger: {
      info: {
        title: 'REST API docs',
        version: '1.0.0',
        description: 'This is a playground with all APIs routes',
      },
      host: 'localhost:3000',
      schemes: ['http', 'https'],
      consumes: ['application/json', 'multipart/form-data'],
      produces: ['application/json'],
    },
  });
  await server.register(fastifySwaggerUi, {
    routePrefix: '/api/docs',
    theme: {
      title: 'REST API Template',
    },
  });
}
