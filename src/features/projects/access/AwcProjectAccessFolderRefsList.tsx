"use client";

import { PROJECT_PAGE_RESOURCES_COPY as C } from "@/features/projects/resources/projectPageResourcesCopy.constant";
import { AWC_PROJECT_ACCESS_COPY } from "@/features/projects/access/awcProjectAccessCopy.constant";
import {
  type FolderRefComputerOption,
  formatFolderRefRow,
} from "@/features/projects/access/utils/folderRefComputerOptions";

export interface FolderRefRow {
  readonly id: string;
  readonly machineOrDeviceRef: string;
  readonly folderPath: string;
  readonly shared?: boolean;
  /** False for another member's shared folder (read-only). */
  readonly isMine?: boolean;
  readonly deviceName?: string | null;
}

interface AwcProjectAccessFolderRefsListProps {
  readonly folderRefs: readonly FolderRefRow[];
  readonly computers: readonly FolderRefComputerOption[];
  readonly onRemove: (refId: string) => void;
  readonly onToggleShared?: (refId: string, shared: boolean) => void;
}

/** Folder-ref rows as `"{deviceName} · {path}"` (legacy raw label fallback). */
export default function AwcProjectAccessFolderRefsList({
  folderRefs,
  computers,
  onRemove,
  onToggleShared,
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
      {folderRefs.map((ref) => {
        const mine = ref.isMine !== false;
        const shared = ref.shared !== false;
        return (
          <li
            key={ref.id}
            className="flex flex-wrap items-center justify-between gap-2 text-sm"
          >
            <span className="font-mono text-xs text-awc-fg dark:text-white/90">
              {formatFolderRefRow(ref, computers)}
            </span>
            {mine ? (
              <span className="flex items-center gap-3">
                {onToggleShared ? (
                  <label className="flex items-center gap-1.5 text-xs text-awc-fg-muted dark:text-gray-400">
                    <input
                      type="checkbox"
                      checked={shared}
                      aria-label={C.foldersShareToggle}
                      onChange={(event) =>
                        onToggleShared(ref.id, event.target.checked)
                      }
                    />
                    {shared ? C.foldersShared : C.foldersPrivate}
                  </label>
                ) : null}
                <button
                  type="button"
                  className="rounded-md border px-2 py-1 text-xs"
                  onClick={() => onRemove(ref.id)}
                >
                  {copy.remove}
                </button>
              </span>
            ) : (
              <span className="text-xs text-awc-fg-muted dark:text-gray-400">
                {C.foldersShared}
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
