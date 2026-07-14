export const MAC_DEVICE_REVOKED_EVENT = "daily-magic:mac-device-revoked";

export interface MacDeviceRevokedEventDetail {
  readonly deviceId: string;
}

export const notifyMacDeviceRevoked = (deviceId: string): void => {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(
    new CustomEvent<MacDeviceRevokedEventDetail>(MAC_DEVICE_REVOKED_EVENT, {
      detail: { deviceId },
    }),
  );
};
