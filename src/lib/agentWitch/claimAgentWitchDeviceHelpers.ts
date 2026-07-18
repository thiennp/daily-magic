import mapAgentWitchDeviceRow from "@/lib/agentWitch/mapAgentWitchDeviceRow";
import type AgentWitchDeviceRecord from "@/lib/agentWitch/types/AgentWitchDeviceRecord.type";
import { asRowArray, getSql } from "@/lib/db";

export const isUniqueTokenHashViolation = (error: unknown): boolean => {
  if (typeof error !== "object" || error === null) {
    return false;
  }

  const record = error as { code?: unknown; constraint?: unknown };
  return (
    record.code === "23505" &&
    record.constraint === "agent_witch_devices_token_hash_key"
  );
};

export const updateExistingClaimForUser = async (input: {
  readonly tokenHash: string;
  readonly userId: string;
  readonly deviceLabel: string | null;
  readonly unrevoke: boolean;
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
          RETURNING id, user_id, device_label, display_name, dispatch_policy, claimed_at, last_seen_at, revoked_at
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
          RETURNING id, user_id, device_label, display_name, dispatch_policy, claimed_at, last_seen_at, revoked_at
        `,
      );

  return result[0] ? mapAgentWitchDeviceRow(result[0]) : null;
};

export const insertAgentWitchDeviceClaim = async (input: {
  readonly userId: string;
  readonly tokenHash: string;
  readonly deviceLabel: string | null;
}): Promise<AgentWitchDeviceRecord> => {
  const sql = getSql();
  const insertResult = asRowArray(
    await sql`
      INSERT INTO agent_witch_devices (user_id, token_hash, device_label, last_seen_at)
      VALUES (${input.userId}, ${input.tokenHash}, ${input.deviceLabel}, NOW())
      RETURNING id, user_id, device_label, display_name, dispatch_policy, claimed_at, last_seen_at, revoked_at
    `,
  );

  if (!insertResult[0]) {
    throw new Error("Failed to claim Agent Witch device.");
  }

  return mapAgentWitchDeviceRow(insertResult[0]);
};

export const revokeSiblingDevicesWithSameLabel = async (input: {
  readonly keepDeviceId: string;
  readonly userId: string;
  readonly deviceLabel: string;
}): Promise<void> => {
  const sql = getSql();
  await sql`
    UPDATE agent_witch_devices
    SET revoked_at = NOW()
    WHERE user_id = ${input.userId}
      AND revoked_at IS NULL
      AND device_label = ${input.deviceLabel.trim()}
      AND id <> ${input.keepDeviceId}
  `;
};
