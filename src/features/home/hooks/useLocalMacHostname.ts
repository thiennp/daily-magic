"use client";

import { useEffect, useMemo, useSyncExternalStore } from "react";

import useIsMobileClient from "@/hooks/useIsMobileClient";
import {
  getLocalAgentWitchIdentitySnapshot,
  subscribeLocalAgentWitchIdentity,
} from "@/features/agent-witch/localAgentWitchIdentityResource";
import {
  getPairedDevicesSnapshotOrEmpty,
  pairedDevicesResource,
} from "@/features/agent-witch/pairedDevicesResource";
import { readAgentWitchLocalHostCookie } from "@/features/agent-witch/utils/agentWitchLocalHostCookie";
import { isAgentWitchWakeIdentityProbeSuppressed } from "@/features/agent-witch/utils/agentWitchWakeIdentityProbeSession";
import { collectUniqueWakePorts } from "@/features/agent-witch/utils/collectUniqueWakePorts";
import { resolveLocalTokenHashMatchesReachableDevice } from "@/features/agent-witch/utils/resolveLocalTokenHashMatchesReachableDevice";
import { resolveShouldProbeWakeIdentityInBrowser } from "@/features/agent-witch/utils/resolveShouldProbeWakeIdentityInBrowser";
import useApplyWakeIdentityLocalTokenHash from "@/features/home/hooks/useApplyWakeIdentityLocalTokenHash";
import useProbeLocalMacWakeIdentity from "@/features/home/hooks/useProbeLocalMacWakeIdentity";
import { consumeLocalTokenHashQueryParam } from "@/features/home/utils/consumeLocalTokenHashQueryParam";
import detectBrowserOperatingSystem from "@/features/home/utils/detectBrowserOperatingSystem";
import { resolveIsCheckingLocalMacIdentity } from "@/features/home/utils/resolveIsCheckingLocalMacIdentity";
import {
  getLocalMacTokenHashSnapshot,
  setLocalMacTokenHash,
  subscribeLocalMacTokenHash,
} from "@/features/home/utils/localMacTokenHashStore";
const subscribeToOperatingSystem = (): (() => void) => () => undefined;

const getServerOperatingSystemSnapshot = (): "other" => "other";

const useLocalMacHostname = (): {
  readonly localHostname: string | null;
  readonly localTokenHash: string | null;
  readonly isCheckingLocalHostname: boolean;
  readonly isWakeServerReachable: boolean;
} => {
  const localTokenHash = useSyncExternalStore(
    subscribeLocalMacTokenHash,
    getLocalMacTokenHashSnapshot,
    () => null,
  );
  const identitySnapshot = useSyncExternalStore(
    subscribeLocalAgentWitchIdentity,
    getLocalAgentWitchIdentitySnapshot,
    () => getLocalAgentWitchIdentitySnapshot(),
  );
  const localHostname = useMemo((): string | null => {
    const fromWake = identitySnapshot.identity?.hostname ?? null;
    if (fromWake !== null) {
      return fromWake;
    }
    return readAgentWitchLocalHostCookie();
  }, [identitySnapshot.identity]);
  const operatingSystem = useSyncExternalStore(
    subscribeToOperatingSystem,
    detectBrowserOperatingSystem,
    getServerOperatingSystemSnapshot,
  );
  const isMobileClient = useIsMobileClient();
  // iPhone UAs contain "like Mac OS X"; never treat a mobile client as a Mac.
  const isMacBrowser = operatingSystem === "mac" && !isMobileClient;
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
  const isCheckingLocalHostname = resolveIsCheckingLocalMacIdentity({
    isMacBrowser,
    identityStatus: identitySnapshot.status,
    shouldProbeWakeIdentity: resolveShouldProbeWakeIdentityInBrowser({
      localTokenHash,
      claimedDeviceCount,
      probeSuppressed: isAgentWitchWakeIdentityProbeSuppressed(),
      localTokenHashMatchesReachableDevice,
    }),
  });
  const extraWakePorts = useMemo(
    () =>
      collectUniqueWakePorts(
        (
          pairedDevicesSnapshot ?? getPairedDevicesSnapshotOrEmpty()
        ).devices.map((device) => device.wakePort),
      ),
    [pairedDevicesSnapshot],
  );

  useEffect(() => {
    consumeLocalTokenHashQueryParam({
      href: window.location.href,
      setTokenHash: setLocalMacTokenHash,
      replaceUrl: (nextUrl) => {
        window.history.replaceState({}, "", nextUrl);
      },
    });
  }, []);

  useProbeLocalMacWakeIdentity(isMacBrowser, extraWakePorts);
  useApplyWakeIdentityLocalTokenHash(
    identitySnapshot.identity,
    pairedDevicesSnapshot,
  );

  return {
    localHostname,
    localTokenHash,
    isCheckingLocalHostname,
    isWakeServerReachable: identitySnapshot.wakeReachable,
  };
};

export default useLocalMacHostname;
