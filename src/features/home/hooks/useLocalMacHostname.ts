"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";

import { collectUniqueWakePorts } from "@/features/agent-witch/utils/collectUniqueWakePorts";
import {
  getPairedDevicesSnapshotOrEmpty,
  pairedDevicesResource,
} from "@/features/agent-witch/pairedDevicesResource";
import { requestLocalAgentWitchIdentity } from "@/features/agent-witch/utils/requestLocalAgentWitchIdentity";
import {
  readAgentWitchLocalHostCookie,
  setAgentWitchLocalHostCookie,
} from "@/features/agent-witch/utils/agentWitchLocalHostCookie";
import { consumeLocalTokenHashQueryParam } from "@/features/home/utils/consumeLocalTokenHashQueryParam";
import {
  getLocalMacTokenHashSnapshot,
  setLocalMacTokenHash,
  subscribeLocalMacTokenHash,
} from "@/features/home/utils/localMacTokenHashStore";
import { resolveLocalMacTokenHashFromWakeIdentity } from "@/features/home/utils/resolveLocalMacTokenHashFromWakeIdentity";
import detectBrowserOperatingSystem from "@/features/home/utils/detectBrowserOperatingSystem";

const useLocalMacHostname = (): {
  readonly localHostname: string | null;
  readonly localTokenHash: string | null;
  readonly isCheckingLocalHostname: boolean;
} => {
  const [localHostname, setLocalHostname] = useState<string | null>(() =>
    readAgentWitchLocalHostCookie(),
  );
  const localTokenHash = useSyncExternalStore(
    subscribeLocalMacTokenHash,
    getLocalMacTokenHashSnapshot,
    () => null,
  );
  const [isCheckingLocalHostname, setIsCheckingLocalHostname] = useState(
    () => detectBrowserOperatingSystem() === "mac",
  );
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

  useEffect(() => {
    if (detectBrowserOperatingSystem() !== "mac") {
      return;
    }

    const abortController = new AbortController();

    void requestLocalAgentWitchIdentity({ extraWakePorts }).then((identity) => {
      if (abortController.signal.aborted) {
        return;
      }

      if (identity !== null) {
        setAgentWitchLocalHostCookie(identity.hostname);
        setLocalHostname(identity.hostname);

        const nextTokenHash = resolveLocalMacTokenHashFromWakeIdentity({
          currentTokenHash: getLocalMacTokenHashSnapshot(),
          activeTokenHash: identity.tokenHash,
          localTokenHashes: identity.tokenHashes,
        });
        if (nextTokenHash !== null) {
          setLocalMacTokenHash(nextTokenHash);
        }
      }

      setIsCheckingLocalHostname(false);
    });

    return () => {
      abortController.abort();
    };
  }, [extraWakePorts]);

  return { localHostname, localTokenHash, isCheckingLocalHostname };
};

export default useLocalMacHostname;
