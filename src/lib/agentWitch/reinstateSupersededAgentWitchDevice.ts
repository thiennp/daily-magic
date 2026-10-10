import { AGENT_WITCH_ONLINE_THRESHOLD_MS } from "@/lib/agentWitch/agentWitchHeartbeat.constant";
import { asRowArray, getSql } from "@/lib/db";

/** Computer seats revoked with the device are restored within this window. */
const MEMBERSHIP_RESTORE_WINDOW_SECONDS = 10;

/**
 * A device that was only superseded (a later install with the same computer
 * label replaced it) comes back when its replacement stopped checking in, so a
 * computer that still holds the old token is never orphaned forever. It also
 * comes back when the replacement row was deleted: the foreign key then nulls
 * `superseded_by_device_id`, which used to leave the old computer revoked with
 * no way back except a manual reinstall (`revoked_reason = 'superseded'` keeps
 * that apart from a removal done on purpose). A device removed on purpose
 * (`user_revoked`, placeholder sweeps, rows revoked before the reason column)
 * is never reinstated here.
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
          AND (
            (
              dev.superseded_by_device_id IS NOT NULL
              AND NOT EXISTS (
                SELECT 1
                FROM agent_witch_devices successor
                WHERE successor.id = dev.superseded_by_device_id
                  AND successor.revoked_at IS NULL
                  AND successor.last_seen_at >
                    NOW() - make_interval(secs => ${AGENT_WITCH_ONLINE_THRESHOLD_MS / 1000})
              )
            )
            OR (
              dev.superseded_by_device_id IS NULL
              AND dev.revoked_reason = 'superseded'
            )
          )
      )
      UPDATE agent_witch_devices dev
      SET revoked_at = NULL, superseded_by_device_id = NULL, revoked_reason = NULL
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
