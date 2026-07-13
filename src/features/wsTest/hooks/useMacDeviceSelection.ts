"use client";

import { useMemo, useState } from "react";

import useMyMacDevices from "@/features/wsTest/hooks/useMyMacDevices";

const pickDefaultMacDeviceId = (
  devices: ReadonlyArray<{ readonly id: string; readonly isOnline: boolean }>,
): string => {
  const onlineDevice = devices.find((device) => device.isOnline);
  return onlineDevice?.id ?? devices[0]?.id ?? "";
};

const useMacDeviceSelection = (): {
  readonly devices: ReturnType<typeof useMyMacDevices>["devices"];
  readonly displayNameById: ReturnType<typeof useMyMacDevices>["displayNameById"];
  readonly selectedDeviceId: string;
  readonly setSelectedDeviceId: (deviceId: string) => void;
  readonly isLoading: boolean;
  readonly hasOnlineMac: boolean;
  readonly onlineCount: number;
  readonly renameDevice: ReturnType<typeof useMyMacDevices>["renameDevice"];
} => {
  const { devices, displayNameById, isLoading, renameDevice } =
    useMyMacDevices();
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

  const onlineCount = devices.filter((device) => device.isOnline).length;

  return {
    devices,
    displayNameById,
    selectedDeviceId,
    setSelectedDeviceId: setPreferredDeviceId,
    isLoading,
    hasOnlineMac: onlineCount > 0,
    onlineCount,
    renameDevice,
  };
};

export default useMacDeviceSelection;
