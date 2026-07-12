"use client";

import Link from "next/link";
import { useState } from "react";

import { useAppPath, useDemoPreview } from "@/features/demo/DemoPreviewContext";
import LibraryPlaybookTypeBadge from "@/features/library/LibraryPlaybookTypeBadge";
import EditWorkflowForm from "@/features/workflows/EditWorkflowForm";
import Button from "@/components/ui/button/Button";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { resolveLibraryCopyPrompt } from "@/lib/library/resolveLibraryCopyPrompt";
import type PublishedCapabilityRecord from "@/lib/capabilities/types/PublishedCapabilityRecord.type";
import buildAgentComposerHref from "@/lib/library/buildAgentComposerHref";
import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";

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
  const [isEditing, setIsEditing] = useState(false);
  const { copied, copy } = useCopyToClipboard();
  const useHref = buildAgentComposerHref({
    libraryCapabilityId: capability.id,
  });
  const copyPrompt = resolveLibraryCopyPrompt(capability);
  const canEdit = !demoPreview && capability.type === CapabilityType.WORKFLOW;

  return (
    <article className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="flex flex-wrap items-center gap-2">
        <LibraryPlaybookTypeBadge type={capability.type} />
        <p className="text-sm font-medium text-gray-800 dark:text-white/90">
          {capability.name}
        </p>
      </div>
      {capability.description.length > 0 ? (
        <p className="mt-2 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
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
        {canEdit ? (
          <Button
            variant="outline"
            onClick={() => {
              setIsEditing((editing) => !editing);
            }}
          >
            {isEditing ? "Close edit" : "Edit"}
          </Button>
        ) : null}
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
    </article>
  );
}
