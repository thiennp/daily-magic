import { ensureAgentWitchPresenceSchema } from "@/lib/agentWitch/ensureAgentWitchPresenceSchema";
import { isQueueableAgentWitchDispatchMessageType } from "@/lib/agentWitch/isQueueableAgentWitchDispatchMessageType";
import type AgentWitchMessage from "@/lib/agentWitch/types/AgentWitchMessage.type";
import { asRowArray, getSql } from "@/lib/db";

const DEFAULT_OUTBOX_TTL_MS = 24 * 60 * 60 * 1000;

export const enqueueAgentWitchDispatchOutbox = async (input: {
  readonly userId: string;
  readonly deviceId: string;
  readonly idempotencyKey: string;
  readonly message: AgentWitchMessage;
  readonly expiresAtMs?: number;
}): Promise<{ readonly outboxId: string; readonly queued: boolean }> => {
  if (!isQueueableAgentWitchDispatchMessageType(input.message.type)) {
    throw new Error(
      `Message type ${input.message.type} cannot be queued for dispatch.`,
    );
  }

  await ensureAgentWitchPresenceSchema();
  const sql = getSql();
  const expiresAt = new Date(
    Date.now() + (input.expiresAtMs ?? DEFAULT_OUTBOX_TTL_MS),
  ).toISOString();

  const rows = asRowArray(
    await sql`
      INSERT INTO agent_witch_dispatch_outbox (
        user_id,
        device_id,
        idempotency_key,
        message_type,
        payload,
        status,
        expires_at
      )
      VALUES (
        ${input.userId},
        ${input.deviceId},
        ${input.idempotencyKey},
        ${input.message.type},
        ${JSON.stringify(input.message)}::jsonb,
        'queued',
        ${expiresAt}::timestamptz
      )
      ON CONFLICT (idempotency_key) DO UPDATE SET
        status = CASE
          WHEN agent_witch_dispatch_outbox.status = 'delivered'
            THEN agent_witch_dispatch_outbox.status
          ELSE 'queued'
        END,
        payload = EXCLUDED.payload,
        message_type = EXCLUDED.message_type,
        expires_at = EXCLUDED.expires_at
      RETURNING id, status
    `,
  );

  const row = rows[0];
  const outboxId = typeof row?.id === "string" ? row.id : "";
  const status = typeof row?.status === "string" ? row.status : "queued";

  return { outboxId, queued: status === "queued" };
};
