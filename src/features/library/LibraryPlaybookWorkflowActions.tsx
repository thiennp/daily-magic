"use client";

import { useState } from "react";

import Button from "@/components/ui/button/Button";
import { CapabilityType } from "@/lib/capabilities/CapabilityType.constant";
import type PublishedCapabilityRecord from "@/lib/capabilities/types/PublishedCapabilityRecord.type";
import { submitArchiveWorkflow } from "@/features/workflows/submitArchiveWorkflow";

interface LibraryPlaybookWorkflowActionsProps {
  readonly capability: PublishedCapabilityRecord;
  readonly canManage: boolean;
  readonly isEditing: boolean;
  readonly onToggleEdit: () => void;
  readonly onDeleted: () => void;
}

export default function LibraryPlaybookWorkflowActions({
  capability,
  canManage,
  isEditing,
  onToggleEdit,
  onDeleted,
}: LibraryPlaybookWorkflowActionsProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!canManage || capability.type !== CapabilityType.WORKFLOW) {
    return null;
  }

  const handleDelete = async (): Promise<void> => {
    const confirmed = window.confirm(
      `Delete "${capability.name}" from your library?`,
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
      <Button variant="outline" onClick={onToggleEdit}>
        {isEditing ? "Close edit" : "Edit"}
      </Button>
      <Button
        variant="outline"
        disabled={isDeleting}
        onClick={() => {
          void handleDelete();
        }}
      >
        {isDeleting ? "Deleting…" : "Delete"}
      </Button>
      {error ? (
        <p className="w-full text-sm text-error-600 dark:text-error-400">
          {error}
        </p>
      ) : null}
    </>
  );
}
