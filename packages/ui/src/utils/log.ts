import { useLogger, Logger } from 'next-axiom';

type CreateLogInput = {
  message: string;
  source: string;
  userId?: string;
  userEmail?: string;
};

/**
 * Registers a message with optional user information from Client component
 *
 * This function utilizes the `useLogger` hook (assumed to be imported from an external library)
 * to register a message with a specified source. It also allows including optional user information
 * like user ID and email.
 *
 * @param {string} message - The message to be registered.
 * @param {string} source - The source of the message (required).
 * @param {string} [userId] - The user ID (optional).
 * @param {string} [userEmail] - The user email (optional).
 *
 * @example
 * ```typescript
 *  useLog({ message: 'User clicked a button', source: 'UserList', userId: '12345', userEmail: 'user@example.com' });
 * ```
 */
export function useLog(data: CreateLogInput) {
  const log = useLogger({
    source: data.source,
  });

  if (!data.source) {
    console.error('El parámetro "source" es obligatorio');
    return;
  }
  log.info(data.message, {
    userId: data.userId,
    userEmail: data.userEmail,
  });
}

/**
 * Logs a message to the server with optional user information from Server component
 *
 * This function creates a new `Logger` instance with the provided `source` and uses it to log the `message`.
 * It also allows including optional user information like user ID and email within the log message.
 *
 * **Note:** This function likely requires the `Logger` class to be imported from an external library.
 *
 * @param {string} message - The message to be logged.
 * @param {string} source - The source of the message (required).
 * @param {string} [userId] - The user ID (optional).
 * @param {string} [userEmail] - The user email (optional).
 *
 * @example
 * ```javascript
 * const logEntry: CreateLogInput = {
 *   message: 'An error occurred',
 *   source: 'MyService',
 *   userId: '12345',
 *   userEmail: 'user@example.com',
 * };
 *
 * serverLog(logEntry);
 * ```
 */
export function serverLog(data: CreateLogInput) {
  const log = new Logger({
    source: data.source,
    args: {
      userId: data.userId,
      userEmail: data.userEmail,
    },
  }).with({ userId: data.userId, userEmail: data.userEmail });
  log.info(data.message, { userId: data.userId, userEmail: data.userEmail });
}
