import { clearAgentWitchDevicePublicKey } from "@/lib/agentWitch/updateAgentWitchDeviceAuthFields";
import mapAgentWitchDeviceRow from "@/lib/agentWitch/mapAgentWitchDeviceRow";
import type AgentWitchDeviceRecord from "@/lib/agentWitch/types/AgentWitchDeviceRecord.type";
import { asRowArray, getSql } from "@/lib/db";

export const rotatePairingTokenOnExistingDevice = async (input: {
  readonly deviceId: string;
  readonly userId: string;
  readonly tokenHash: string;
  readonly deviceLabel: string | null;
}): Promise<AgentWitchDeviceRecord | null> => {
  const sql = getSql();
  // Free the unique hash from any other row before assigning it.
  await sql`
    UPDATE agent_witch_devices
    SET
      token_hash = 'freed:' || id::text || ':' || gen_random_uuid()::text,
      revoked_at = COALESCE(revoked_at, NOW())
    WHERE token_hash = ${input.tokenHash}
      AND id <> ${input.deviceId}
  `;

  // Re-pair clears the pinned device key (public_key = NULL) so the next
  // successful register can pin a new one. Keep label, handshake, bundle, and
  // display_name so placeholder cleanup does not treat this live computer as
  // an unused install claim.
  const result = asRowArray(
    await sql`
      UPDATE agent_witch_devices
      SET
        token_hash = ${input.tokenHash},
        public_key = NULL,
        last_seen_at = NOW(),
        device_label = COALESCE(${input.deviceLabel}, device_label),
        revoked_at = NULL
      WHERE id = ${input.deviceId}
        AND user_id = ${input.userId}
      RETURNING id, user_id, device_label, display_name, dispatch_policy, claimed_at, last_seen_at, revoked_at
    `,
  );

  if (!result[0]) {
    return null;
  }

  // Shared clear helper — idempotent after the UPDATE above; keeps re-pair
  // clearing on one code path for any future call sites.
  await clearAgentWitchDevicePublicKey({ deviceId: input.deviceId });

  return mapAgentWitchDeviceRow(result[0]);
};
