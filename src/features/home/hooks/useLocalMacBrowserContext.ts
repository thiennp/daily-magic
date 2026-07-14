"use client";

import { useEffect, useState } from "react";

import {
  readAgentWitchLocalHostCookie,
  setAgentWitchLocalHostCookie,
} from "@/features/agent-witch/utils/agentWitchLocalHostCookie";
import { requestLocalAgentWitchIdentity } from "@/features/agent-witch/utils/requestLocalAgentWitchIdentity";

const useLocalMacBrowserContext = (): {
  readonly localHostname: string | null;
  readonly isWakeServerReachable: boolean;
} => {
  const [localHostname, setLocalHostname] = useState<string | null>(() =>
    readAgentWitchLocalHostCookie(),
  );
  const [isWakeServerReachable, setIsWakeServerReachable] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();

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
