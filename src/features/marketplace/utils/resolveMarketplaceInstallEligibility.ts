import {
  canDispatchToMac,
  resolveMacPresenceTier,
} from "@/features/agent-witch/utils/macDevicePresence";
import type { MyMacDevice } from "@/features/agent/hooks/useMyMacDevices";
import { isOfficialPresetMarketplaceCapabilityId } from "@/lib/marketplace/presetMarketplaceCapabilityId";

export const resolveMarketplaceInstallEligibility = (input: {
  readonly capabilityId: string | null;
  readonly selectedDevice: MyMacDevice | undefined;
  readonly isWakeServerReachable: boolean;
  readonly isDemoPreview: boolean;
  readonly status: "idle" | "installing" | "done" | "error";
}): {
  readonly canInstall: boolean;
  readonly canInstallHarnessLocally: boolean;
  readonly needsLiveConnection: boolean;
} => {
  const isOfficialPreset =
    input.capabilityId !== null &&
    isOfficialPresetMarketplaceCapabilityId(input.capabilityId);
  const canInstallHarnessLocally =
    isOfficialPreset &&
    input.isWakeServerReachable &&
    input.selectedDevice !== undefined;
  const canInstall =
    input.capabilityId !== null &&
    !input.isDemoPreview &&
    input.selectedDevice !== undefined &&
    (canDispatchToMac(input.selectedDevice) ||
      canInstallHarnessLocally ||
      isOfficialPreset) &&
    input.status !== "installing";
  const needsLiveConnection =
    !canInstallHarnessLocally &&
    input.selectedDevice !== undefined &&
    resolveMacPresenceTier(input.selectedDevice) === "recent";

  return {
    canInstall,
    canInstallHarnessLocally,
    needsLiveConnection,
  };
};
