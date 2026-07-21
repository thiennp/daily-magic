import type AgentWitchDeviceRecord from "@/lib/agentWitch/types/AgentWitchDeviceRecord.type";
import { isReusableDeviceLabel } from "@/lib/agentWitch/findActiveAgentWitchDeviceByUserAndLabel";
import { listAgentWitchDevicesForUser } from "@/lib/agentWitch/listAgentWitchDevicesForUser";
import { pickPreferredAgentWitchDevice } from "@/lib/agentWitch/pickPreferredAgentWitchDevice";
import { consolidateActiveAgentWitchDeviceByLabel } from "@/lib/agentWitch/consolidateActiveAgentWitchDeviceByLabel";

export const consolidateDuplicateAgentWitchDevicesForUser = async (input: {
  readonly userId: string;
  readonly preferDeviceIds?: ReadonlySet<string>;
}): Promise<void> => {
  const devices = await listAgentWitchDevicesForUser(input.userId);
  const devicesByLabel = new Map<string, AgentWitchDeviceRecord[]>();

  for (const device of devices) {
    if (!isReusableDeviceLabel(device.deviceLabel)) {
      continue;
    }

    const label = device.deviceLabel.trim();
    const group = devicesByLabel.get(label) ?? [];
    group.push(device);
    devicesByLabel.set(label, group);
  }

  for (const [label, group] of devicesByLabel) {
    if (group.length <= 1) {
      continue;
    }

    const keepDevice = pickPreferredAgentWitchDevice(
      group,
      input.preferDeviceIds,
    );

    await consolidateActiveAgentWitchDeviceByLabel({
      userId: input.userId,
      keepDeviceId: keepDevice.id,
      deviceLabel: label,
    });
  }
};
