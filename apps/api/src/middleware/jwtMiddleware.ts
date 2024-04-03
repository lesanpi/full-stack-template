import type {
  FastifyReply,
  FastifyRequest,
  HookHandlerDoneFunction,
} from 'fastify';
import { currentUser } from '../components/auth/auth.service';
import { type IUser } from '@avila-tek/models';

/**
 *
 *  Middleware that validates the user's jwt token and attaches the user to the request object
 *
 * @param req request made to the server
 * @param reply server's response to the request
 * @returns Either throws error or attaches the user to the request object and continues
 */

export async function validateUser(
  req: FastifyRequest & { user?: IUser },
  reply: FastifyReply
) {
  const { headers, body, routerPath, method: action } = req;

  if (headers.authorization) {
    let user;
    try {
      user = await currentUser(
        Array.isArray(headers.authorization)
          ? headers.authorization[0]
          : headers.authorization
      );
    } catch (error: any) {
      await reply.status(401).send({
        error: new Error('401-default'),
      });
      return;
    }

    if (!user) {
      await reply.status(401).send({
        error: new Error('401-token'),
      });
      return;
    }
    req.user = user.toJSON();
  }
}
