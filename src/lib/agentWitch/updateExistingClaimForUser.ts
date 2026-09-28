import mapAgentWitchDeviceRow from "@/lib/agentWitch/mapAgentWitchDeviceRow";
import type AgentWitchDeviceRecord from "@/lib/agentWitch/types/AgentWitchDeviceRecord.type";
import { asRowArray, getSql } from "@/lib/db";

export const updateExistingClaimForUser = async (input: {
  readonly tokenHash: string;
  readonly userId: string;
  readonly deviceLabel: string | null;
  readonly unrevoke: boolean;
  readonly recordLastSeen?: boolean;
}): Promise<AgentWitchDeviceRecord | null> => {
  const sql = getSql();
  const result = input.unrevoke
    ? asRowArray(
        await sql`
          UPDATE agent_witch_devices
          SET
            revoked_at = NULL,
            last_seen_at = NOW(),
            device_label = COALESCE(${input.deviceLabel}, device_label)
          WHERE token_hash = ${input.tokenHash}
            AND user_id = ${input.userId}
          RETURNING id, user_id, platform, device_label, display_name, dispatch_policy, claimed_at, last_seen_at, revoked_at
        `,
      )
    : input.recordLastSeen === false
      ? asRowArray(
          await sql`
            UPDATE agent_witch_devices
            SET device_label = COALESCE(${input.deviceLabel}, device_label)
            WHERE token_hash = ${input.tokenHash}
              AND user_id = ${input.userId}
              AND revoked_at IS NULL
            RETURNING id, user_id, platform, device_label, display_name, dispatch_policy, claimed_at, last_seen_at, revoked_at
          `,
        )
      : asRowArray(
          await sql`
            UPDATE agent_witch_devices
            SET
              last_seen_at = NOW(),
              device_label = COALESCE(${input.deviceLabel}, device_label)
            WHERE token_hash = ${input.tokenHash}
              AND user_id = ${input.userId}
              AND revoked_at IS NULL
            RETURNING id, user_id, platform, device_label, display_name, dispatch_policy, claimed_at, last_seen_at, revoked_at
          `,
        );

  return result[0] ? mapAgentWitchDeviceRow(result[0]) : null;
};
