"use client";

import { useEffect, useState } from "react";

import {
  readAgentWitchLocalHostCookie,
  setAgentWitchLocalHostCookie,
} from "@/features/agent-witch/utils/agentWitchLocalHostCookie";
import { requestLocalAgentWitchAppHealth } from "@/features/agent-witch/utils/requestLocalAgentWitchAppHealth";
import { requestLocalAgentWitchIdentity } from "@/features/agent-witch/utils/requestLocalAgentWitchIdentity";

const useLocalMacBrowserContext = (): {
  readonly localHostname: string | null;
  readonly isWakeServerReachable: boolean;
  readonly isCheckingLocalApp: boolean;
  readonly isLocalAppInstalled: boolean;
} => {
  const [localHostname, setLocalHostname] = useState<string | null>(() =>
    readAgentWitchLocalHostCookie(),
  );
  const [isWakeServerReachable, setIsWakeServerReachable] = useState(false);
  const [isCheckingLocalApp, setIsCheckingLocalApp] = useState(true);

  useEffect(() => {
    const abortController = new AbortController();

    void (async () => {
      const [identity, localApp] = await Promise.all([
        requestLocalAgentWitchIdentity(),
        requestLocalAgentWitchAppHealth(),
      ]);

      if (abortController.signal.aborted) {
        return;
      }

      const reachable = identity !== null || localApp !== null;
      setIsWakeServerReachable(reachable);

      if (identity !== null) {
        setAgentWitchLocalHostCookie(identity.hostname);
        setLocalHostname(identity.hostname);
      }

      setIsCheckingLocalApp(false);
    })();

    return () => {
      abortController.abort();
    };
  }, []);

  return {
    localHostname,
    isWakeServerReachable,
    isCheckingLocalApp,
    isLocalAppInstalled: isWakeServerReachable,
  };
};

export default useLocalMacBrowserContext;
