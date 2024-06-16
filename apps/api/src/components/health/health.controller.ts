import type { FastifyReply, FastifyRequest } from 'fastify';
import { healthService } from './health.service';

function check() {
  return async function (
    request: FastifyRequest<{ Querystring: { id: string } }>,
    reply: FastifyReply
  ) {
    const result = await healthService.check();

    if (result) {
      return reply
        .header('Cache-Control', 'no-cache')
        .status(200)
        .send({ message: 'ok' });
    }
    return reply
      .header('Cache-Control', 'no-cache')
      .status(500)
      .send({ message: 'ko' });
  };
}

export const healthController = Object.freeze({
  check,
});
