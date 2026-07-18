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

  const result = asRowArray(
    await sql`
      UPDATE agent_witch_devices
      SET
        token_hash = ${input.tokenHash},
        last_seen_at = NOW(),
        device_label = COALESCE(${input.deviceLabel}, device_label),
        revoked_at = NULL
      WHERE id = ${input.deviceId}
        AND user_id = ${input.userId}
      RETURNING id, user_id, device_label, display_name, dispatch_policy, claimed_at, last_seen_at, revoked_at
    `,
  );

  return result[0] ? mapAgentWitchDeviceRow(result[0]) : null;
};
