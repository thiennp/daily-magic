import { AGENT_WITCH_ONLINE_THRESHOLD_MS } from "@/lib/agentWitch/agentWitchHeartbeat.constant";
import { asRowArray, getSql } from "@/lib/db";

/** Computer seats revoked with the device are restored within this window. */
const MEMBERSHIP_RESTORE_WINDOW_SECONDS = 10;

/**
 * A device that was only superseded (a later install with the same computer
 * label replaced it) comes back when its replacement stopped checking in, so a
 * computer that still holds the old token is never orphaned forever. A device
 * removed on purpose has no replacement and is never reinstated here.
 */
export const reinstateSupersededAgentWitchDevice = async (
  deviceId: string,
): Promise<boolean> => {
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      WITH target AS (
        SELECT dev.id, dev.revoked_at
        FROM agent_witch_devices dev
        WHERE dev.id = ${deviceId}
          AND dev.revoked_at IS NOT NULL
          AND dev.superseded_by_device_id IS NOT NULL
          AND NOT EXISTS (
            SELECT 1
            FROM agent_witch_devices successor
            WHERE successor.id = dev.superseded_by_device_id
              AND successor.revoked_at IS NULL
              AND successor.last_seen_at >
                NOW() - make_interval(secs => ${AGENT_WITCH_ONLINE_THRESHOLD_MS / 1000})
          )
      )
      UPDATE agent_witch_devices dev
      SET revoked_at = NULL, superseded_by_device_id = NULL
      FROM target
      WHERE dev.id = target.id
      RETURNING target.revoked_at AS previous_revoked_at
    `,
  );
  const previousRevokedAt = rows[0]?.previous_revoked_at;
  if (previousRevokedAt === undefined || previousRevokedAt === null) {
    return false;
  }

  try {
    await sql`
      UPDATE project_memberships seat
      SET status = 'active', revoked_at = NULL
      WHERE seat.device_id = ${deviceId}
        AND seat.member_kind = 'computer'
        AND seat.status = 'revoked'
        AND seat.revoked_at BETWEEN
          ${String(previousRevokedAt)}::timestamptz - make_interval(secs => ${MEMBERSHIP_RESTORE_WINDOW_SECONDS})
          AND ${String(previousRevokedAt)}::timestamptz + make_interval(secs => ${MEMBERSHIP_RESTORE_WINDOW_SECONDS})
    `;
  } catch (error) {
    console.error("[agent-witch] seat restore after reinstate failed", error);
  }
  return true;
};
