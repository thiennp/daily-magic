"use client";

import { useEffect, useState } from "react";

import { requestLocalAgentWitchIdentity } from "@/features/agent-witch/utils/requestLocalAgentWitchIdentity";
import {
  readAgentWitchLocalHostCookie,
  setAgentWitchLocalHostCookie,
} from "@/features/agent-witch/utils/agentWitchLocalHostCookie";
import detectBrowserOperatingSystem from "@/features/home/utils/detectBrowserOperatingSystem";

const useLocalMacHostname = (): {
  readonly localHostname: string | null;
  readonly isCheckingLocalHostname: boolean;
} => {
  const [localHostname, setLocalHostname] = useState<string | null>(() =>
    readAgentWitchLocalHostCookie(),
  );
  const [isCheckingLocalHostname, setIsCheckingLocalHostname] = useState(
    () =>
      detectBrowserOperatingSystem() === "mac" &&
      readAgentWitchLocalHostCookie() === null,
  );

  useEffect(() => {
    if (detectBrowserOperatingSystem() !== "mac") {
      return;
    }

    if (readAgentWitchLocalHostCookie() !== null) {
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
      }

      setIsCheckingLocalHostname(false);
    });

    return () => {
      abortController.abort();
    };
  }, []);

  return { localHostname, isCheckingLocalHostname };
};

export default useLocalMacHostname;
