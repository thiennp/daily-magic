import { loadMyMacDevicesSnapshot } from "@/features/agent/hooks/fetchMyMacDevicesFromApi";
import type { MyMacDevice } from "@/features/agent/hooks/useMyMacDevices";
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

export const pairedDevicesResource =
  createSharedPolledResource<PairedDevicesSnapshot>({
    fetch: loadMyMacDevicesSnapshot,
  });

export const getPairedDevicesSnapshot = (): PairedDevicesSnapshot | null =>
  pairedDevicesResource.getSnapshot();

export const getPairedDevicesSnapshotOrEmpty = (): PairedDevicesSnapshot =>
  pairedDevicesResource.getSnapshot() ?? EMPTY_SNAPSHOT;

export const refreshPairedDevices = (): Promise<PairedDevicesSnapshot | null> =>
  pairedDevicesResource.refresh();
