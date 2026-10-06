"use client";

import { useCallback, useEffect, useState } from "react";

import useIsMobileClient from "@/hooks/useIsMobileClient";
import { refreshLocalAgentWitchIdentity } from "@/features/agent-witch/localAgentWitchIdentityResource";
import { setLocalMacTokenHash } from "@/features/home/utils/localMacTokenHashStore";
import { fetchAgentWitchInstallToken } from "@/lib/agentWitch/fetchAgentWitchInstallToken";

const rememberInstallTokenHash = (tokenHash: string | undefined): void => {
  if (tokenHash !== undefined && tokenHash.length > 0) {
    setLocalMacTokenHash(tokenHash);
    void refreshLocalAgentWitchIdentity();
  }
};

const usePersonalizedAgentWitchInstallCommand = (input: {
  readonly enabled: boolean;
  readonly fallbackInstallCommand: string;
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

  const refresh = useCallback(async (): Promise<void> => {
    if (isMobileClient) {
      return;
    }

    setIsLoading(true);
    setError(null);

    const result = await fetchAgentWitchInstallToken();
    if (result.ok && result.installCommand !== undefined) {
      setInstallCommand(result.installCommand);
      rememberInstallTokenHash(result.tokenHash);
    } else {
      setError(
        result.errorMessage ?? "Could not create a computer install link.",
      );
    }

    setIsLoading(false);
  }, [isMobileClient]);

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
        rememberInstallTokenHash(result.tokenHash);
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
  }, [enabled]);

  return { installCommand, isLoading, error, refresh };
};

export default usePersonalizedAgentWitchInstallCommand;
