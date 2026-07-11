import hashPairingToken from "./hashPairingToken";
import type AgentWitchDeviceRecord from "./types/AgentWitchDeviceRecord.type";
import { asRowArray, getSql } from "@/lib/db";

const mapDeviceRow = (
  row: Record<string, unknown>,
): AgentWitchDeviceRecord => ({
  id: String(row.id),
  userId: String(row.user_id),
  deviceLabel: row.device_label ? String(row.device_label) : null,
  claimedAt: String(row.claimed_at),
  lastSeenAt: row.last_seen_at ? String(row.last_seen_at) : null,
  revokedAt: row.revoked_at ? String(row.revoked_at) : null,
});

export async function findAgentWitchDeviceByToken(
  pairingToken: string,
): Promise<AgentWitchDeviceRecord | null> {
  const sql = getSql();
  const tokenHash = hashPairingToken(pairingToken);
  const result = asRowArray(
    await sql`
      SELECT id, user_id, device_label, claimed_at, last_seen_at, revoked_at
      FROM agent_witch_devices
      WHERE token_hash = ${tokenHash}
      LIMIT 1
    `,
  );

  if (!result[0]) {
    return null;
  }

  return mapDeviceRow(result[0]);
}

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
      return mapDeviceRow(result[0]);
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
      return mapDeviceRow(result[0]);
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
    return mapDeviceRow(insertResult[0]);
  }

  throw new Error("Failed to claim Agent Witch device.");
}

export async function touchAgentWitchDeviceLastSeen(
  pairingToken: string,
  deviceLabel?: string | null,
): Promise<void> {
  const sql = getSql();
  const tokenHash = hashPairingToken(pairingToken);
  const label = deviceLabel ?? null;

  await sql`
    UPDATE agent_witch_devices
    SET
      last_seen_at = NOW(),
      device_label = COALESCE(${label}, device_label)
    WHERE token_hash = ${tokenHash}
      AND revoked_at IS NULL
  `;
}

export async function listAgentWitchDevicesForUser(
  userId: string,
): Promise<readonly AgentWitchDeviceRecord[]> {
  const sql = getSql();
  const result = asRowArray(
    await sql`
      SELECT id, user_id, device_label, claimed_at, last_seen_at, revoked_at
      FROM agent_witch_devices
      WHERE user_id = ${userId}
      ORDER BY COALESCE(last_seen_at, claimed_at) DESC
    `,
  );

  return result.map(mapDeviceRow);
}

export async function revokeAgentWitchDevice(input: {
  readonly deviceId: string;
  readonly userId: string;
}): Promise<boolean> {
  const sql = getSql();
  const result = asRowArray(
    await sql`
      UPDATE agent_witch_devices
      SET revoked_at = NOW()
      WHERE id = ${input.deviceId}
        AND user_id = ${input.userId}
        AND revoked_at IS NULL
      RETURNING id
    `,
  );

  return result.length > 0;
}
