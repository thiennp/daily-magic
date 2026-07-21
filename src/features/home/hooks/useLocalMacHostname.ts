"use client";

import { useEffect, useState } from "react";

import { requestLocalAgentWitchIdentity } from "@/features/agent-witch/utils/requestLocalAgentWitchIdentity";
import {
  readAgentWitchLocalHostCookie,
  setAgentWitchLocalHostCookie,
} from "@/features/agent-witch/utils/agentWitchLocalHostCookie";
import {
  clearAgentWitchLocalTokenHashCookie,
  readAgentWitchLocalTokenHashCookie,
  setAgentWitchLocalTokenHashCookie,
} from "@/features/agent-witch/utils/agentWitchLocalTokenHashCookie";
import detectBrowserOperatingSystem from "@/features/home/utils/detectBrowserOperatingSystem";

const useLocalMacHostname = (): {
  readonly localHostname: string | null;
  readonly localTokenHash: string | null;
  readonly isCheckingLocalHostname: boolean;
} => {
  const [localHostname, setLocalHostname] = useState<string | null>(() =>
    readAgentWitchLocalHostCookie(),
  );
  const [localTokenHash, setLocalTokenHash] = useState<string | null>(() =>
    readAgentWitchLocalTokenHashCookie(),
  );
  const [isCheckingLocalHostname, setIsCheckingLocalHostname] = useState(
    () => detectBrowserOperatingSystem() === "mac",
  );

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
          setAgentWitchLocalTokenHashCookie(identity.tokenHash);
          setLocalTokenHash(identity.tokenHash);
        } else {
          clearAgentWitchLocalTokenHashCookie();
          setLocalTokenHash(null);
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
