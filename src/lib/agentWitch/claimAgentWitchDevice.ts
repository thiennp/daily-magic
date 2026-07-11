import { findAgentWitchDeviceByToken } from "@/lib/agentWitch/findAgentWitchDeviceByToken";
import hashPairingToken from "@/lib/agentWitch/hashPairingToken";
import mapAgentWitchDeviceRow from "@/lib/agentWitch/mapAgentWitchDeviceRow";
import type AgentWitchDeviceRecord from "@/lib/agentWitch/types/AgentWitchDeviceRecord.type";
import { asRowArray, getSql } from "@/lib/db";

export async function claimAgentWitchDevice(input: {
  readonly pairingToken: string;
  readonly userId: string;
  readonly deviceLabel?: string | null;
}): Promise<AgentWitchDeviceRecord> {
  const sql = getSql();
  const tokenHash = hashPairingToken(input.pairingToken);
  const deviceLabel = input.deviceLabel ?? null;
  const existing = await findAgentWitchDeviceByToken(input.pairingToken);

  if (
    existing !== null &&
    existing.revokedAt === null &&
    existing.userId === input.userId
  ) {
    const result = asRowArray(
      await sql`
        UPDATE agent_witch_devices
        SET
          last_seen_at = NOW(),
          device_label = COALESCE(${deviceLabel}, device_label)
        WHERE token_hash = ${tokenHash}
          AND user_id = ${input.userId}
          AND revoked_at IS NULL
        RETURNING id, user_id, device_label, claimed_at, last_seen_at, revoked_at
      `,
    );

    if (result[0]) {
      return mapAgentWitchDeviceRow(result[0]);
    }
  }

  if (
    existing !== null &&
    existing.revokedAt !== null &&
    existing.userId === input.userId
  ) {
    const result = asRowArray(
      await sql`
        UPDATE agent_witch_devices
        SET
          revoked_at = NULL,
          last_seen_at = NOW(),
          device_label = COALESCE(${deviceLabel}, device_label)
        WHERE token_hash = ${tokenHash}
          AND user_id = ${input.userId}
        RETURNING id, user_id, device_label, claimed_at, last_seen_at, revoked_at
      `,
    );

    if (result[0]) {
      return mapAgentWitchDeviceRow(result[0]);
    }
  }

  const insertResult = asRowArray(
    await sql`
      INSERT INTO agent_witch_devices (user_id, token_hash, device_label, last_seen_at)
      VALUES (${input.userId}, ${tokenHash}, ${deviceLabel}, NOW())
      RETURNING id, user_id, device_label, claimed_at, last_seen_at, revoked_at
    `,
  );

  if (insertResult[0]) {
    return mapAgentWitchDeviceRow(insertResult[0]);
  }

  throw new Error("Failed to claim Agent Witch device.");
}
