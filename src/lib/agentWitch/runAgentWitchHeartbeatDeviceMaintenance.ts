import { consolidateActiveAgentWitchDeviceByLabel } from "@/lib/agentWitch/consolidateActiveAgentWitchDeviceByLabel";
import { deliverAgentWitchDeviceRestartIfRequested } from "@/lib/agentWitch/deliverAgentWitchDeviceRestart";
import type AgentWitchHubRuntime from "@/lib/agentWitch/types/AgentWitchHubRuntime.type";
import { updateAgentWitchDeviceInstallBundleVersion } from "@/lib/agentWitch/updateAgentWitchDeviceInstallBundleVersion";
import { updateAgentWitchDeviceWakeError } from "@/lib/agentWitch/updateAgentWitchDeviceAuthFields";

export const runAgentWitchHeartbeatDeviceMaintenance = async (input: {
  readonly runtime: AgentWitchHubRuntime;
  readonly userId: string;
  readonly deviceId: string;
  readonly hostname: string | null;
  readonly installBundleVersion: string | null;
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

  await deliverAgentWitchDeviceRestartIfRequested(input.runtime, {
    userId: input.userId,
    deviceId: input.deviceId,
  });

  if (input.hostname !== null) {
    await consolidateActiveAgentWitchDeviceByLabel({
      userId: input.userId,
      keepDeviceId: input.deviceId,
      deviceLabel: input.hostname,
    });
  }
};
