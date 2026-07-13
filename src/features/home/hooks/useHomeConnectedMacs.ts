"use client";

import { useDemoPreview } from "@/features/demo/DemoPreviewContext";
import { demoMacDevices } from "@/features/demo/mock/demoMacDevices";
import useMyMacDevices, {
  type MyMacDevice,
} from "@/features/wsTest/hooks/useMyMacDevices";

const useHomeConnectedMacs = (): {
  readonly devices: readonly MyMacDevice[];
  readonly isLoading: boolean;
} => {
  const demoPreview = useDemoPreview();
  const { devices, isLoading } = useMyMacDevices();

  if (demoPreview) {
    return {
      devices: demoMacDevices.map((device) => ({ ...device })),
      isLoading: false,
    };
  }

  return { devices, isLoading };
};

export default useHomeConnectedMacs;
