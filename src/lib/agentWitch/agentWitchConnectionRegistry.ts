import { AGENT_WITCH_ONLINE_THRESHOLD_MS } from "@/lib/agentWitch/agentWitchHeartbeat.constant";
import { ensureAgentWitchPresenceSchema } from "@/lib/agentWitch/ensureAgentWitchPresenceSchema";
import { getAgentWitchHubInstanceId } from "@/lib/agentWitch/getAgentWitchHubInstanceId";
import { asRowArray, getSql } from "@/lib/db";

export {
  findFreshHubInstanceIdForDevice,
  isDeviceLiveOnAnotherInstance,
  listFreshRegistryDeviceIdsForUser,
  listFreshRegistryDeviceIdsOnOtherInstances,
} from "@/lib/agentWitch/agentWitchConnectionRegistryQueries";

export const upsertAgentWitchConnection = async (input: {
  readonly clientId: string;
  readonly deviceId: string;
  readonly userId: string;
}): Promise<void> => {
  await ensureAgentWitchPresenceSchema();
  const sql = getSql();
  const instanceId = getAgentWitchHubInstanceId();

  await sql`
    INSERT INTO agent_witch_connections (
      client_id,
      device_id,
      user_id,
      instance_id,
      connected_at,
      last_ack_at
    )
    VALUES (
      ${input.clientId},
      ${input.deviceId},
      ${input.userId},
      ${instanceId},
      NOW(),
      NOW()
    )
    ON CONFLICT (client_id) DO UPDATE SET
      device_id = EXCLUDED.device_id,
      user_id = EXCLUDED.user_id,
      instance_id = EXCLUDED.instance_id,
      last_ack_at = NOW()
  `;
};

export const touchAgentWitchConnection = async (
  clientId: string,
): Promise<void> => {
  await ensureAgentWitchPresenceSchema();
  const sql = getSql();

  await sql`
    UPDATE agent_witch_connections
    SET last_ack_at = NOW()
    WHERE client_id = ${clientId}
  `;
};

export const deleteAgentWitchConnection = async (
  clientId: string,
): Promise<void> => {
  await ensureAgentWitchPresenceSchema();
  const sql = getSql();

  await sql`
    DELETE FROM agent_witch_connections
    WHERE client_id = ${clientId}
  `;
};

export const deleteAgentWitchConnectionsForInstance = async (
  instanceId: string,
): Promise<void> => {
  await ensureAgentWitchPresenceSchema();
  const sql = getSql();

  await sql`
    DELETE FROM agent_witch_connections
    WHERE instance_id = ${instanceId}
  `;
};

export const sweepStaleAgentWitchConnections = async (
  staleAfterMs: number = AGENT_WITCH_ONLINE_THRESHOLD_MS,
): Promise<number> => {
  await ensureAgentWitchPresenceSchema();
  const sql = getSql();
  const cutoff = new Date(Date.now() - staleAfterMs).toISOString();

  const result = asRowArray(
    await sql`
      DELETE FROM agent_witch_connections
      WHERE last_ack_at < ${cutoff}::timestamptz
      RETURNING client_id
    `,
  );

  return result.length;
};
