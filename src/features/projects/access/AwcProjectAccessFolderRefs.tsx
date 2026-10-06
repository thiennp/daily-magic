"use client";

import { useMemo, useState } from "react";

import AwcProjectAccessFolderRefsForm from "@/features/projects/access/AwcProjectAccessFolderRefsForm";
import AwcProjectAccessFolderRefsList, {
  type FolderRefRow,
} from "@/features/projects/access/AwcProjectAccessFolderRefsList";
import { AWC_PROJECT_ACCESS_COPY } from "@/features/projects/access/awcProjectAccessCopy.constant";
import {
  buildFolderRefComputerOptions,
  type FolderRefComputerMember,
  type FolderRefProjectDevice,
  resolveFolderRefAddError,
} from "@/features/projects/access/utils/folderRefComputerOptions";

interface AwcProjectAccessFolderRefsProps {
  readonly folderRefs: readonly FolderRefRow[];
  /** Access roster computer seats (filtered again by memberKind). */
  readonly computerMembers: readonly FolderRefComputerMember[];
  /** Project-bound device when no computer seat exists (pre-068 owners). */
  readonly projectDevice?: FolderRefProjectDevice | null;
  /** Receives the selected computer's deviceId (POSTed as `deviceId`). */
  readonly onAdd: (
    deviceId: string,
    folderPath: string,
  ) => Promise<boolean> | boolean;
  readonly onRemove: (refId: string) => void;
  readonly hideChrome?: boolean;
}

export default function AwcProjectAccessFolderRefs({
  folderRefs,
  computerMembers,
  projectDevice = null,
  onAdd,
  onRemove,
  hideChrome = false,
}: AwcProjectAccessFolderRefsProps) {
  const copy = AWC_PROJECT_ACCESS_COPY;
  const computers = useMemo(
    () => buildFolderRefComputerOptions(computerMembers, projectDevice),
    [computerMembers, projectDevice],
  );
  const [machineRef, setMachineRef] = useState("");
  const [folderPath, setFolderPath] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleAdd = async (): Promise<void> => {
    const blocked = resolveFolderRefAddError(machineRef, computers);
    setError(blocked);
    if (blocked) return;
    if (await onAdd(machineRef, folderPath)) {
      setMachineRef("");
      setFolderPath("");
    }
  };

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
      <AwcProjectAccessFolderRefsList
        folderRefs={folderRefs}
        computers={computers}
        onRemove={onRemove}
      />
      <AwcProjectAccessFolderRefsForm
        computers={computers}
        error={error}
        machineRef={machineRef}
        folderPath={folderPath}
        onMachineRef={(value) => {
          setMachineRef(value);
          if (value) setError(null);
        }}
        onFolderPath={setFolderPath}
        onAdd={() => void handleAdd()}
      />
    </div>
  );
}
