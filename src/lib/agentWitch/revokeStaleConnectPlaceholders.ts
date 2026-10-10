import { asRowArray, getSql } from "@/lib/db";

/**
 * 544db9dd: a Connect placeholder that never checked in within a day is
 * abandoned. Its install command is no longer expected to run; opening
 * Connect again mints a fresh one.
 */
export const AGENT_WITCH_CONNECT_PLACEHOLDER_TTL_HOURS = 24;

/** Server-side sweep across all users. Returns how many rows were revoked. */
export const revokeStaleConnectPlaceholders = async (): Promise<number> => {
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      UPDATE agent_witch_devices
      SET revoked_at = NOW(),
          revoked_reason = 'placeholder_sweep'
      WHERE revoked_at IS NULL
        AND install_bundle_version IS NULL
        AND public_key IS NULL
        AND last_handshake_at IS NULL
        AND COALESCE(btrim(display_name), '') = ''
        AND COALESCE(btrim(device_label), '') = ''
        AND claimed_at < NOW() - make_interval(hours => ${AGENT_WITCH_CONNECT_PLACEHOLDER_TTL_HOURS})
        AND (
          last_seen_at IS NULL
          OR last_seen_at < NOW() - make_interval(hours => ${AGENT_WITCH_CONNECT_PLACEHOLDER_TTL_HOURS})
        )
      RETURNING id
    `,
  );
  return rows.length;
};
