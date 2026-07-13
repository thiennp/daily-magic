"use client";

import Link from "next/link";
import { useState } from "react";

import AppPanel from "@/components/surfaces/AppPanel";
import Button from "@/components/ui/button/Button";
import { useAppPath, useDemoPreview } from "@/features/demo/DemoPreviewContext";
import LibraryPlaybookTypeBadge from "@/features/library/LibraryPlaybookTypeBadge";
import LibraryPlaybookWorkflowActions from "@/features/library/LibraryPlaybookWorkflowActions";
import LibrarySampleWorkflowBadge from "@/features/library/LibrarySampleWorkflowBadge";
import LibrarySampleWorkflowPromptPreview from "@/features/library/LibrarySampleWorkflowPromptPreview";
import EditWorkflowForm from "@/features/workflows/EditWorkflowForm";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import isSampleWorkflowCapability from "@/lib/capabilities/isSampleWorkflowCapability";
import type PublishedCapabilityRecord from "@/lib/capabilities/types/PublishedCapabilityRecord.type";
import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import buildAgentComposerHref from "@/lib/library/buildAgentComposerHref";
import { resolveLibraryCopyPrompt } from "@/lib/library/resolveLibraryCopyPrompt";

interface LibraryPlaybookCardProps {
  readonly capability: PublishedCapabilityRecord;
  readonly onUpdated?: () => void;
}

export default function LibraryPlaybookCard({
  capability,
  onUpdated,
}: LibraryPlaybookCardProps) {
  const appPath = useAppPath();
  const demoPreview = useDemoPreview();
  const isSample = isSampleWorkflowCapability(capability);
  const [isEditing, setIsEditing] = useState(isSample);
  const { copied, copy } = useCopyToClipboard();
  const useHref = buildAgentComposerHref({
    libraryCapabilityId: capability.id,
  });
  const copyPrompt = resolveLibraryCopyPrompt(capability);
  const canManage = !demoPreview && capability.type === CapabilityType.WORKFLOW;

  return (
    <AppPanel as="article" padding="compact">
      <div className="flex flex-wrap items-center gap-2">
        <LibraryPlaybookTypeBadge type={capability.type} />
        <LibrarySampleWorkflowBadge capability={capability} />
        <p className="text-sm font-medium text-gray-800 dark:text-white/90">
          {capability.name}
        </p>
      </div>
      {capability.description.length > 0 ? (
        <p className="mt-2 line-clamp-3 text-sm text-gray-600 dark:text-gray-400">
          {capability.description}
        </p>
      ) : null}
      <p className="mt-2 text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
        {capability.status}
        {capability.forkedFromCapabilityId !== null
          ? " · saved from teammate"
          : ""}
        {capability.type === CapabilityType.WORKFLOW
          ? ` · ${capability.workflowFields.length} inputs`
          : ""}
      </p>
      {isSample ? (
        <LibrarySampleWorkflowPromptPreview capability={capability} />
      ) : null}
      <div className="mt-4 flex flex-wrap gap-2">
        <Link href={appPath(useHref)}>
          <Button>Use playbook</Button>
        </Link>
        {copyPrompt.length > 0 ? (
          <Button
            variant="outline"
            onClick={() => {
              void copy(copyPrompt);
            }}
          >
            {copied ? "Copied" : "Copy prompt"}
          </Button>
        ) : null}
        <LibraryPlaybookWorkflowActions
          capability={capability}
          canManage={canManage}
          isEditing={isEditing}
          onToggleEdit={() => {
            setIsEditing((editing) => !editing);
          }}
          onDeleted={() => {
            onUpdated?.();
          }}
        />
      </div>
      {isEditing ? (
        <EditWorkflowForm
          capability={capability}
          onSaved={() => {
            onUpdated?.();
          }}
          onCancel={() => {
            setIsEditing(false);
          }}
        />
      ) : null}
    </AppPanel>
  );
}
