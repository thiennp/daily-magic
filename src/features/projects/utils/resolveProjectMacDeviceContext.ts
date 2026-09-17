import type { MyMacDevice } from "@/features/agent/hooks/useMyMacDevices";
import { deviceMatchesLocalTokenHash } from "@/features/agent-witch/online-wake";

export interface ProjectMacDeviceContext {
  readonly device: MyMacDevice | null;
  readonly deviceDisplayName: string;
  readonly isThisMac: boolean;
}

const resolveProjectMacDeviceContext = (input: {
  readonly projectDeviceId: string | null;
  readonly devices: readonly MyMacDevice[];
  readonly displayNameById: ReadonlyMap<string, string>;
  readonly localTokenHash: string | null;
}): ProjectMacDeviceContext => {
  const deviceId = input.projectDeviceId?.trim() ?? "";
  const device =
    deviceId.length > 0
      ? (input.devices.find((candidate) => candidate.id === deviceId) ?? null)
      : null;

  const deviceDisplayName =
    device !== null
      ? (input.displayNameById.get(device.id) ??
        device.displayName ??
        device.deviceLabel ??
        "Mac")
      : "Mac";

  const isThisMac =
    device !== null &&
    input.localTokenHash !== null &&
    deviceMatchesLocalTokenHash(device.tokenHash, input.localTokenHash);

  return { device, deviceDisplayName, isThisMac };
};

export default resolveProjectMacDeviceContext;
