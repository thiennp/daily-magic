"use client";

import { useState } from "react";

import AwcProjectAccessFolderRefsForm from "@/features/projects/access/AwcProjectAccessFolderRefsForm";
import { AWC_PROJECT_ACCESS_COPY } from "@/features/projects/access/awcProjectAccessCopy.constant";

interface FolderRefRow {
  readonly id: string;
  readonly machineOrDeviceRef: string;
  readonly folderPath: string;
}

interface AwcProjectAccessFolderRefsProps {
  readonly folderRefs: readonly FolderRefRow[];
  readonly onAdd: (
    machineOrDeviceRef: string,
    folderPath: string,
  ) => Promise<boolean> | boolean;
  readonly onRemove: (refId: string) => void;
  readonly hideChrome?: boolean;
}

export default function AwcProjectAccessFolderRefs({
  folderRefs,
  onAdd,
  onRemove,
  hideChrome = false,
}: AwcProjectAccessFolderRefsProps) {
  const copy = AWC_PROJECT_ACCESS_COPY;
  const [machineRef, setMachineRef] = useState("");
  const [folderPath, setFolderPath] = useState("");

  return (
    <div className="space-y-3">
      {hideChrome ? null : (
        <>
          <h3 className="text-sm font-medium text-gray-800 dark:text-white/90">
            {copy.folderRefsHeading}
          </h3>
          <p className="mt-1 text-xs text-gray-500">{copy.folderRefsHint}</p>
        </>
      )}
      {folderRefs.length === 0 ? (
        <p className="rounded-lg border border-dashed border-gray-200 bg-gray-50/60 px-3 py-2.5 text-sm text-gray-600 dark:border-gray-800 dark:bg-white/[0.02] dark:text-gray-400">
          {copy.folderRefsEmpty}
        </p>
      ) : (
        <ul className="space-y-2">
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
      <AwcProjectAccessFolderRefsForm
        machineRef={machineRef}
        folderPath={folderPath}
        onMachineRef={setMachineRef}
        onFolderPath={setFolderPath}
        onAdd={() => {
          void (async () => {
            const added = await onAdd(machineRef, folderPath);
            if (added) {
              setMachineRef("");
              setFolderPath("");
            }
          })();
        }}
      />
    </div>
  );
}
