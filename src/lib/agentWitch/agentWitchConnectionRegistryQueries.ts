import { AGENT_WITCH_ONLINE_THRESHOLD_MS } from "@/lib/agentWitch/agentWitchHeartbeat.constant";
import { ensureAgentWitchPresenceSchema } from "@/lib/agentWitch/ensureAgentWitchPresenceSchema";
import { getAgentWitchHubInstanceId } from "@/lib/agentWitch/getAgentWitchHubInstanceId";
import { asRowArray, getSql } from "@/lib/db";

const readDeviceIdsFromRows = (
  rows: readonly Record<string, unknown>[],
): ReadonlySet<string> =>
  new Set(
    rows
      .map((row) => row.device_id)
      .filter((value): value is string => typeof value === "string"),
  );

export const listFreshRegistryDeviceIdsForUser = async (
  userId: string,
  staleAfterMs: number = AGENT_WITCH_ONLINE_THRESHOLD_MS,
): Promise<ReadonlySet<string>> => {
  await ensureAgentWitchPresenceSchema();
  const sql = getSql();
  const cutoff = new Date(Date.now() - staleAfterMs).toISOString();

  const rows = asRowArray(
    await sql`
      SELECT DISTINCT device_id
      FROM agent_witch_connections
      WHERE user_id = ${userId}
        AND last_ack_at >= ${cutoff}::timestamptz
    `,
  );

  return readDeviceIdsFromRows(rows);
};

export const listFreshRegistryDeviceIdsOnOtherInstances = async (
  userId: string,
  staleAfterMs: number = AGENT_WITCH_ONLINE_THRESHOLD_MS,
): Promise<ReadonlySet<string>> => {
  await ensureAgentWitchPresenceSchema();
  const sql = getSql();
  const instanceId = getAgentWitchHubInstanceId();
  const cutoff = new Date(Date.now() - staleAfterMs).toISOString();

  const rows = asRowArray(
    await sql`
      SELECT DISTINCT device_id
      FROM agent_witch_connections
      WHERE user_id = ${userId}
        AND instance_id <> ${instanceId}
        AND last_ack_at >= ${cutoff}::timestamptz
    `,
  );

  return readDeviceIdsFromRows(rows);
};

export const findFreshHubInstanceIdForDevice = async (
  userId: string,
  deviceId: string,
  staleAfterMs: number = AGENT_WITCH_ONLINE_THRESHOLD_MS,
): Promise<string | null> => {
  await ensureAgentWitchPresenceSchema();
  const sql = getSql();
  const cutoff = new Date(Date.now() - staleAfterMs).toISOString();

  const rows = asRowArray(
    await sql`
      SELECT instance_id
      FROM agent_witch_connections
      WHERE user_id = ${userId}
        AND device_id = ${deviceId}
        AND last_ack_at >= ${cutoff}::timestamptz
      ORDER BY last_ack_at DESC
      LIMIT 1
    `,
  );

  const instanceId = rows[0]?.instance_id;
  return typeof instanceId === "string" && instanceId.length > 0
    ? instanceId
    : null;
};

export const isDeviceLiveOnAnotherInstance = async (
  userId: string,
  deviceId: string,
  staleAfterMs: number = AGENT_WITCH_ONLINE_THRESHOLD_MS,
): Promise<boolean> => {
  await ensureAgentWitchPresenceSchema();
  const sql = getSql();
  const instanceId = getAgentWitchHubInstanceId();
  const cutoff = new Date(Date.now() - staleAfterMs).toISOString();

  const rows = asRowArray(
    await sql`
      SELECT client_id
      FROM agent_witch_connections
      WHERE user_id = ${userId}
        AND device_id = ${deviceId}
        AND instance_id <> ${instanceId}
        AND last_ack_at >= ${cutoff}::timestamptz
      LIMIT 1
    `,
  );

  return rows.length > 0;
};
