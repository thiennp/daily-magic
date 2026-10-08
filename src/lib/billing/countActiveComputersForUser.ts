import { asRowArray, getSql } from "@/lib/db";

/**
 * Active (non-revoked) computers for entitlement checks.
 * 544db9dd: a pending pairing placeholder (Connect opened, never checked in:
 * no bundle, key, handshake or name) is not a computer and never counts.
 */
export const countActiveComputersForUser = async (
  userId: string,
): Promise<number> => {
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT COUNT(*)::int AS n
      FROM agent_witch_devices
      WHERE user_id = ${userId}
        AND revoked_at IS NULL
        AND NOT (
          install_bundle_version IS NULL
          AND public_key IS NULL
          AND last_handshake_at IS NULL
          AND COALESCE(btrim(display_name), '') = ''
          AND COALESCE(btrim(device_label), '') = ''
        )
    `,
  );
  return Number(rows[0]?.n ?? 0) || 0;
};
