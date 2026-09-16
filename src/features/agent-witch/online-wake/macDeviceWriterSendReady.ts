import {
  canRunWriterDispatchToMac,
  type MacDevicePresence,
} from "./macDevicePresence";

/** Writer send: live on this hub and dispatch-ready (not `isOnline` alone). */
export const isMacWriterSendReady = (device: MacDevicePresence): boolean => {
  if (!canRunWriterDispatchToMac(device)) {
    return false;
  }

  if (device.isDispatchReady === false) {
    return false;
  }

  return device.isDispatchReady === true || device.isConnected === true;
};

export const countWriterSendReadyMacs = (
  devices: readonly MacDevicePresence[],
): number =>
  devices.reduce(
    (count, device) => (isMacWriterSendReady(device) ? count + 1 : count),
    0,
  );

export const hasAnyWriterSendReadyMac = (
  devices: readonly MacDevicePresence[],
): boolean => countWriterSendReadyMacs(devices) > 0;
