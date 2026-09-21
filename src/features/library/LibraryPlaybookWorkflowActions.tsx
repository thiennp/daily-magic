"use client";

import { useState } from "react";

import Button from "@/components/ui/button/Button";
import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import type PublishedCapabilityRecord from "@/lib/capabilities/types/PublishedCapabilityRecord.type";
import { buildLibraryPlaybookRemoveConfirmMessage } from "@/features/library/libraryPlaybookRemoveConfirmMessage";
import { submitArchiveWorkflow } from "@/features/workflows/submitArchiveWorkflow";

interface LibraryPlaybookWorkflowActionsProps {
  readonly capability: PublishedCapabilityRecord;
  readonly isEditing: boolean;
  readonly onToggleEdit: () => void;
  readonly onDeleted: () => void;
}

export default function LibraryPlaybookWorkflowActions({
  capability,
  isEditing,
  onToggleEdit,
  onDeleted,
}: LibraryPlaybookWorkflowActionsProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isWorkflow = capability.type === CapabilityType.WORKFLOW;

  const handleRemove = async (): Promise<void> => {
    const confirmed = window.confirm(
      buildLibraryPlaybookRemoveConfirmMessage(capability.name),
    );

    if (!confirmed) {
      return;
    }

    setError(null);
    setIsDeleting(true);
    const result = await submitArchiveWorkflow(capability.id);
    setIsDeleting(false);

    if (!result.ok) {
      setError(result.errorMessage);
      return;
    }

    onDeleted();
  };

  return (
    <>
      {isWorkflow ? (
        <Button variant="outline" onClick={onToggleEdit}>
          {isEditing ? "Close edit" : "Edit"}
        </Button>
      ) : null}
      <Button
        variant="outline"
        disabled={isDeleting}
        onClick={() => {
          void handleRemove();
        }}
      >
        {isDeleting ? "Removing…" : "Remove"}
      </Button>
      {error ? (
        <p className="w-full text-sm text-error-600 dark:text-error-400">
          {error}
        </p>
      ) : null}
    </>
  );
}
