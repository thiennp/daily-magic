import { ensureAgentWitchPresenceSchema } from "@/lib/agentWitch/ensureAgentWitchPresenceSchema";
import { getAgentWitchHubInstanceId } from "@/lib/agentWitch/getAgentWitchHubInstanceId";
import type { HubDispatchRelayWorkItem } from "@/lib/agentWitch/types/HubDispatchRelayWorkItem.type";
import type { AgentRunDispatchBody } from "@/lib/dispatch/parseAgentRunDispatchBody";
import { asRowArray, getSql } from "@/lib/db";

export const claimPendingHubDispatchRelaysForLocalInstance = async (): Promise<
  readonly HubDispatchRelayWorkItem[]
> => {
  await ensureAgentWitchPresenceSchema();
  const sql = getSql();
  const ownerInstanceId = getAgentWitchHubInstanceId();

  const rows = asRowArray(
    await sql`
      UPDATE agent_witch_hub_dispatch_relay
      SET status = 'processing'
      WHERE id IN (
        SELECT id
        FROM agent_witch_hub_dispatch_relay
        WHERE owner_instance_id = ${ownerInstanceId}
          AND status = 'pending'
          AND expires_at > NOW()
        ORDER BY created_at ASC
        LIMIT 5
        FOR UPDATE SKIP LOCKED
      )
      RETURNING
        id,
        executor_user_id,
        requester_user_id,
        device_id,
        request_id,
        body
    `,
  );

  return rows.flatMap((row): HubDispatchRelayWorkItem[] => {
    const relayId = typeof row.id === "string" ? row.id : null;
    const executorUserId =
      typeof row.executor_user_id === "string" ? row.executor_user_id : null;
    const requesterUserId =
      typeof row.requester_user_id === "string" ? row.requester_user_id : null;
    const deviceId = typeof row.device_id === "string" ? row.device_id : null;
    const requestId =
      typeof row.request_id === "string" ? row.request_id : null;
    const bodyRaw = row.body;

    if (
      relayId === null ||
      executorUserId === null ||
      requesterUserId === null ||
      deviceId === null ||
      requestId === null ||
      bodyRaw === undefined
    ) {
      return [];
    }

    const body =
      typeof bodyRaw === "string"
        ? (JSON.parse(bodyRaw) as AgentRunDispatchBody)
        : (bodyRaw as AgentRunDispatchBody);

    return [
      {
        relayId,
        executorUserId,
        requesterUserId,
        requesterEmail: null,
        deviceId,
        requestId,
        body,
      },
    ];
  });
};
