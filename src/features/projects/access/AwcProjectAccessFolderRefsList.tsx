"use client";

import { AWC_PROJECT_ACCESS_COPY } from "@/features/projects/access/awcProjectAccessCopy.constant";
import {
  type FolderRefComputerOption,
  formatFolderRefRow,
} from "@/features/projects/access/utils/folderRefComputerOptions";

export interface FolderRefRow {
  readonly id: string;
  readonly machineOrDeviceRef: string;
  readonly folderPath: string;
}

interface AwcProjectAccessFolderRefsListProps {
  readonly folderRefs: readonly FolderRefRow[];
  readonly computers: readonly FolderRefComputerOption[];
  readonly onRemove: (refId: string) => void;
}

/** Folder-ref rows as `"{deviceName} · {path}"` (legacy raw label fallback). */
export default function AwcProjectAccessFolderRefsList({
  folderRefs,
  computers,
  onRemove,
}: AwcProjectAccessFolderRefsListProps) {
  const copy = AWC_PROJECT_ACCESS_COPY;
  if (folderRefs.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-awc-border bg-awc-surface-2/60 px-3 py-2.5 text-sm text-awc-fg-muted dark:border-gray-800 dark:bg-white/[0.02] dark:text-gray-400">
        {copy.folderRefsEmpty}
      </p>
    );
  }
  return (
    <ul className="space-y-2">
      {folderRefs.map((ref) => (
        <li
          key={ref.id}
          className="flex flex-wrap items-center justify-between gap-2 text-sm"
        >
          <span className="font-mono text-xs text-awc-fg dark:text-white/90">
            {formatFolderRefRow(ref, computers)}
          </span>
          <button
            type="button"
            className="rounded-md border px-2 py-1 text-xs"
            onClick={() => onRemove(ref.id)}
          >
            {copy.remove}
          </button>
        </li>
      ))}
    </ul>
  );
}
