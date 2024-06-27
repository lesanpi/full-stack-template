import { Axiom } from '@axiomhq/js';
import { TCreateLog } from './axiom.dto';

/**
 * Asynchronously logs a message to Axiom.
 *
 * This function takes a `TCreateLog` object containing the message details and sends it to Axiom using the `axiom` library.
 * It expects the `AXIOM_TOKEN` and `AXIOM_ORG_ID` environment variables to be set with your Axiom credentials.
 *
 * @param {TCreateLog} args - An object containing the log message details.
 * @example
 * ```javascript
 * const logEntry = {
 *   message: 'An error occurred',
 *   source: 'MyService',
 *   userId: '12345',
 *   userEmail: 'user@example.com',
 * };
 *
 * log(logEntry)
 * ```
 */
export async function log(args: TCreateLog) {
  try {
    const axiom = new Axiom({
      token: process.env.AXIOM_TOKEN,
      orgId: process.env.AXIOM_ORG_ID,
    });
    axiom.ingest(process.env.AXIOM_DATASET, [args]);
  } catch (error) {
    console.error(error);
  }
}
