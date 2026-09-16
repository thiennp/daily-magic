import {
  canDispatchToMac,
  canRunWriterDispatchToMac,
  type MacDevicePresence,
} from "./macDevicePresence";

export const pickDefaultMacDeviceId = (
  devices: readonly ({ readonly id: string } & MacDevicePresence)[],
): string => {
  const liveDevice = devices.find((device) =>
    canRunWriterDispatchToMac(device),
  );
  if (liveDevice !== undefined) {
    return liveDevice.id;
  }

  const dispatchReadyDevice = devices.find((device) =>
    canDispatchToMac(device),
  );
  return dispatchReadyDevice?.id ?? devices[0]?.id ?? "";
};

export const pickAlternateDispatchReadyDeviceId = (
  devices: readonly ({ readonly id: string } & MacDevicePresence)[],
  selectedDeviceId: string,
): string | null => {
  const alternate = devices.find(
    (device) => canDispatchToMac(device) && device.id !== selectedDeviceId,
  );
  return alternate?.id ?? null;
};

export const pickAlternateWriterReadyDeviceId = (
  devices: readonly ({ readonly id: string } & MacDevicePresence)[],
  selectedDeviceId: string,
): string | null => {
  const alternate = devices.find(
    (device) =>
      canRunWriterDispatchToMac(device) && device.id !== selectedDeviceId,
  );
  return alternate?.id ?? null;
};
