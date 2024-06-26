import { Axiom } from '@axiomhq/js';

const axiom = new Axiom({
  token: process.env.AXIOM_TOKEN,
  orgId: process.env.AXIOM_ORG_ID,
});

// Logs service
export async function log(msg: string, source?: string) {
  try {
    await axiom.ingest(process.env.AXIOM_DATASET, [{ msg, source }]);
  } catch (error) {
    console.error(error);
  }
}
