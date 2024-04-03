import Fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import rateLimit from '@fastify/rate-limit';
import xhr2 from 'xhr2';
import mongoose from 'mongoose';
import sentryPlugin from '@immobiliarelabs/fastify-sentry';
import { nodeProfilingIntegration } from '@sentry/profiling-node';
import { Integrations } from '@sentry/node';
import { swaggerPlugin } from './plugins/swagger';
import { handleError } from './utils/error/handler';
import { authRouter } from '@/components/auth/auth.routes';
import { userRouter } from '@/components/users/user.routes';
import { adminRoutes } from './routes';

global.XMLHttpRequest = xhr2;

export async function createServer() {
  let connection: typeof mongoose | null = null;
  try {
    connection = await mongoose
      .connect(String(process.env.DATABASE))
      .then((conn) => {
        console.log('Connected to database');
        return conn;
      });

    mongoose.connection.on('error', (err) => `❌🤬❌🤬 ${err}`);
  } catch (err) {
    console.log(`ERROR: ${err}`);
    if (connection && connection.connection) {
      connection.connection.close();
    }
    process.exit(1);
  }

  const server = Fastify({
    logger: {
      level: 'trace',
    },
  });

  await server.register(rateLimit);
  if (process.env.NODE_ENV === 'production') {
    await server.register(helmet);
  } else {
    await swaggerPlugin(server);
  }

  if (process.env.NODE_ENV === 'production') {
    await server.register(sentryPlugin, {
      dsn: process.env.SENTRY_DSN,
      environment: 'production',
      release: process.env.VERSION,
      integrations: [
        nodeProfilingIntegration(),
        new Integrations.Apollo(),
        new Integrations.Mongo({ useMongoose: true }),
      ],
    });
  }

  // routes
  // await server.register(userRoutes, { prefix: '/api' });

  await server.register(cors, {
    origin: JSON.parse(process.env.CORS_ORIGINS ?? '["*"]'),
    credentials: true,
  });

  server.setErrorHandler(handleError);

  // routes

  await server.register(authRouter);
  await server.register(userRouter);

  await server.register(adminRoutes);
  await server.ready();
  return server;
}
