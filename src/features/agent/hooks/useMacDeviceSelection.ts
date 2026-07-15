"use client";

import { useMemo, useState } from "react";

import useMyMacDevices from "@/features/agent/hooks/useMyMacDevices";

const pickDefaultMacDeviceId = (
  devices: ReadonlyArray<{
    readonly id: string;
    readonly isConnected: boolean;
  }>,
): string => {
  const onlineDevice = devices.find((device) => device.isConnected);
  return onlineDevice?.id ?? devices[0]?.id ?? "";
};

const useMacDeviceSelection = (): {
  readonly devices: ReturnType<typeof useMyMacDevices>["devices"];
  readonly displayNameById: ReturnType<
    typeof useMyMacDevices
  >["displayNameById"];
  readonly selectedDeviceId: string;
  readonly setSelectedDeviceId: (deviceId: string) => void;
  readonly isLoading: boolean;
  readonly hasOnlineMac: boolean;
  readonly onlineCount: number;
  readonly devicesHadLoadError: boolean;
  readonly refreshDevices: () => Promise<void>;
  readonly renameDevice: ReturnType<typeof useMyMacDevices>["renameDevice"];
} => {
  const {
    devices,
    displayNameById,
    isLoading,
    devicesHadLoadError,
    refresh: refreshDevices,
    renameDevice,
  } = useMyMacDevices();
  const [preferredDeviceId, setPreferredDeviceId] = useState("");

  const selectedDeviceId = useMemo(() => {
    if (devices.length === 0) {
      return "";
    }

    const preferredStillExists = devices.some(
      (device) => device.id === preferredDeviceId,
    );

    return preferredStillExists
      ? preferredDeviceId
      : pickDefaultMacDeviceId(devices);
  }, [devices, preferredDeviceId]);

  const onlineCount = devices.filter((device) => device.isConnected).length;

  return {
    devices,
    displayNameById,
    selectedDeviceId,
    setSelectedDeviceId: setPreferredDeviceId,
    isLoading,
    hasOnlineMac: onlineCount > 0,
    onlineCount,
    devicesHadLoadError,
    refreshDevices,
    renameDevice,
  };
};

export default useMacDeviceSelection;
