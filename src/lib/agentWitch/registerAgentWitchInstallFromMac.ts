import { consolidateActiveAgentWitchDeviceByLabel } from "@/lib/agentWitch/consolidateActiveAgentWitchDeviceByLabel";
import { findAgentWitchDeviceByToken } from "@/lib/agentWitch/findAgentWitchDeviceByToken";
import { getAgentWitchPairingStore } from "@/lib/agentWitch/getAgentWitchHub";
import { touchAgentWitchDeviceLastSeen } from "@/lib/agentWitch/touchAgentWitchDeviceLastSeen";
import { updateAgentWitchDeviceInstallBundleVersion } from "@/lib/agentWitch/updateAgentWitchDeviceInstallBundleVersion";
import { updateAgentWitchDevicePlatform } from "@/lib/agentWitch/updateAgentWitchDevicePlatform";
import { updateAgentWitchDeviceWakePort } from "@/lib/agentWitch/updateAgentWitchDeviceWakePort";
import type { AgentWitchDevicePlatform } from "@/lib/agentWitch/types/AgentWitchDevicePlatform.type";

export const registerAgentWitchInstallFromMac = async (input: {
  readonly pairingToken: string;
  readonly deviceLabel: string;
  readonly installBundleVersion?: string;
  readonly wakePort?: number;
  readonly platform?: AgentWitchDevicePlatform;
}): Promise<{ readonly ok: true; readonly deviceId: string } | null> => {
  const device = await findAgentWitchDeviceByToken(input.pairingToken);
  if (device === null || device.revokedAt !== null) {
    return null;
  }

  await touchAgentWitchDeviceLastSeen(input.pairingToken, input.deviceLabel);
  await getAgentWitchPairingStore().touchLastSeen(
    input.pairingToken,
    input.deviceLabel,
  );
  await consolidateActiveAgentWitchDeviceByLabel({
    userId: device.userId,
    keepDeviceId: device.id,
    deviceLabel: input.deviceLabel,
  });

  const installBundleVersion = input.installBundleVersion?.trim() ?? "";
  if (installBundleVersion.length > 0) {
    await updateAgentWitchDeviceInstallBundleVersion({
      deviceId: device.id,
      installBundleVersion,
    });
  }

  if (input.wakePort !== undefined) {
    await updateAgentWitchDeviceWakePort({
      deviceId: device.id,
      wakePort: input.wakePort,
    });
  }

  if (input.platform !== undefined) {
    await updateAgentWitchDevicePlatform({
      deviceId: device.id,
      platform: input.platform,
    });
  }

  return { ok: true, deviceId: device.id };
};
