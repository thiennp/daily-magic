"use client";

import { useState } from "react";

import { AWC_PROJECT_ACCESS_COPY } from "@/features/projects/access/awcProjectAccessCopy.constant";

interface FolderRefRow {
  readonly id: string;
  readonly machineOrDeviceRef: string;
  readonly folderPath: string;
}

interface AwcProjectAccessFolderRefsProps {
  readonly folderRefs: readonly FolderRefRow[];
  readonly onAdd: (machineOrDeviceRef: string, folderPath: string) => void;
  readonly onRemove: (refId: string) => void;
}

export default function AwcProjectAccessFolderRefs({
  folderRefs,
  onAdd,
  onRemove,
}: AwcProjectAccessFolderRefsProps) {
  const copy = AWC_PROJECT_ACCESS_COPY;
  const [machineRef, setMachineRef] = useState("");
  const [folderPath, setFolderPath] = useState("");

  return (
    <div>
      <h3 className="text-sm font-medium text-gray-800 dark:text-white/90">
        {copy.folderRefsHeading}
      </h3>
      <p className="mt-1 text-xs text-gray-500">{copy.folderRefsHint}</p>
      {folderRefs.length === 0 ? (
        <p className="mt-1 text-sm text-gray-500">{copy.folderRefsEmpty}</p>
      ) : (
        <ul className="mt-2 space-y-2">
          {folderRefs.map((ref) => (
            <li
              key={ref.id}
              className="flex flex-wrap items-center justify-between gap-2 text-sm"
            >
              <span className="font-mono text-xs text-gray-800 dark:text-white/90">
                {ref.machineOrDeviceRef} → {ref.folderPath}
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
      )}
      <div className="mt-3 flex flex-col gap-2 sm:flex-row">
        <input
          className="flex-1 rounded-md border px-2 py-1 text-sm"
          placeholder={copy.machineRefPlaceholder}
          value={machineRef}
          onChange={(event) => setMachineRef(event.target.value)}
        />
        <input
          className="flex-1 rounded-md border px-2 py-1 text-sm"
          placeholder={copy.folderPathPlaceholder}
          value={folderPath}
          onChange={(event) => setFolderPath(event.target.value)}
        />
        <button
          type="button"
          className="rounded-md bg-gray-900 px-3 py-1 text-xs text-white dark:bg-white dark:text-gray-900"
          onClick={() => {
            onAdd(machineRef, folderPath);
            setMachineRef("");
            setFolderPath("");
          }}
        >
          {copy.addFolderRef}
        </button>
      </div>
    </div>
  );
}
