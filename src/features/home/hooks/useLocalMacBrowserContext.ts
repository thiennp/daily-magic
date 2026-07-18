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

    void requestLocalAgentWitchIdentity().then((identity) => {
      if (abortController.signal.aborted) {
        return;
      }

      if (identity === null) {
        setIsWakeServerReachable(false);
        setIsCheckingLocalApp(false);
        return;
      }

      setAgentWitchLocalHostCookie(identity.hostname);
      setLocalHostname(identity.hostname);
      setIsWakeServerReachable(true);
      setIsCheckingLocalApp(false);
    });

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
