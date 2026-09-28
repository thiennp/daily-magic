import { getSql } from "@/lib/db";

/**
 * Drops extra Connect-this-Mac placeholders for one user and keeps the newest.
 *
 * A placeholder has no hostname, display name, install bundle, handshake, or
 * device key. Computers that have checked in stay. `last_seen_at` is not a
 * signal: install-token inserts used to stamp it, so each click looked
 * "seen recently" and the old `last_seen_at IS NULL` cleanup never matched
 * (HOME-059).
 */
export const revokePendingInstallDevicesForUser = async (input: {
  readonly userId: string;
}): Promise<void> => {
  const sql = getSql();

  await sql`
    UPDATE agent_witch_devices AS device
    SET revoked_at = NOW()
    WHERE device.user_id = ${input.userId}
      AND device.revoked_at IS NULL
      AND device.platform = 'mac'
      AND device.install_bundle_version IS NULL
      AND device.public_key IS NULL
      AND device.last_handshake_at IS NULL
      AND (device.device_label IS NULL OR btrim(device.device_label) = '')
      AND (device.display_name IS NULL OR btrim(device.display_name) = '')
      AND device.id <> (
        SELECT newest.id
        FROM agent_witch_devices AS newest
        WHERE newest.user_id = ${input.userId}
          AND newest.revoked_at IS NULL
          AND newest.platform = 'mac'
          AND newest.install_bundle_version IS NULL
          AND newest.public_key IS NULL
          AND newest.last_handshake_at IS NULL
          AND (newest.device_label IS NULL OR btrim(newest.device_label) = '')
          AND (newest.display_name IS NULL OR btrim(newest.display_name) = '')
        ORDER BY newest.claimed_at DESC, newest.id DESC
        LIMIT 1
      )
  `;

  await sql`
    UPDATE agent_witch_devices AS device
    SET last_seen_at = NULL
    WHERE device.user_id = ${input.userId}
      AND device.revoked_at IS NULL
      AND device.platform = 'mac'
      AND device.install_bundle_version IS NULL
      AND device.public_key IS NULL
      AND device.last_handshake_at IS NULL
      AND (device.device_label IS NULL OR btrim(device.device_label) = '')
      AND (device.display_name IS NULL OR btrim(device.display_name) = '')
  `;
};
