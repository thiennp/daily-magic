"use client";

import { useCallback, useEffect, useState } from "react";

import type PublishedCapabilityRecord from "@/lib/capabilities/types/PublishedCapabilityRecord.type";

export function useLibraryCapabilities(refreshKey = 0): {
  readonly capabilities: readonly PublishedCapabilityRecord[];
  readonly isLoading: boolean;
  readonly removeCapability: (capabilityId: string) => void;
} {
  const [capabilities, setCapabilities] = useState<
    readonly PublishedCapabilityRecord[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadLibrary = async (): Promise<void> => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/capabilities/mine");
        if (!response.ok) {
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
        }
      } finally {
        setIsLoading(false);
      }
    };

    void loadLibrary();
  }, [refreshKey]);

  const removeCapability = useCallback((capabilityId: string): void => {
    setCapabilities((current) =>
      current.filter((capability) => capability.id !== capabilityId),
    );
  }, []);

  return { capabilities, isLoading, removeCapability };
}
