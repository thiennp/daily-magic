import { ensureAgentWitchPresenceSchema } from "@/lib/agentWitch/ensureAgentWitchPresenceSchema";
import type AgentWitchHubDispatchRelayResult from "@/lib/agentWitch/types/AgentWitchHubDispatchRelayResult.type";
import { asRowArray, getSql } from "@/lib/db";

export const completeAgentWitchHubDispatchRelay = async (input: {
  readonly relayId: string;
  readonly result: AgentWitchHubDispatchRelayResult;
}): Promise<void> => {
  await ensureAgentWitchPresenceSchema();
  const sql = getSql();

  await sql`
    UPDATE agent_witch_hub_dispatch_relay
    SET
      status = ${input.result.ok ? "completed" : "failed"},
      result = ${JSON.stringify(input.result)}::jsonb,
      error_message = ${
        input.result.ok
          ? null
          : typeof input.result.message?.payload?.errorMessage === "string"
            ? input.result.message.payload.errorMessage
            : "Dispatch failed."
      },
      completed_at = NOW()
    WHERE id = ${input.relayId}
  `;
};

export const releaseAgentWitchHubDispatchRelayToPending = async (
  relayId: string,
): Promise<void> => {
  await ensureAgentWitchPresenceSchema();
  const sql = getSql();

  await sql`
    UPDATE agent_witch_hub_dispatch_relay
    SET status = 'pending'
    WHERE id = ${relayId}
      AND status = 'processing'
      AND expires_at > NOW()
  `;
};

export const expireStaleAgentWitchHubDispatchRelays =
  async (): Promise<number> => {
    await ensureAgentWitchPresenceSchema();
    const sql = getSql();

    const rows = asRowArray(
      await sql`
      UPDATE agent_witch_hub_dispatch_relay
      SET status = 'expired', completed_at = NOW()
      WHERE status IN ('pending', 'processing')
        AND expires_at <= NOW()
      RETURNING id
    `,
    );

    return rows.length;
  };
