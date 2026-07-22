import { consolidateActiveAgentWitchDeviceByLabel } from "@/lib/agentWitch/consolidateActiveAgentWitchDeviceByLabel";
import { deliverAgentWitchDeviceRestartIfRequested } from "@/lib/agentWitch/deliverAgentWitchDeviceRestart";
import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";
import { updateAgentWitchDeviceInstallBundleVersion } from "@/lib/agentWitch/updateAgentWitchDeviceInstallBundleVersion";
import { updateAgentWitchDeviceWakePort } from "@/lib/agentWitch/updateAgentWitchDeviceWakePort";
import { updateAgentWitchDeviceWakeError } from "@/lib/agentWitch/updateAgentWitchDeviceAuthFields";
import { upgradeAgentWitchDeviceLabelFromLegacyHostname } from "@/lib/agentWitch/upgradeAgentWitchDeviceLabelFromLegacyHostname";

export const runAgentWitchHeartbeatDeviceMaintenance = async (input: {
  readonly runtime: AgentWitchHubRuntime;
  readonly userId: string;
  readonly deviceId: string;
  readonly hostname: string | null;
  readonly installDeviceLabel: string | null;
  readonly installBundleVersion: string | null;
  readonly wakePort: number | null;
  readonly wakeError: string | null;
}): Promise<void> => {
  await updateAgentWitchDeviceWakeError({
    deviceId: input.deviceId,
    wakeError: input.wakeError,
  });

  if (input.installBundleVersion !== null) {
    await updateAgentWitchDeviceInstallBundleVersion({
      deviceId: input.deviceId,
      installBundleVersion: input.installBundleVersion,
    });
  }

  if (input.wakePort !== null) {
    await updateAgentWitchDeviceWakePort({
      deviceId: input.deviceId,
      wakePort: input.wakePort,
    });
  }

  await deliverAgentWitchDeviceRestartIfRequested(input.runtime, {
    userId: input.userId,
    deviceId: input.deviceId,
  });

  if (input.installDeviceLabel !== null) {
    await upgradeAgentWitchDeviceLabelFromLegacyHostname({
      deviceId: input.deviceId,
      userId: input.userId,
      installDeviceLabel: input.installDeviceLabel,
    });
    await consolidateActiveAgentWitchDeviceByLabel({
      userId: input.userId,
      keepDeviceId: input.deviceId,
      deviceLabel: input.installDeviceLabel,
    });
  }
};
