"use client";

import useMyMacDevices, {
  type MyMacDevice,
} from "@/features/agent/hooks/useMyMacDevices";

const useHomeConnectedMacs = (): {
  readonly devices: readonly MyMacDevice[];
  readonly displayNameById: ReadonlyMap<string, string>;
  readonly isLoading: boolean;
  readonly renameDevice: (deviceId: string, deviceLabel: string) => void;
  readonly refreshDevices: () => Promise<void>;
} => {
  const { devices, displayNameById, isLoading, renameDevice, refresh } =
    useMyMacDevices();

  return {
    devices,
    displayNameById,
    isLoading,
    renameDevice,
    refreshDevices: refresh,
  };
};

export default useHomeConnectedMacs;
