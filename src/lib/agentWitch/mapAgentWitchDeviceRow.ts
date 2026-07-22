import { isDispatchPolicy } from "@/lib/dispatch/DispatchPolicy.constant";
import type AgentWitchDeviceRecord from "@/lib/agentWitch/types/AgentWitchDeviceRecord.type";

export default function mapAgentWitchDeviceRow(
  row: Record<string, unknown>,
): AgentWitchDeviceRecord {
  const dispatchPolicyRaw = row.dispatch_policy;
  const dispatchPolicy =
    typeof dispatchPolicyRaw === "string" && isDispatchPolicy(dispatchPolicyRaw)
      ? dispatchPolicyRaw
      : null;

  return {
    id: String(row.id),
    userId: String(row.user_id),
    tokenHash: row.token_hash ? String(row.token_hash) : null,
    deviceLabel: row.device_label ? String(row.device_label) : null,
    displayName: row.display_name ? String(row.display_name) : null,
    dispatchPolicy,
    claimedAt: String(row.claimed_at),
    lastSeenAt: row.last_seen_at ? String(row.last_seen_at) : null,
    revokedAt: row.revoked_at ? String(row.revoked_at) : null,
    publicKey: row.public_key ? String(row.public_key) : null,
    preferredWriter: row.preferred_writer ? String(row.preferred_writer) : null,
    lastWakeError: row.last_wake_error ? String(row.last_wake_error) : null,
    lastWakeErrorAt: row.last_wake_error_at
      ? String(row.last_wake_error_at)
      : null,
    installBundleVersion: row.install_bundle_version
      ? String(row.install_bundle_version)
      : null,
    wakePort:
      typeof row.wake_port === "number" &&
      Number.isInteger(row.wake_port) &&
      row.wake_port > 0
        ? row.wake_port
        : null,
  };
}
