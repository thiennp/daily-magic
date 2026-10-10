"use client";

import { useState } from "react";

import { AwcProjectDeleteConfirmForm } from "@/features/projects/public-api/presentation";
import useDeleteUserProject from "@/features/projects/hooks/useDeleteUserProject";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";
import isDefaultUserProject from "@/lib/projects/isDefaultUserProject";
import { FolderIcon, TrashBinIcon } from "@/icons";

interface SendTaskComposerProjectRowProps {
  readonly project: UserProjectRecord;
  readonly onSelect: (project: UserProjectRecord) => void;
  readonly onDeleted: (projectId: string) => void;
}

export default function SendTaskComposerProjectRow({
  project,
  onSelect,
  onDeleted,
}: SendTaskComposerProjectRowProps) {
  const canDelete = !isDefaultUserProject(project);
  const { deleteProject, errorMessage, isDeleting } = useDeleteUserProject();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const runDelete = async (): Promise<void> => {
    const ok = await deleteProject(project.id);
    if (!ok) {
      return;
    }
    setConfirmOpen(false);
    onDeleted(project.id);
  };

  return (
    <div>
      <div className="flex flex-col items-stretch gap-2 sm:flex-row">
        <button
          type="button"
          onClick={() => {
            onSelect(project);
          }}
          className="flex min-w-0 flex-1 items-center gap-3 rounded-xl border border-awc-border bg-white px-3 py-2.5 text-left transition hover:border-brand-200 hover:bg-brand-50/40 dark:border-gray-800 dark:bg-white/[0.02] dark:hover:border-brand-900/40 dark:hover:bg-brand-950/20"
        >
          <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-awc-border bg-white shadow-theme-xs dark:border-gray-700 dark:bg-gray-800">
            <FolderIcon className="h-4 w-4 text-awc-fg dark:text-white" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-medium text-awc-fg dark:text-white/90">
              {project.name}
            </span>
            <span className="mt-0.5 block truncate text-xs text-awc-fg-muted dark:text-gray-400">
              {project.folderPath}
            </span>
          </span>
        </button>
        {canDelete ? (
          <button
            type="button"
            aria-label={`Delete ${project.name}`}
            aria-expanded={confirmOpen}
            onClick={() => {
              setConfirmOpen((current) => !current);
            }}
            className="inline-flex shrink-0 items-center justify-center rounded-xl border border-awc-border bg-white px-3 py-2 text-awc-fg-muted transition hover:border-error-200 hover:bg-error-50 hover:text-error-600 dark:border-gray-800 dark:bg-white/[0.02] dark:hover:border-error-900/40 dark:hover:bg-error-950/20 dark:hover:text-error-400"
          >
            <TrashBinIcon className="h-4 w-4" />
          </button>
        ) : null}
      </div>
      {canDelete && confirmOpen ? (
        <div className="mt-2 rounded-xl border border-error-200/80 bg-error-50/50 p-3 dark:border-error-900/40 dark:bg-error-950/20">
          <AwcProjectDeleteConfirmForm
            projectName={project.name}
            isDeleting={isDeleting}
            errorMessage={errorMessage}
            onConfirm={() => {
              void runDelete();
            }}
            onCancel={() => {
              setConfirmOpen(false);
            }}
          />
        </div>
      ) : null}
    </div>
  );
}
