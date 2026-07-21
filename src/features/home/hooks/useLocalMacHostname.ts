"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

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

    void requestLocalAgentWitchIdentity().then((identity) => {
      if (abortController.signal.aborted) {
        return;
      }

      if (identity !== null) {
        setAgentWitchLocalHostCookie(identity.hostname);
        setLocalHostname(identity.hostname);

        if (identity.tokenHash !== null) {
          setLocalMacTokenHash(identity.tokenHash);
        }
      }

      setIsCheckingLocalHostname(false);
    });

    return () => {
      abortController.abort();
    };
  }, []);

  return { localHostname, localTokenHash, isCheckingLocalHostname };
};

export default useLocalMacHostname;
