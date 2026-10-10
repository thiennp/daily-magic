"use client";

import { useSession } from "next-auth/react";
import { useEffect, useSyncExternalStore } from "react";

import { isAgentWitchWakeIdentityProbeSuppressed } from "@/features/agent-witch/utils/public-api/presentation";
import { resolveLocalTokenHashMatchesReachableDevice } from "@/features/agent-witch/utils/public-api/presentation";
import { resolveShouldProbeWakeIdentityInBrowser } from "@/features/agent-witch/utils/public-api/presentation";
import {
  getPairedDevicesSnapshotOrEmpty,
  pairedDevicesResource,
} from "@/features/agent-witch/public-api/presentation";
import {
  ensureLocalAgentWitchIdentityLoaded,
  getLocalAgentWitchIdentitySnapshot,
  retryUnreachableLocalAgentWitchIdentity,
} from "@/features/agent-witch/public-api/presentation";
import { shouldRetryUnreachableWakeIdentityProbe } from "@/features/agent-witch/utils/public-api/presentation";
import {
  getLocalMacTokenHashSnapshot,
  subscribeLocalMacTokenHash,
} from "@/features/home/utils/localMacTokenHashStore";

const useProbeLocalMacWakeIdentity = (
  isMacBrowser: boolean,
  extraWakePorts: readonly number[],
): void => {
  const { status: sessionStatus } = useSession();
  const localTokenHash = useSyncExternalStore(
    subscribeLocalMacTokenHash,
    getLocalMacTokenHashSnapshot,
    () => null,
  );
  const pairedDevicesSnapshot = useSyncExternalStore(
    pairedDevicesResource.subscribe,
    () => pairedDevicesResource.getSnapshot(),
    () => null,
  );
  const devices = (pairedDevicesSnapshot ?? getPairedDevicesSnapshotOrEmpty())
    .devices;
  const claimedDeviceCount = devices.length;
  const localTokenHashMatchesReachableDevice =
    resolveLocalTokenHashMatchesReachableDevice({
      localTokenHash,
      devices,
    });

  useEffect(() => {
    if (!isMacBrowser || sessionStatus !== "authenticated") {
      return;
    }

    if (
      !resolveShouldProbeWakeIdentityInBrowser({
        localTokenHash,
        claimedDeviceCount,
        probeSuppressed: isAgentWitchWakeIdentityProbeSuppressed(),
        localTokenHashMatchesReachableDevice,
      })
    ) {
      return;
    }

    void ensureLocalAgentWitchIdentityLoaded(extraWakePorts);

    const retryIfUnreachable = (): void => {
      const latestDevices = (
        pairedDevicesResource.getSnapshot() ?? getPairedDevicesSnapshotOrEmpty()
      ).devices;
      const latestTokenHash = getLocalMacTokenHashSnapshot();
      if (
        !resolveShouldProbeWakeIdentityInBrowser({
          localTokenHash: latestTokenHash,
          claimedDeviceCount: latestDevices.length,
          probeSuppressed: isAgentWitchWakeIdentityProbeSuppressed(),
          localTokenHashMatchesReachableDevice:
            resolveLocalTokenHashMatchesReachableDevice({
              localTokenHash: latestTokenHash,
              devices: latestDevices,
            }),
        })
      ) {
        return;
      }

      const snapshot = getLocalAgentWitchIdentitySnapshot();
      if (
        !shouldRetryUnreachableWakeIdentityProbe({
          wakeReachable: snapshot.wakeReachable,
          hasIdentity: snapshot.identity !== null,
          isDocumentVisible: document.visibilityState === "visible",
        })
      ) {
        return;
      }

      void retryUnreachableLocalAgentWitchIdentity(extraWakePorts);
    };

    window.addEventListener("focus", retryIfUnreachable);
    document.addEventListener("visibilitychange", retryIfUnreachable);
    return () => {
      window.removeEventListener("focus", retryIfUnreachable);
      document.removeEventListener("visibilitychange", retryIfUnreachable);
    };
  }, [
    claimedDeviceCount,
    extraWakePorts,
    isMacBrowser,
    localTokenHash,
    localTokenHashMatchesReachableDevice,
    sessionStatus,
  ]);
};

export default useProbeLocalMacWakeIdentity;
