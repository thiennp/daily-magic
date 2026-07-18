import { PREFERRED_MAC_DEVICE_STORAGE_KEY } from "@/features/agent/constants/preferredMacDeviceStorage.constant";

export const readPreferredMacDeviceId = (): string => {
  if (typeof window === "undefined") {
    return "";
  }

  return window.localStorage.getItem(PREFERRED_MAC_DEVICE_STORAGE_KEY) ?? "";
};

export const writePreferredMacDeviceId = (deviceId: string): void => {
  if (typeof window === "undefined" || deviceId.length === 0) {
    return;
  }

  window.localStorage.setItem(PREFERRED_MAC_DEVICE_STORAGE_KEY, deviceId);
};

export const hasRememberedMacDeviceInList = (
  deviceIds: readonly string[],
): boolean => {
  const preferredDeviceId = readPreferredMacDeviceId();

  return preferredDeviceId.length > 0 && deviceIds.includes(preferredDeviceId);
};
