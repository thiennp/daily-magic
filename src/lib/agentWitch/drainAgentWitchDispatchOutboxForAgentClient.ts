import { ensureAgentWitchPresenceSchema } from "@/lib/agentWitch/ensureAgentWitchPresenceSchema";
import isAgentWitchMessage from "@/lib/agentWitch/isAgentWitchMessage";
import type AgentWitchHubClient from "@/lib/agentWitch/types/AgentWitchHubClient.type";
import { asRowArray, getSql } from "@/lib/db";

export const drainAgentWitchDispatchOutboxForAgentClient = async (
  agentClient: AgentWitchHubClient,
): Promise<number> => {
  if (
    agentClient.role !== "agent" ||
    agentClient.userId === undefined ||
    agentClient.deviceId === undefined
  ) {
    return 0;
  }

  await ensureAgentWitchPresenceSchema();
  const sql = getSql();

  const rows = asRowArray(
    await sql`
      SELECT id, payload
      FROM agent_witch_dispatch_outbox
      WHERE device_id = ${agentClient.deviceId}
        AND user_id = ${agentClient.userId}
        AND status = 'queued'
        AND expires_at > NOW()
      ORDER BY created_at ASC
      LIMIT 20
    `,
  );

  const deliveredCounts: number[] = [];

  for (const row of rows) {
    const outboxId = typeof row.id === "string" ? row.id : null;
    const payloadRaw = row.payload;
    if (outboxId === null || payloadRaw === undefined) {
      deliveredCounts.push(0);
      continue;
    }

    const message =
      typeof payloadRaw === "string" ? JSON.parse(payloadRaw) : payloadRaw;

    if (!isAgentWitchMessage(message)) {
      await sql`
        UPDATE agent_witch_dispatch_outbox
        SET status = 'cancelled', attempts = attempts + 1
        WHERE id = ${outboxId}
      `;
      deliveredCounts.push(0);
      continue;
    }

    agentClient.send(message);
    await sql`
      UPDATE agent_witch_dispatch_outbox
      SET
        status = 'delivered',
        delivered_at = NOW(),
        attempts = attempts + 1
      WHERE id = ${outboxId}
    `;
    deliveredCounts.push(1);
  }

  return deliveredCounts.reduce((sum, count) => sum + count, 0);
};
