import { loadMyMacDevicesSnapshot } from "@/features/agent/hooks/public-api/presentation";
import type { MyMacDevice } from "@/features/agent/hooks/public-api/types";
import { createSharedPolledResource } from "@/lib/client/createSharedPolledResource";

export interface PairedDevicesSnapshot {
  readonly devices: readonly MyMacDevice[];
  readonly hadError: boolean;
  readonly serverInstallBundleVersion: string | null;
}

const EMPTY_SNAPSHOT: PairedDevicesSnapshot = {
  devices: [],
  hadError: false,
  serverInstallBundleVersion: null,
};

// d591ae31: a deleted computer whose host still runs kept showing "Seen
// recently". Hide it in this tab at once, whatever a poll still returns.
const REVOKED_HIDE_MS = 10 * 60 * 1000;
const revokedAtById = new Map<string, number>();

const isRecentlyRevoked = (deviceId: string, nowMs: number): boolean => {
  const revokedAt = revokedAtById.get(deviceId);
  return revokedAt !== undefined && nowMs - revokedAt < REVOKED_HIDE_MS;
};

export const withoutRecentlyRevokedDevices = (
  snapshot: PairedDevicesSnapshot,
  nowMs: number = Date.now(),
): PairedDevicesSnapshot => ({
  ...snapshot,
  devices: snapshot.devices.filter(
    (device) => !isRecentlyRevoked(device.id, nowMs),
  ),
});

export const pairedDevicesResource =
  createSharedPolledResource<PairedDevicesSnapshot>({
    fetch: async () =>
      withoutRecentlyRevokedDevices(await loadMyMacDevicesSnapshot()),
  });

export const hidePairedDeviceAfterRevoke = (deviceId: string): void => {
  revokedAtById.set(deviceId, Date.now());
  void pairedDevicesResource.refresh();
};

export const getPairedDevicesSnapshot = (): PairedDevicesSnapshot | null =>
  pairedDevicesResource.getSnapshot();

export const getPairedDevicesSnapshotOrEmpty = (): PairedDevicesSnapshot =>
  pairedDevicesResource.getSnapshot() ?? EMPTY_SNAPSHOT;

export const refreshPairedDevices = (): Promise<PairedDevicesSnapshot | null> =>
  pairedDevicesResource.refresh();
