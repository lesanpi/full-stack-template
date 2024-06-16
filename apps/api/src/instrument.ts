import * as Sentry from '@sentry/node';
import { nodeProfilingIntegration } from '@sentry/profiling-node';

// Ensure to call this before importing any other modules!
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    // Add our Profiling integration
    nodeProfilingIntegration(),
    Sentry.captureConsoleIntegration(),
  ],

  // Add Performance Monitoring by setting tracesSampleRate
  // We recommend adjusting this value in production
  tracesSampleRate: 0.3,

  // Set sampling rate for profiling
  // This is relative to tracesSampleRate
  profilesSampleRate: 1.0,
});
