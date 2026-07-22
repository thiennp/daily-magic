"use client";

import { FolderIcon } from "@/icons";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";

interface SendTaskComposerActiveProjectBadgeProps {
  readonly project: UserProjectRecord | null;
  readonly isLoading: boolean;
}

export default function SendTaskComposerActiveProjectBadge({
  project,
  isLoading,
}: SendTaskComposerActiveProjectBadgeProps) {
  if (isLoading) {
    return (
      <p className="text-xs text-gray-500 dark:text-gray-400">
        Loading project…
      </p>
    );
  }

  if (project === null) {
    return (
      <p className="text-xs text-gray-500 dark:text-gray-400">
        No project selected.
      </p>
    );
  }

  return (
    <div className="flex items-start gap-2 rounded-xl border border-brand-100 bg-brand-50/50 px-3 py-2 dark:border-brand-900/40 dark:bg-brand-950/20">
      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-brand-200 bg-white dark:border-brand-900/50 dark:bg-gray-900">
        <FolderIcon className="h-4 w-4 text-brand-700 dark:text-brand-300" />
      </span>
      <span className="min-w-0">
        <span className="block text-[11px] font-medium uppercase tracking-wide text-brand-700 dark:text-brand-300">
          Current project
        </span>
        <span className="mt-0.5 block truncate text-sm font-medium text-gray-800 dark:text-white/90">
          {project.name}
        </span>
        <span className="mt-0.5 block truncate text-xs text-gray-500 dark:text-gray-400">
          {project.folderPath}
        </span>
      </span>
    </div>
  );
}
