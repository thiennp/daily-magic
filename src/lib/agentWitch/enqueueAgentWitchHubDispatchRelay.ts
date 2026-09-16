import { randomUUID } from "node:crypto";

import { ensureAgentWitchPresenceSchema } from "@/lib/agentWitch/ensureAgentWitchPresenceSchema";
import type { HubDispatchRelayEnqueueInput } from "@/lib/agentWitch/types/HubDispatchRelayWorkItem.type";
import { getSql } from "@/lib/db";

const HUB_DISPATCH_RELAY_TTL_MS = 30_000;

export const enqueueAgentWitchHubDispatchRelay = async (
  input: HubDispatchRelayEnqueueInput,
): Promise<string> => {
  await ensureAgentWitchPresenceSchema();
  const sql = getSql();
  const relayId = randomUUID();
  const expiresAt = new Date(
    Date.now() + HUB_DISPATCH_RELAY_TTL_MS,
  ).toISOString();

  await sql`
    INSERT INTO agent_witch_hub_dispatch_relay (
      id,
      owner_instance_id,
      executor_user_id,
      requester_user_id,
      device_id,
      request_id,
      body,
      status,
      expires_at
    )
    VALUES (
      ${relayId},
      ${input.ownerInstanceId},
      ${input.executorUserId},
      ${input.requesterUserId},
      ${input.deviceId},
      ${input.requestId},
      ${JSON.stringify(input.body)}::jsonb,
      'pending',
      ${expiresAt}::timestamptz
    )
  `;

  return relayId;
};
