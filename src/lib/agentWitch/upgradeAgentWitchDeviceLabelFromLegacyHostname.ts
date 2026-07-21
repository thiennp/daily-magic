import mapAgentWitchDeviceRow from "@/lib/agentWitch/mapAgentWitchDeviceRow";
import {
  isCompositeAgentWitchInstallDeviceLabel,
  parseAgentWitchInstallDeviceLabel,
} from "@/lib/agentWitch/buildAgentWitchInstallDeviceLabel";
import type AgentWitchDeviceRecord from "@/lib/agentWitch/types/AgentWitchDeviceRecord.type";
import { asRowArray, getSql } from "@/lib/db";

/**
 * Upgrade a paired device from legacy bare-hostname device_label to
 * hostname#macosUsername without creating a duplicate row (AGENT-048).
 */
export const upgradeAgentWitchDeviceLabelFromLegacyHostname = async (input: {
  readonly deviceId: string;
  readonly userId: string;
  readonly installDeviceLabel: string;
}): Promise<AgentWitchDeviceRecord | null> => {
  if (!isCompositeAgentWitchInstallDeviceLabel(input.installDeviceLabel)) {
    return null;
  }

  const parsed = parseAgentWitchInstallDeviceLabel(input.installDeviceLabel);
  const sql = getSql();
  const result = asRowArray(
    await sql`
      UPDATE agent_witch_devices
      SET device_label = ${input.installDeviceLabel.trim()}
      WHERE id = ${input.deviceId}
        AND user_id = ${input.userId}
        AND revoked_at IS NULL
        AND (
          device_label = ${parsed.hostname}
          OR device_label IS NULL
          OR btrim(device_label) = ''
        )
      RETURNING id, user_id, device_label, display_name, dispatch_policy, claimed_at, last_seen_at, revoked_at
    `,
  );

  if (!result[0]) {
    return null;
  }

  return mapAgentWitchDeviceRow(result[0]);
};
