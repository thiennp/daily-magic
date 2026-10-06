"use client";

import { useCallback, useEffect, useState } from "react";

import useIsMobileClient from "@/hooks/useIsMobileClient";
import useDeferredInstallTokenIdentityCommit from "@/features/home/hooks/useDeferredInstallTokenIdentityCommit";
import { fetchAgentWitchInstallToken } from "@/lib/agentWitch/fetchAgentWitchInstallToken";

const usePersonalizedAgentWitchInstallCommand = (input: {
  readonly enabled: boolean;
  readonly fallbackInstallCommand: string;
  /** HOME-066: commit mint hash only after enabled becomes false (modal close). */
  readonly commitIdentityWhenDisabled?: boolean;
}): {
  readonly installCommand: string;
  readonly isLoading: boolean;
  readonly error: string | null;
  readonly refresh: () => Promise<void>;
} => {
  const [installCommand, setInstallCommand] = useState(
    input.fallbackInstallCommand,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isMobileClient = useIsMobileClient();
  const enabled = input.enabled && !isMobileClient;
  const { applyMintedTokenHash } = useDeferredInstallTokenIdentityCommit({
    enabled,
    commitIdentityWhenDisabled: input.commitIdentityWhenDisabled === true,
  });

  const refresh = useCallback(async (): Promise<void> => {
    if (isMobileClient) {
      return;
    }

    setIsLoading(true);
    setError(null);

    const result = await fetchAgentWitchInstallToken();
    if (result.ok && result.installCommand !== undefined) {
      setInstallCommand(result.installCommand);
      applyMintedTokenHash(result.tokenHash);
    } else {
      setError(
        result.errorMessage ?? "Could not create a computer install link.",
      );
    }

    setIsLoading(false);
  }, [applyMintedTokenHash, isMobileClient]);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const cancelledRef = { current: false };

    const loadInstallCommand = async (): Promise<void> => {
      setIsLoading(true);
      setError(null);

      const result = await fetchAgentWitchInstallToken();
      if (cancelledRef.current) {
        return;
      }

      if (result.ok && result.installCommand !== undefined) {
        setInstallCommand(result.installCommand);
        applyMintedTokenHash(result.tokenHash);
      } else {
        setError(
          result.errorMessage ?? "Could not create a computer install link.",
        );
      }

      setIsLoading(false);
    };

    void loadInstallCommand();

    return () => {
      cancelledRef.current = true;
    };
  }, [applyMintedTokenHash, enabled]);

  return { installCommand, isLoading, error, refresh };
};

export default usePersonalizedAgentWitchInstallCommand;
