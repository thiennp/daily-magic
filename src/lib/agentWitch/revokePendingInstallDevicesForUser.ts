import { getSql } from "@/lib/db";

/**
 * Drops Connect-this-Mac placeholders for one user.
 *
 * A placeholder has no hostname, display name, install bundle, handshake, or
 * device key. Computers that have checked in stay. `last_seen_at` is not a
 * signal: install-token inserts used to stamp it (HOME-059).
 *
 * Always keep the newest placeholder (and any claimed within the in-flight
 * grace window) so multi-Mac Connect can mint while another Mac is live
 * (HOME-065 Soft HOLD). `hasLiveMac` no longer wipes every placeholder —
 * that killed the in-flight claim on devices GET.
 */
export const AGENT_WITCH_CONNECT_PLACEHOLDER_CLAIM_GRACE_MINUTES = 30;

export const revokePendingInstallDevicesForUser = async (input: {
  readonly userId: string;
  /** Kept for callers; Soft HOLD keeps newest + grace either way. */
  readonly hasLiveMac?: boolean;
  /** When set, never revoke the row for this install-token hash (in-flight mint). */
  readonly protectTokenHash?: string | null;
}): Promise<void> => {
  const sql = getSql();
  const protectTokenHash = input.protectTokenHash?.trim().toLowerCase() ?? "";
  // hasLiveMac remains part of the Soft HOLD API for devices GET callers; wipe-all removed.
  void input.hasLiveMac;

  if (protectTokenHash.length > 0) {
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
        AND lower(coalesce(device.token_hash, '')) <> ${protectTokenHash}
        AND device.claimed_at < NOW() - INTERVAL '30 minutes'
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
  } else {
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
        AND device.claimed_at < NOW() - INTERVAL '30 minutes'
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
  }

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
