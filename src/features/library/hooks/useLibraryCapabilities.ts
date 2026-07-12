"use client";

import { useEffect, useState } from "react";

import { useDemoPreview } from "@/features/demo/DemoPreviewContext";
import type PublishedCapabilityRecord from "@/lib/capabilities/types/PublishedCapabilityRecord.type";

export function useLibraryCapabilities(refreshKey = 0): {
  readonly capabilities: readonly PublishedCapabilityRecord[];
  readonly isLoading: boolean;
} {
  const demoPreview = useDemoPreview();
  const [capabilities, setCapabilities] = useState<
    readonly PublishedCapabilityRecord[]
  >(() => demoPreview?.capabilities ?? []);
  const [isLoading, setIsLoading] = useState(() => !demoPreview);

  useEffect(() => {
    if (demoPreview) {
      return;
    }

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
  }, [demoPreview, refreshKey]);

  return { capabilities, isLoading };
}
