"use client";

import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";
import isDefaultUserProject from "@/lib/projects/isDefaultUserProject";
import { FolderIcon, TrashBinIcon } from "@/icons";

interface SendTaskComposerProjectRowProps {
  readonly project: UserProjectRecord;
  readonly onSelect: (project: UserProjectRecord) => void;
  readonly onDelete: (projectId: string) => void | Promise<void>;
}

export default function SendTaskComposerProjectRow({
  project,
  onSelect,
  onDelete,
}: SendTaskComposerProjectRowProps) {
  const canDelete = !isDefaultUserProject(project);

  return (
    <div className="flex items-stretch gap-2">
      <button
        type="button"
        onClick={() => {
          onSelect(project);
        }}
        className="flex min-w-0 flex-1 items-center gap-3 rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-left transition hover:border-brand-200 hover:bg-brand-50/40 dark:border-gray-800 dark:bg-white/[0.02] dark:hover:border-brand-900/40 dark:hover:bg-brand-950/20"
      >
        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white shadow-theme-xs dark:border-gray-700 dark:bg-gray-800">
          <FolderIcon className="h-4 w-4 text-gray-900 dark:text-white" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-medium text-gray-800 dark:text-white/90">
            {project.name}
          </span>
          <span className="mt-0.5 block truncate text-xs text-gray-500 dark:text-gray-400">
            {project.folderPath}
            <span className="ml-1 text-[10px] uppercase tracking-wide text-gray-400 dark:text-gray-500">
              · locked
            </span>
          </span>
        </span>
      </button>
      {canDelete ? (
        <button
          type="button"
          aria-label={`Delete ${project.name}`}
          onClick={() => {
            void onDelete(project.id);
          }}
          className="inline-flex shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white px-3 text-gray-500 transition hover:border-error-200 hover:bg-error-50 hover:text-error-600 dark:border-gray-800 dark:bg-white/[0.02] dark:hover:border-error-900/40 dark:hover:bg-error-950/20 dark:hover:text-error-400"
        >
          <TrashBinIcon className="h-4 w-4" />
        </button>
      ) : null}
    </div>
  );
}
