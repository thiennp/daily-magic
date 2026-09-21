"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";

import {
  ensureLocalAgentWitchIdentityLoaded,
  getLocalAgentWitchIdentitySnapshot,
  retryUnreachableLocalAgentWitchIdentity,
} from "@/features/agent-witch/localAgentWitchIdentityResource";
import { shouldRetryUnreachableWakeIdentityProbe } from "@/features/agent-witch/utils/shouldRetryUnreachableWakeIdentityProbe";

const useProbeLocalMacWakeIdentity = (
  isMacBrowser: boolean,
  extraWakePorts: readonly number[],
): void => {
  const { status: sessionStatus } = useSession();

  useEffect(() => {
    if (!isMacBrowser || sessionStatus !== "authenticated") {
      return;
    }

    void ensureLocalAgentWitchIdentityLoaded(extraWakePorts);

    const retryIfUnreachable = (): void => {
      const snapshot = getLocalAgentWitchIdentitySnapshot();
      if (
        !shouldRetryUnreachableWakeIdentityProbe({
          wakeReachable: snapshot.wakeReachable,
          hasIdentity: snapshot.identity !== null,
          isDocumentVisible: document.visibilityState === "visible",
        })
      ) {
        return;
      }

      void retryUnreachableLocalAgentWitchIdentity(extraWakePorts);
    };

    window.addEventListener("focus", retryIfUnreachable);
    document.addEventListener("visibilitychange", retryIfUnreachable);
    return () => {
      window.removeEventListener("focus", retryIfUnreachable);
      document.removeEventListener("visibilitychange", retryIfUnreachable);
    };
  }, [extraWakePorts, isMacBrowser, sessionStatus]);
};

export default useProbeLocalMacWakeIdentity;
