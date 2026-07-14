import type { MyMacDevice } from "@/features/agent/hooks/useMyMacDevices";

export const resolveMyMacDevicesAfterFetch = (
  currentDevices: readonly MyMacDevice[],
  nextDevices: readonly MyMacDevice[],
  hadError: boolean,
): readonly MyMacDevice[] => {
  if (hadError) {
    return currentDevices;
  }

  return nextDevices;
};
