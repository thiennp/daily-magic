"use client";

import { useMemo, useState } from "react";

import AwcProjectAccessFolderRefsForm from "@/features/projects/access/AwcProjectAccessFolderRefsForm";
import AwcProjectAccessFolderRefsList, {
  type FolderRefRow,
} from "@/features/projects/access/AwcProjectAccessFolderRefsList";
import { AWC_PROJECT_ACCESS_COPY } from "@/features/projects/access/awcProjectAccessCopy.constant";
import { useThisComputerFolderTarget } from "@/features/projects/access/hooks/useThisComputerFolderTarget";
import {
  buildFolderRefComputerOptions,
  type FolderRefComputerMember,
  type FolderRefProjectDevice,
} from "@/features/projects/access/utils/folderRefComputerOptions";
import { PROJECT_PAGE_RESOURCES_COPY as C } from "@/features/projects/resources/projectPageResourcesCopy.constant";

interface AwcProjectAccessFolderRefsProps {
  readonly folderRefs: readonly FolderRefRow[];
  /** Access roster computer seats (filtered again by memberKind). */
  readonly computerMembers: readonly FolderRefComputerMember[];
  /** Project-bound device when no computer seat exists (pre-068 owners). */
  readonly projectDevice?: FolderRefProjectDevice | null;
  /** Owner's own connected computers; the server seats one on first folder add. */
  readonly ownerDevices?: readonly FolderRefProjectDevice[];
  /** Receives the selected computer's deviceId (POSTed as `deviceId`). */
  readonly onAdd: (
    deviceId: string,
    folderPath: string,
    shared: boolean,
  ) => Promise<boolean> | boolean;
  readonly onRemove: (refId: string) => void;
  readonly onToggleShared?: (refId: string, shared: boolean) => void;
  readonly hideChrome?: boolean;
  /** Viewer: list shared folders only, no add form. */
  readonly readOnly?: boolean;
}

export default function AwcProjectAccessFolderRefs({
  folderRefs,
  computerMembers,
  projectDevice = null,
  ownerDevices,
  onAdd,
  onRemove,
  onToggleShared,
  hideChrome = false,
  readOnly = false,
}: AwcProjectAccessFolderRefsProps) {
  const copy = AWC_PROJECT_ACCESS_COPY;
  const computers = useMemo(
    () =>
      buildFolderRefComputerOptions(
        computerMembers,
        projectDevice,
        ownerDevices,
      ),
    [computerMembers, projectDevice, ownerDevices],
  );
  const target = useThisComputerFolderTarget();
  const [folderPath, setFolderPath] = useState("");
  const [shared, setShared] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleAdd = async (): Promise<void> => {
    if (target.kind !== "ready") return;
    if (folderPath.trim() === "") {
      setError("Enter a folder path.");
      return;
    }
    setError(null);
    if (await onAdd(target.deviceId, folderPath, shared)) {
      setFolderPath("");
    }
  };

  return (
    <div className="space-y-3">
      {hideChrome ? null : (
        <>
          <h3 className="text-sm font-medium text-awc-fg dark:text-white/90">
            {copy.folderRefsHeading}
          </h3>
          <p className="mt-1 text-xs text-awc-fg-muted">
            {copy.folderRefsHint}
          </p>
        </>
      )}
      <AwcProjectAccessFolderRefsList
        folderRefs={folderRefs}
        computers={computers}
        onRemove={onRemove}
        onToggleShared={onToggleShared}
      />
      {readOnly ? null : target.kind === "ready" ? (
        <AwcProjectAccessFolderRefsForm
          target={target}
          error={error}
          folderPath={folderPath}
          onFolderPath={setFolderPath}
          onAdd={() => void handleAdd()}
          shared={shared}
          onShared={onToggleShared ? setShared : undefined}
        />
      ) : target.kind === "mobile" && folderRefs.length > 0 ? null : (
        <p className="rounded-lg border border-dashed border-awc-border p-3 text-xs text-awc-fg-muted dark:border-gray-800 dark:text-gray-400">
          {target.kind === "mobile"
            ? C.foldersAddFromComputer
            : C.foldersAddFromComputerOffline}
        </p>
      )}
    </div>
  );
}
