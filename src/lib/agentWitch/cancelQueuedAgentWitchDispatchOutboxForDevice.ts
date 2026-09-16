import { ensureAgentWitchPresenceSchema } from "@/lib/agentWitch/ensureAgentWitchPresenceSchema";
import { asRowArray, getSql } from "@/lib/db";

export const cancelQueuedAgentWitchDispatchOutboxForDevice = async (input: {
  readonly deviceId: string;
  readonly userId: string;
}): Promise<number> => {
  await ensureAgentWitchPresenceSchema();
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      UPDATE agent_witch_dispatch_outbox
      SET status = 'cancelled'
      WHERE device_id = ${input.deviceId}
        AND user_id = ${input.userId}
        AND status = 'queued'
      RETURNING id
    `,
  );

  return rows.length;
};
