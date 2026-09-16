import { asRowArray, getSql } from "@/lib/db";

/** Cycle guard: a supersession chain longer than this is treated as corrupt. */
const MAX_SUPERSESSION_HOPS = 5;

/**
 * Follow `superseded_by_device_id` to the device row that replaced the given
 * one after a re-pair. Returns the input id when nothing supersedes it.
 */
export const resolveCurrentAgentWitchDeviceId = async (
  deviceId: string,
): Promise<string> => {
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      WITH RECURSIVE supersession_chain(id, superseded_by_device_id, hop) AS (
        SELECT id, superseded_by_device_id, 0
        FROM agent_witch_devices
        WHERE id = ${deviceId}
        UNION ALL
        SELECT successor.id, successor.superseded_by_device_id, supersession_chain.hop + 1
        FROM agent_witch_devices successor
        JOIN supersession_chain
          ON successor.id = supersession_chain.superseded_by_device_id
        WHERE supersession_chain.hop < ${MAX_SUPERSESSION_HOPS}
      )
      SELECT id
      FROM supersession_chain
      ORDER BY hop DESC
      LIMIT 1
    `,
  );

  const resolvedId = rows[0]?.id;
  return typeof resolvedId === "string" && resolvedId.length > 0
    ? resolvedId
    : deviceId;
};
