"use client";

import { useDemoPreview } from "@/features/demo/DemoPreviewContext";
import { demoMacDevices } from "@/features/demo/mock/demoMacDevices";
import useMyMacDevices, {
  type MyMacDevice,
} from "@/features/agent/hooks/useMyMacDevices";
import { buildMacDeviceDisplayNameById } from "@/lib/agentWitch/resolveMacDeviceDisplayName";
import { useMemo } from "react";

const useHomeConnectedMacs = (): {
  readonly devices: readonly MyMacDevice[];
  readonly displayNameById: ReadonlyMap<string, string>;
  readonly isLoading: boolean;
  readonly renameDevice: (deviceId: string, deviceLabel: string) => void;
} => {
  const demoPreview = useDemoPreview();
  const { devices, displayNameById, isLoading, renameDevice } =
    useMyMacDevices();
  const demoDisplayNameById = useMemo(
    () => buildMacDeviceDisplayNameById(demoMacDevices),
    [],
  );

  if (demoPreview) {
    return {
      devices: demoMacDevices.map((device) => ({ ...device })),
      displayNameById: demoDisplayNameById,
      isLoading: false,
      renameDevice: () => undefined,
    };
  }

  return { devices, displayNameById, isLoading, renameDevice };
};

export default useHomeConnectedMacs;
