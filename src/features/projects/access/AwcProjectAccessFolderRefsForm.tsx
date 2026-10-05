"use client";

import { useId } from "react";

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
  const idBase = useId();
  const machineId = `${idBase}-machine`;
  const pathId = `${idBase}-path`;
  const machineHelpId = `${idBase}-machine-help`;
  const pathHelpId = `${idBase}-path-help`;

  return (
    <div className="space-y-2 rounded-lg border border-gray-200/80 p-3 dark:border-gray-800/80">
      <p className="text-[11px] text-gray-500 dark:text-gray-400">
        {copy.folderRefsFormHint}
      </p>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start">
        <div className="min-w-0 flex-1">
          <label
            className="block text-xs text-gray-600 dark:text-gray-400"
            htmlFor={machineId}
          >
            {copy.machineRefLabel}
            <input
              id={machineId}
              className={FIELD}
              placeholder={copy.machineRefPlaceholder}
              value={machineRef}
              aria-describedby={machineHelpId}
              onChange={(event) => onMachineRef(event.target.value)}
            />
          </label>
          <span
            id={machineHelpId}
            className="mt-0.5 block text-[11px] text-gray-500 dark:text-gray-400"
          >
            {copy.machineRefHelp}
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <label
            className="block text-xs text-gray-600 dark:text-gray-400"
            htmlFor={pathId}
          >
            {copy.folderPathLabel}
            <input
              id={pathId}
              className={FIELD}
              placeholder={copy.folderPathPlaceholder}
              value={folderPath}
              aria-describedby={pathHelpId}
              onChange={(event) => onFolderPath(event.target.value)}
            />
          </label>
          <span
            id={pathHelpId}
            className="mt-0.5 block text-[11px] text-gray-500 dark:text-gray-400"
          >
            {copy.folderPathHelp}
          </span>
        </div>
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
