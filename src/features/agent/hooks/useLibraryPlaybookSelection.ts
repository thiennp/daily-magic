"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

import {
  SEND_TASK_WORKFLOW_DRAFT_QUERY_PARAM,
  SEND_TASK_WORKFLOW_DRAFT_QUERY_VALUE,
} from "@/features/agent/constants/sendTaskModalQuery.constant";
import { useLibraryCapabilities } from "@/features/library/hooks/useLibraryCapabilities";
import { readWorkflowCreateDraftPlaybook } from "@/features/workflows/readWorkflowCreateDraftPlaybook";
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
  readonly isWorkflowCreateDraft: boolean;
} {
  const searchParams = useSearchParams();
  const urlCapabilityId = searchParams.get("libraryCapabilityId") ?? "";
  const rerunPrompt = searchParams.get("prompt") ?? "";
  const isWorkflowCreateDraft =
    searchParams.get(SEND_TASK_WORKFLOW_DRAFT_QUERY_PARAM) ===
    SEND_TASK_WORKFLOW_DRAFT_QUERY_VALUE;
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

  const draftPlaybook = useMemo(
    () => (isWorkflowCreateDraft ? readWorkflowCreateDraftPlaybook() : null),
    [isWorkflowCreateDraft],
  );

  const libraryPlaybook = useMemo(() => {
    if (draftPlaybook !== null) {
      return draftPlaybook;
    }

    if (selectedId.length === 0) {
      return null;
    }

    const match = libraryCapabilities.find(
      (capability) => capability.id === selectedId,
    );

    return match ? mapPublishedCapabilityToPlaybookTemplate(match) : null;
  }, [draftPlaybook, libraryCapabilities, selectedId]);

  return {
    libraryPlaybook,
    selectedLibraryCapabilityId: selectedId,
    setSelectedLibraryCapabilityId: setManualId,
    libraryCapabilities,
    removeLibraryCapability: removeCapability,
    rerunPrompt,
    isLoading,
    isWorkflowCreateDraft: isWorkflowCreateDraft && draftPlaybook !== null,
  };
}
