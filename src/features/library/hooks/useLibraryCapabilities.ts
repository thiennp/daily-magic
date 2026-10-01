"use client";

import { useCallback, useEffect, useState } from "react";

import type PublishedCapabilityRecord from "@/lib/capabilities/types/PublishedCapabilityRecord.type";

export function useLibraryCapabilities(
  refreshKey = 0,
  enabled = true,
): {
  readonly capabilities: readonly PublishedCapabilityRecord[];
  readonly isLoading: boolean;
  readonly loadFailed: boolean;
  readonly reload: () => void;
  readonly removeCapability: (capabilityId: string) => void;
} {
  const [capabilities, setCapabilities] = useState<
    readonly PublishedCapabilityRecord[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadFailed, setLoadFailed] = useState(false);
  const [reloadNonce, setReloadNonce] = useState(0);

  const reload = useCallback((): void => {
    setReloadNonce((nonce) => nonce + 1);
  }, []);

  useEffect(() => {
    if (!enabled) {
      return undefined;
    }

    const loadLibrary = async (): Promise<void> => {
      setIsLoading(true);
      setLoadFailed(false);
      try {
        const response = await fetch("/api/capabilities/mine");
        if (!response.ok) {
          setLoadFailed(true);
          return;
        }

        const data: unknown = await response.json();
        if (
          typeof data === "object" &&
          data !== null &&
          "capabilities" in data &&
          Array.isArray((data as { capabilities: unknown }).capabilities)
        ) {
          setCapabilities(
            (data as { capabilities: PublishedCapabilityRecord[] })
              .capabilities,
          );
        } else {
          setLoadFailed(true);
        }
      } catch {
        setLoadFailed(true);
      } finally {
        setIsLoading(false);
      }
    };

    void loadLibrary();
  }, [enabled, refreshKey, reloadNonce]);

  const removeCapability = useCallback((capabilityId: string): void => {
    setCapabilities((current) =>
      current.filter((capability) => capability.id !== capabilityId),
    );
  }, []);

  return {
    capabilities,
    isLoading: enabled && isLoading,
    loadFailed: enabled && loadFailed,
    reload,
    removeCapability,
  };
}
