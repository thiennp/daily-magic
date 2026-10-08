import hashPairingToken from "@/lib/agentWitch/hashPairingToken";
import { asRowArray, getSql } from "@/lib/db";

/** The active pairing placeholder for this token, if it never checked in. */
export const findAgentWitchPlaceholderByToken = async (
  pairingToken: string,
): Promise<{ readonly id: string; readonly userId: string } | null> => {
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      SELECT id, user_id
      FROM agent_witch_devices
      WHERE token_hash = ${hashPairingToken(pairingToken)}
        AND revoked_at IS NULL
        AND install_bundle_version IS NULL
        AND public_key IS NULL
        AND last_handshake_at IS NULL
        AND COALESCE(btrim(display_name), '') = ''
        AND COALESCE(btrim(device_label), '') = ''
      LIMIT 1
    `,
  );
  const row = rows[0];
  return row === undefined
    ? null
    : { id: String(row.id), userId: String(row.user_id) };
};

export const revokeAgentWitchPlaceholder = async (
  deviceId: string,
): Promise<void> => {
  const sql = getSql();
  await sql`
    UPDATE agent_witch_devices
    SET revoked_at = NOW()
    WHERE id = ${deviceId}
      AND revoked_at IS NULL
  `;
};
