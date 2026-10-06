"use client";

import { useCallback, useEffect, useRef } from "react";

import { rememberAgentWitchInstallTokenHash } from "@/features/home/utils/rememberAgentWitchInstallTokenHash";
import { shouldHoldInstallTokenIdentityCommit } from "@/features/home/utils/shouldHoldInstallTokenIdentityCommit";

/**
 * HOME-066: optionally hold a minted install-token hash until `enabled` is false
 * so modal owners are not remounted mid-flight by identity updates.
 */
const useDeferredInstallTokenIdentityCommit = (input: {
  readonly enabled: boolean;
  readonly commitIdentityWhenDisabled: boolean;
}): {
  readonly applyMintedTokenHash: (tokenHash: string | undefined) => void;
} => {
  const pendingTokenHashRef = useRef<string | undefined>(undefined);
  const { enabled, commitIdentityWhenDisabled } = input;

  const commitPendingIdentity = useCallback((): void => {
    const tokenHash = pendingTokenHashRef.current;
    if (tokenHash === undefined) {
      return;
    }
    pendingTokenHashRef.current = undefined;
    rememberAgentWitchInstallTokenHash(tokenHash);
  }, []);

  const applyMintedTokenHash = useCallback(
    (tokenHash: string | undefined): void => {
      if (tokenHash === undefined || tokenHash.length === 0) {
        return;
      }
      if (
        shouldHoldInstallTokenIdentityCommit({
          commitIdentityWhenDisabled,
          enabled,
        })
      ) {
        pendingTokenHashRef.current = tokenHash;
        return;
      }
      pendingTokenHashRef.current = undefined;
      rememberAgentWitchInstallTokenHash(tokenHash);
    },
    [commitIdentityWhenDisabled, enabled],
  );

  useEffect(() => {
    if (
      !shouldHoldInstallTokenIdentityCommit({
        commitIdentityWhenDisabled,
        enabled,
      })
    ) {
      commitPendingIdentity();
    }
  }, [commitIdentityWhenDisabled, commitPendingIdentity, enabled]);

  return { applyMintedTokenHash };
};

export default useDeferredInstallTokenIdentityCommit;
