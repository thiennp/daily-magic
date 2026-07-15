"use client";

import { useMemo, useState } from "react";

import {
  canDispatchToMac,
  pickDefaultMacDeviceId,
} from "@/features/agent-witch/utils/macDevicePresence";
import useMyMacDevices from "@/features/agent/hooks/useMyMacDevices";

const useMacDeviceSelection = (): {
  readonly devices: ReturnType<typeof useMyMacDevices>["devices"];
  readonly displayNameById: ReturnType<
    typeof useMyMacDevices
  >["displayNameById"];
  readonly selectedDeviceId: string;
  readonly setSelectedDeviceId: (deviceId: string) => void;
  readonly isLoading: boolean;
  readonly hasDispatchReadyMac: boolean;
  readonly dispatchReadyMacCount: number;
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

  const dispatchReadyMacCount = devices.filter((device) =>
    canDispatchToMac(device),
  ).length;

  return {
    devices,
    displayNameById,
    selectedDeviceId,
    setSelectedDeviceId: setPreferredDeviceId,
    isLoading,
    hasDispatchReadyMac: dispatchReadyMacCount > 0,
    dispatchReadyMacCount,
    devicesHadLoadError,
    refreshDevices,
    renameDevice,
  };
};

export default useMacDeviceSelection;
