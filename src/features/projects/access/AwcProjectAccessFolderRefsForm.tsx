"use client";

import { AWC_PROJECT_ACCESS_COPY } from "@/features/projects/access/awcProjectAccessCopy.constant";

const FIELD =
  "mt-1 w-full rounded-md border border-gray-300 bg-white px-2 py-1.5 text-sm dark:border-gray-700 dark:bg-gray-950";

interface AwcProjectAccessFolderRefsFormProps {
  readonly machineRef: string;
  readonly folderPath: string;
  readonly onMachineRef: (value: string) => void;
  readonly onFolderPath: (value: string) => void;
  readonly onAdd: () => void;
}

export default function AwcProjectAccessFolderRefsForm({
  machineRef,
  folderPath,
  onMachineRef,
  onFolderPath,
  onAdd,
}: AwcProjectAccessFolderRefsFormProps) {
  const copy = AWC_PROJECT_ACCESS_COPY;
  return (
    <div className="space-y-2 rounded-lg border border-gray-200/80 p-3 dark:border-gray-800/80">
      <p className="text-[11px] text-gray-500 dark:text-gray-400">
        {copy.folderRefsFormHint}
      </p>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start">
        <label className="block min-w-0 flex-1 text-xs text-gray-600 dark:text-gray-400">
          {copy.machineRefLabel}
          <input
            className={FIELD}
            placeholder={copy.machineRefPlaceholder}
            value={machineRef}
            aria-describedby="folder-ref-machine-help"
            onChange={(event) => onMachineRef(event.target.value)}
          />
          <span
            id="folder-ref-machine-help"
            className="mt-0.5 block text-[11px] text-gray-500 dark:text-gray-400"
          >
            {copy.machineRefHelp}
          </span>
        </label>
        <label className="block min-w-0 flex-1 text-xs text-gray-600 dark:text-gray-400">
          {copy.folderPathLabel}
          <input
            className={FIELD}
            placeholder={copy.folderPathPlaceholder}
            value={folderPath}
            aria-describedby="folder-ref-path-help"
            onChange={(event) => onFolderPath(event.target.value)}
          />
          <span
            id="folder-ref-path-help"
            className="mt-0.5 block text-[11px] text-gray-500 dark:text-gray-400"
          >
            {copy.folderPathHelp}
          </span>
        </label>
        <div className="flex shrink-0 flex-col justify-end sm:pt-5">
          <button
            type="button"
            className="rounded-md bg-gray-900 px-3 py-1.5 text-xs text-white dark:bg-white dark:text-gray-900"
            onClick={onAdd}
          >
            {copy.addFolderRef}
          </button>
        </div>
      </div>
    </div>
  );
}
