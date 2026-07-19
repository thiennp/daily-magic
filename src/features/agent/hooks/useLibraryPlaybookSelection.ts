"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

import { useLibraryCapabilities } from "@/features/library/hooks/useLibraryCapabilities";
import { CapabilityStatus } from "@/lib/capabilities/CapabilityStatus.constant";
import type PublishedCapabilityRecord from "@/lib/capabilities/types/PublishedCapabilityRecord.type";
import mapPublishedCapabilityToPlaybookTemplate from "@/lib/library/mapPublishedCapabilityToPlaybookTemplate";
import type LibraryPlaybookTemplate from "@/lib/library/types/LibraryPlaybookTemplate.type";

export function useLibraryPlaybookSelection(): {
  readonly libraryPlaybook: LibraryPlaybookTemplate | null;
  readonly selectedLibraryCapabilityId: string;
  readonly setSelectedLibraryCapabilityId: (capabilityId: string) => void;
  readonly libraryCapabilities: readonly PublishedCapabilityRecord[];
  readonly removeLibraryCapability: (capabilityId: string) => void;
  readonly rerunPrompt: string;
  readonly isLoading: boolean;
} {
  const searchParams = useSearchParams();
  const urlCapabilityId = searchParams.get("libraryCapabilityId") ?? "";
  const rerunPrompt = searchParams.get("prompt") ?? "";
  const { capabilities, isLoading, removeCapability } =
    useLibraryCapabilities();
  const [manualId, setManualId] = useState<string | null>(null);
  const selectedId = manualId ?? urlCapabilityId;

  const libraryCapabilities = useMemo(
    () =>
      capabilities.filter(
        (capability) => capability.status !== CapabilityStatus.ARCHIVED,
      ),
    [capabilities],
  );

  const libraryPlaybook = useMemo(() => {
    if (selectedId.length === 0) {
      return null;
    }

    const match = libraryCapabilities.find(
      (capability) => capability.id === selectedId,
    );

    return match ? mapPublishedCapabilityToPlaybookTemplate(match) : null;
  }, [libraryCapabilities, selectedId]);

  return {
    libraryPlaybook,
    selectedLibraryCapabilityId: selectedId,
    setSelectedLibraryCapabilityId: setManualId,
    libraryCapabilities,
    removeLibraryCapability: removeCapability,
    rerunPrompt,
    isLoading,
  };
}
