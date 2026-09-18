"use client";

import { useEffect, useMemo, useSyncExternalStore } from "react";

import {
  getLocalAgentWitchIdentitySnapshot,
  subscribeLocalAgentWitchIdentity,
} from "@/features/agent-witch/localAgentWitchIdentityResource";
import {
  getPairedDevicesSnapshotOrEmpty,
  pairedDevicesResource,
} from "@/features/agent-witch/pairedDevicesResource";
import {
  readAgentWitchLocalHostCookie,
  setAgentWitchLocalHostCookie,
} from "@/features/agent-witch/utils/agentWitchLocalHostCookie";
import { collectUniqueWakePorts } from "@/features/agent-witch/utils/collectUniqueWakePorts";
import useProbeLocalMacWakeIdentity from "@/features/home/hooks/useProbeLocalMacWakeIdentity";
import { consumeLocalTokenHashQueryParam } from "@/features/home/utils/consumeLocalTokenHashQueryParam";
import detectBrowserOperatingSystem from "@/features/home/utils/detectBrowserOperatingSystem";
import {
  getLocalMacTokenHashSnapshot,
  setLocalMacTokenHash,
  subscribeLocalMacTokenHash,
} from "@/features/home/utils/localMacTokenHashStore";
import { resolveLocalMacTokenHashFromWakeIdentity } from "@/features/home/utils/resolveLocalMacTokenHashFromWakeIdentity";

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
  const isMacBrowser = operatingSystem === "mac";
  const isCheckingLocalHostname =
    isMacBrowser &&
    (identitySnapshot.status === "idle" ||
      identitySnapshot.status === "loading");
  const pairedDevicesSnapshot = useSyncExternalStore(
    pairedDevicesResource.subscribe,
    () => pairedDevicesResource.getSnapshot(),
    () => null,
  );
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

  useEffect(() => {
    const identity = identitySnapshot.identity;
    if (identity === null) {
      return;
    }

    setAgentWitchLocalHostCookie(identity.hostname);

    const nextTokenHash = resolveLocalMacTokenHashFromWakeIdentity({
      currentTokenHash: getLocalMacTokenHashSnapshot(),
      activeTokenHash: identity.tokenHash,
      localTokenHashes: identity.tokenHashes,
    });
    if (nextTokenHash !== null) {
      setLocalMacTokenHash(nextTokenHash);
    }
  }, [identitySnapshot.identity]);

  return {
    localHostname,
    localTokenHash,
    isCheckingLocalHostname,
    isWakeServerReachable: identitySnapshot.wakeReachable,
  };
};

export default useLocalMacHostname;
