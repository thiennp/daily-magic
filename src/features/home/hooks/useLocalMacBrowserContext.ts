"use client";

import { useEffect, useState } from "react";

import {
  readAgentWitchLocalHostCookie,
  setAgentWitchLocalHostCookie,
} from "@/lib/agentWitch/agentWitchLocalHostCookie";
import { requestLocalAgentWitchIdentity } from "@/lib/agentWitch/requestLocalAgentWitchIdentity";

const useLocalMacBrowserContext = (): {
  readonly localHostname: string | null;
  readonly isWakeServerReachable: boolean;
} => {
  const [localHostname, setLocalHostname] = useState<string | null>(null);
  const [isWakeServerReachable, setIsWakeServerReachable] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    setLocalHostname(readAgentWitchLocalHostCookie());

    void requestLocalAgentWitchIdentity().then((identity) => {
      if (abortController.signal.aborted) {
        return;
      }

      if (identity === null) {
        setIsWakeServerReachable(false);
        return;
      }

      setAgentWitchLocalHostCookie(identity.hostname);
      setLocalHostname(identity.hostname);
      setIsWakeServerReachable(true);
    });

    return () => {
      abortController.abort();
    };
  }, []);

  return { localHostname, isWakeServerReachable };
};

export default useLocalMacBrowserContext;
