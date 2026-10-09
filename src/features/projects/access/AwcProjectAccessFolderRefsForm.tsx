"use client";

import { useId } from "react";

import AwcProjectAccessFolderPathField from "@/features/projects/access/AwcProjectAccessFolderPathField";
import { AWC_PROJECT_ACCESS_COPY } from "@/features/projects/access/awcProjectAccessCopy.constant";
import type { ThisComputerFolderTarget } from "@/features/projects/access/hooks/useThisComputerFolderTarget";
import { PROJECT_PAGE_RESOURCES_COPY as C } from "@/features/projects/resources/projectPageResourcesCopy.constant";

const FIELD =
  "mt-1 w-full rounded-md border border-awc-border-strong bg-white px-2 py-1.5 text-sm dark:border-gray-700 dark:bg-gray-950";

interface AwcProjectAccessFolderRefsFormProps {
  /** The open computer; the form adds folders only on it. */
  readonly target: Extract<ThisComputerFolderTarget, { kind: "ready" }>;
  readonly error: string | null;
  readonly folderPath: string;
  readonly onFolderPath: (value: string) => void;
  readonly onAdd: () => void;
  readonly shared?: boolean;
  readonly onShared?: (value: boolean) => void;
}

export default function AwcProjectAccessFolderRefsForm({
  target,
  error,
  folderPath,
  onFolderPath,
  onAdd,
  shared = true,
  onShared,
}: AwcProjectAccessFolderRefsFormProps) {
  const copy = AWC_PROJECT_ACCESS_COPY;
  const idBase = useId();

  return (
    <div className="space-y-2 rounded-lg border border-awc-border/80 p-3 dark:border-gray-800/80">
      <p className="text-[11px] text-awc-fg-muted dark:text-gray-400">
        {copy.folderRefsFormHint}
      </p>
      <p className="text-xs font-medium text-awc-fg dark:text-white/90">
        {C.foldersAddingTo(target.deviceName || "this computer")}
      </p>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start">
        <AwcProjectAccessFolderPathField
          id={`${idBase}-path`}
          helpId={`${idBase}-path-help`}
          className={FIELD}
          folderPath={folderPath}
          wakePort={target.wakePort}
          onFolderPath={onFolderPath}
        />
        <div className="flex shrink-0 flex-col justify-end sm:pt-5">
          <button
            type="button"
            className="rounded-md bg-gray-900 px-3 py-1.5 text-xs text-white disabled:opacity-50 dark:bg-white dark:text-gray-900"
            onClick={onAdd}
          >
            {copy.addFolderRef}
          </button>
        </div>
      </div>
      {onShared ? (
        <label className="flex items-center gap-1.5 text-xs text-awc-fg-muted dark:text-gray-400">
          <input
            type="checkbox"
            checked={shared}
            onChange={(event) => onShared(event.target.checked)}
          />
          {C.foldersShareOnAdd}
        </label>
      ) : null}
      {error ? (
        <p className="text-xs text-error-600 dark:text-error-400" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
