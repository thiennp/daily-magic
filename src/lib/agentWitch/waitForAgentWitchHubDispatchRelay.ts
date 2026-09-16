import { ensureAgentWitchPresenceSchema } from "@/lib/agentWitch/ensureAgentWitchPresenceSchema";
import { parseAgentWitchHubDispatchRelayResult } from "@/lib/agentWitch/isAgentWitchHubDispatchRelayResult";
import type AgentWitchHubDispatchRelayResult from "@/lib/agentWitch/types/AgentWitchHubDispatchRelayResult.type";
import { AGENT_WITCH_MESSAGE_TYPES } from "@/lib/agentWitch/types/AgentWitchMessageType.constant";
import { asRowArray, getSql } from "@/lib/db";

const HUB_DISPATCH_RELAY_POLL_MS = 100;
const HUB_DISPATCH_RELAY_WAIT_MS = 15_000;

const readRelayResultFromRow = (
  row: Record<string, unknown>,
): AgentWitchHubDispatchRelayResult | null => {
  const status = row.status;
  if (status === "completed") {
    return parseAgentWitchHubDispatchRelayResult(row.result);
  }

  if (status === "failed") {
    const errorMessage =
      typeof row.error_message === "string"
        ? row.error_message
        : "Dispatch failed.";
    return {
      ok: false,
      message: {
        type: AGENT_WITCH_MESSAGE_TYPES.SYSTEM_ERROR,
        payload: { errorMessage },
      },
    };
  }

  return null;
};

export const waitForAgentWitchHubDispatchRelay = async (
  relayId: string,
  waitMs: number = HUB_DISPATCH_RELAY_WAIT_MS,
): Promise<AgentWitchHubDispatchRelayResult | null> => {
  await ensureAgentWitchPresenceSchema();
  const sql = getSql();
  const deadlineMs = Date.now() + waitMs;

  while (Date.now() < deadlineMs) {
    const rows = asRowArray(
      await sql`
        SELECT status, result, error_message
        FROM agent_witch_hub_dispatch_relay
        WHERE id = ${relayId}
        LIMIT 1
      `,
    );

    const row = rows[0];
    if (row !== undefined) {
      const parsed = readRelayResultFromRow(row);
      if (parsed !== null) {
        return parsed;
      }

      if (row.status === "expired") {
        return null;
      }
    }

    await new Promise((resolve) => {
      setTimeout(resolve, HUB_DISPATCH_RELAY_POLL_MS);
    });
  }

  await sql`
    UPDATE agent_witch_hub_dispatch_relay
    SET status = 'expired', completed_at = NOW()
    WHERE id = ${relayId}
      AND status IN ('pending', 'processing')
  `;

  return null;
};
