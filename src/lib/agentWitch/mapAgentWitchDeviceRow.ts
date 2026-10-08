import { isDispatchPolicy } from "@/lib/dispatch/DispatchPolicy.constant";
import { isAgentWitchDevicePlatform } from "@/lib/agentWitch/isAgentWitchDevicePlatform";
import { parseStoredDeviceWriters } from "@/lib/agentWitch/deviceWriters";
import type AgentWitchDeviceRecord from "@/lib/agentWitch/types/AgentWitchDeviceRecord.type";

const parseAgentWitchDeviceWakePort = (raw: unknown): number | null => {
  if (
    typeof raw === "number" &&
    Number.isInteger(raw) &&
    raw > 0 &&
    raw <= 65_535
  ) {
    return raw;
  }

  if (typeof raw === "string" && /^\d+$/.test(raw.trim())) {
    const parsed = Number(raw.trim());
    if (Number.isInteger(parsed) && parsed > 0 && parsed <= 65_535) {
      return parsed;
    }
  }

  return null;
};

export default function mapAgentWitchDeviceRow(
  row: Record<string, unknown>,
): AgentWitchDeviceRecord {
  const dispatchPolicyRaw = row.dispatch_policy;
  const dispatchPolicy =
    typeof dispatchPolicyRaw === "string" && isDispatchPolicy(dispatchPolicyRaw)
      ? dispatchPolicyRaw
      : null;

  const platformRaw = row.platform;
  const platform =
    typeof platformRaw === "string" && isAgentWitchDevicePlatform(platformRaw)
      ? platformRaw
      : "mac";

  return {
    id: String(row.id),
    userId: String(row.user_id),
    tokenHash: row.token_hash ? String(row.token_hash) : null,
    platform,
    deviceLabel: row.device_label ? String(row.device_label) : null,
    displayName: row.display_name ? String(row.display_name) : null,
    dispatchPolicy,
    claimedAt: String(row.claimed_at),
    lastSeenAt: row.last_seen_at ? String(row.last_seen_at) : null,
    revokedAt: row.revoked_at ? String(row.revoked_at) : null,
    supersededByDeviceId: row.superseded_by_device_id
      ? String(row.superseded_by_device_id)
      : null,
    publicKey: row.public_key ? String(row.public_key) : null,
    preferredWriter: row.preferred_writer ? String(row.preferred_writer) : null,
    lastWakeError: row.last_wake_error ? String(row.last_wake_error) : null,
    lastWakeErrorAt: row.last_wake_error_at
      ? String(row.last_wake_error_at)
      : null,
    installBundleVersion: row.install_bundle_version
      ? String(row.install_bundle_version)
      : null,
    wakePort: parseAgentWitchDeviceWakePort(row.wake_port),
    ...("writers" in row
      ? { writers: parseStoredDeviceWriters(row.writers) }
      : {}),
  };
}
