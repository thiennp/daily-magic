"use client";

import { useMyMacDevices } from "@/features/agent/hooks/public-api/presentation";
import type { MyMacDevice } from "@/features/agent/hooks/public-api/types";

const useHomeConnectedMacs = (): {
  readonly devices: readonly MyMacDevice[];
  readonly displayNameById: ReadonlyMap<string, string>;
  readonly isLoading: boolean;
  readonly serverInstallBundleVersion: string | null;
  readonly renameDevice: (deviceId: string, deviceLabel: string) => void;
  readonly refreshDevices: () => Promise<void>;
} => {
  const {
    devices,
    displayNameById,
    isLoading,
    serverInstallBundleVersion,
    renameDevice,
    refresh,
  } = useMyMacDevices();

  return {
    devices,
    displayNameById,
    isLoading,
    serverInstallBundleVersion,
    renameDevice,
    refreshDevices: refresh,
  };
};

export default useHomeConnectedMacs;
