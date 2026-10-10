import { AGENT_WITCH_ONLINE_THRESHOLD_MS } from "@/lib/agentWitch/agentWitchHeartbeat.constant";
import mapAgentWitchDeviceRow from "@/lib/agentWitch/mapAgentWitchDeviceRow";
import type AgentWitchDeviceRecord from "@/lib/agentWitch/types/AgentWitchDeviceRecord.type";
import { revokeProjectComputerMembershipsForDevice } from "@/lib/projects/acl/revokeProjectComputerMembershipsForDevice";
import { assertComputerEntitlement } from "@/lib/billing/assertComputerEntitlement";
import { BillingGateError } from "@/lib/billing/billingGateError";
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

export const insertAgentWitchDeviceClaim = async (input: {
  readonly userId: string;
  readonly tokenHash: string;
  readonly deviceLabel: string | null;
  /**
   * Real check-in (pairing / heartbeat path) records presence.
   * Connect this computer only reserves a token, so it must leave `last_seen_at` null
   * until the Mac actually checks in (HOME-059).
   */
  readonly recordLastSeen?: boolean;
}): Promise<AgentWitchDeviceRecord> => {
  const gate = await assertComputerEntitlement({ userId: input.userId });
  if (!gate.ok) {
    throw new BillingGateError(gate);
  }
  const sql = getSql();
  const insertResult = asRowArray(
    input.recordLastSeen === false
      ? await sql`
          INSERT INTO agent_witch_devices (user_id, token_hash, device_label, platform)
          VALUES (${input.userId}, ${input.tokenHash}, ${input.deviceLabel}, 'mac')
          RETURNING id, user_id, platform, device_label, display_name, dispatch_policy, claimed_at, last_seen_at, revoked_at
        `
      : await sql`
          INSERT INTO agent_witch_devices (user_id, token_hash, device_label, platform, last_seen_at)
          VALUES (${input.userId}, ${input.tokenHash}, ${input.deviceLabel}, 'mac', NOW())
          RETURNING id, user_id, platform, device_label, display_name, dispatch_policy, claimed_at, last_seen_at, revoked_at
        `,
  );

  if (!insertResult[0]) {
    throw new Error("Failed to claim AgentWitch device.");
  }

  return mapAgentWitchDeviceRow(insertResult[0]);
};

/** 61e9c49e: supersedes only same-install (install_id) or legacy rows. */
export const revokeSiblingDevicesWithSameLabel = async (input: {
  readonly keepDeviceId: string;
  readonly userId: string;
  readonly deviceLabels: readonly string[];
  /**
   * Heartbeat consolidation must not orphan a computer that is still checking
   * in: only siblings silent for the online window are superseded.
   */
  readonly skipLive?: boolean;
}): Promise<void> => {
  const matchedLabels = [
    ...new Set(
      input.deviceLabels
        .map((deviceLabel) => deviceLabel.trim())
        .filter((deviceLabel) => deviceLabel.length > 0),
    ),
  ];

  if (matchedLabels.length === 0) {
    return;
  }

  const sql = getSql();
  const revoked = asRowArray(
    await sql`
      UPDATE agent_witch_devices
      SET revoked_at = NOW(),
          revoked_reason = 'superseded',
          superseded_by_device_id = ${input.keepDeviceId}
      WHERE user_id = ${input.userId}
        AND revoked_at IS NULL
        AND device_label = ANY(${matchedLabels}::text[])
        AND id <> ${input.keepDeviceId}
        AND (
          install_id IS NULL
          OR install_id = (
            SELECT keep.install_id
            FROM agent_witch_devices keep
            WHERE keep.id = ${input.keepDeviceId}
          )
        )
        AND (
          ${input.skipLive !== true}
          OR last_seen_at IS NULL
          OR last_seen_at < NOW() - make_interval(secs => ${AGENT_WITCH_ONLINE_THRESHOLD_MS / 1000})
        )
      RETURNING id
    `,
  );
  for (const row of revoked) {
    await revokeProjectComputerMembershipsForDevice({
      deviceId: String(row.id),
    });
  }
};
