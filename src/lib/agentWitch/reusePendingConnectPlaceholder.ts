import { AGENT_WITCH_CONNECT_PLACEHOLDER_TTL_HOURS } from "@/lib/agentWitch/revokeStaleConnectPlaceholders";
import { asRowArray, getSql } from "@/lib/db";

/**
 * bca9b1eb (544db9dd follow-up): every "Connect another computer" open used to
 * mint a new pairing row, so Reports listed "Unnamed computer … Not reported"
 * stubs. Opening it again now moves the fresh token onto the user's newest
 * pairing row that has never checked in. Returns false when there is none.
 */
export const reusePendingConnectPlaceholder = async (input: {
  readonly userId: string;
  readonly tokenHash: string;
}): Promise<boolean> => {
  const sql = getSql();
  const rows = asRowArray(
    await sql`
      UPDATE agent_witch_devices
      SET token_hash = ${input.tokenHash}, claimed_at = NOW(), last_seen_at = NULL
      WHERE id = (
        SELECT id
        FROM agent_witch_devices
        WHERE user_id = ${input.userId}
          AND revoked_at IS NULL
          AND platform = 'mac'
          AND install_bundle_version IS NULL
          AND public_key IS NULL
          AND last_handshake_at IS NULL
          AND COALESCE(btrim(display_name), '') = ''
          AND COALESCE(btrim(device_label), '') = ''
          AND claimed_at >= NOW() - make_interval(hours => ${AGENT_WITCH_CONNECT_PLACEHOLDER_TTL_HOURS})
        ORDER BY claimed_at DESC, id DESC
        LIMIT 1
      )
      RETURNING id
    `,
  );
  return rows.length > 0;
};
