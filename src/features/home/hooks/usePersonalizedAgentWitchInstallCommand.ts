"use client";

import { useCallback, useEffect, useState } from "react";

import { fetchAgentWitchInstallToken } from "@/lib/agentWitch/fetchAgentWitchInstallToken";

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

  const refresh = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    setError(null);

    const result = await fetchAgentWitchInstallToken();
    if (result.ok && result.installCommand !== undefined) {
      setInstallCommand(result.installCommand);
    } else {
      setError(result.errorMessage ?? "Could not create a Mac install link.");
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!input.enabled) {
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
      } else {
        setError(result.errorMessage ?? "Could not create a Mac install link.");
      }

      setIsLoading(false);
    };

    void loadInstallCommand();

    return () => {
      cancelledRef.current = true;
    };
  }, [input.enabled]);

  return { installCommand, isLoading, error, refresh };
};

export default usePersonalizedAgentWitchInstallCommand;
