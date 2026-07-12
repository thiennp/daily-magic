"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { useDemoPreview } from "@/features/demo/DemoPreviewContext";
import mapPublishedCapabilityToPlaybookTemplate from "@/lib/library/mapPublishedCapabilityToPlaybookTemplate";
import type LibraryPlaybookTemplate from "@/lib/library/types/LibraryPlaybookTemplate.type";
import type PublishedCapabilityRecord from "@/lib/capabilities/types/PublishedCapabilityRecord.type";

export function useAgentComposerPrefill(): {
  readonly libraryPlaybook: LibraryPlaybookTemplate | null;
  readonly rerunPrompt: string;
  readonly isLoading: boolean;
} {
  const searchParams = useSearchParams();
  const demoPreview = useDemoPreview();
  const libraryCapabilityId = searchParams.get("libraryCapabilityId") ?? "";
  const rerunPrompt = searchParams.get("prompt") ?? "";
  const [remotePlaybook, setRemotePlaybook] =
    useState<LibraryPlaybookTemplate | null>(null);
  const [isLoading, setIsLoading] = useState(
    libraryCapabilityId.length > 0 && !demoPreview,
  );

  const demoPlaybook = useMemo(() => {
    if (!demoPreview || libraryCapabilityId.length === 0) {
      return null;
    }

    const match = demoPreview.capabilities.find(
      (capability) => capability.id === libraryCapabilityId,
    );

    return match ? mapPublishedCapabilityToPlaybookTemplate(match) : null;
  }, [demoPreview, libraryCapabilityId]);

  useEffect(() => {
    if (demoPreview || libraryCapabilityId.length === 0) {
      return;
    }

    const loadPlaybook = async (): Promise<void> => {
      try {
        const response = await fetch("/api/capabilities/mine");
        if (!response.ok) {
          return;
        }

        const data: unknown = await response.json();
        if (
          typeof data !== "object" ||
          data === null ||
          !("capabilities" in data) ||
          !Array.isArray((data as { capabilities: unknown }).capabilities)
        ) {
          return;
        }

        const capabilities = (
          data as { capabilities: PublishedCapabilityRecord[] }
        ).capabilities;
        const match = capabilities.find(
          (capability) => capability.id === libraryCapabilityId,
        );
        setRemotePlaybook(
          match ? mapPublishedCapabilityToPlaybookTemplate(match) : null,
        );
      } finally {
        setIsLoading(false);
      }
    };

    void loadPlaybook();
  }, [demoPreview, libraryCapabilityId]);

  return {
    libraryPlaybook: demoPreview ? demoPlaybook : remotePlaybook,
    rerunPrompt,
    isLoading: demoPreview ? false : isLoading,
  };
}
