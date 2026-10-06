import { ensureAgentWitchPresenceSchema } from "@/lib/agentWitch/ensureAgentWitchPresenceSchema";
import { asRowArray, getSql } from "@/lib/db";

/**
 * S0-7 — a stopped run must not start later from the 24 h outbox. Cancels any
 * still-queued command carrying this agentRunId (delivered rows untouched).
 */
export const cancelQueuedAgentRunOutbox = async (
  agentRunId: string,
): Promise<number> => {
  await ensureAgentWitchPresenceSchema();
  const rows = asRowArray(
    await getSql()`
      UPDATE agent_witch_dispatch_outbox
      SET status = 'cancelled'
      WHERE status = 'queued'
        AND payload -> 'payload' ->> 'agentRunId' = ${agentRunId}
      RETURNING id
    `,
  );
  return rows.length;
};
