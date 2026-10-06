"use client";

import {
  addProjectFolderRef,
  removeProjectFolderRef,
} from "@/features/projects/access/utils/mutateProjectFolderRefs";
import { mapProjectAccessError } from "@/lib/projects/acl/mapProjectAccessError";

/** Single owner for folder-ref add/remove mutations (Access + Resources). */
export const useAwcProjectFolderRefActions = (input: {
  readonly projectId: string;
  readonly onMessage: (message: string) => void;
  readonly onReload: () => Promise<void>;
}) => {
  const { projectId, onMessage, onReload } = input;

  const onAdd = async (
    machineOrDeviceRef: string,
    folderPath: string,
  ): Promise<boolean> => {
    const result = await addProjectFolderRef({
      projectId,
      machineOrDeviceRef,
      folderPath,
    });
    onMessage(
      result.ok
        ? "Folder ref added."
        : mapProjectAccessError(result.errorMessage, "Failed."),
    );
    if (result.ok) await onReload();
    return result.ok;
  };

  const onRemove = (refId: string): void => {
    void removeProjectFolderRef({ projectId, refId }).then(async (result) => {
      onMessage(
        result.ok
          ? "Folder ref removed."
          : mapProjectAccessError(result.errorMessage, "Failed."),
      );
      await onReload();
    });
  };

  return { onAdd, onRemove };
};
