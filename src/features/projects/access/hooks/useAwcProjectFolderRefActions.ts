"use client";

import {
  addProjectFolderRef,
  removeProjectFolderRef,
} from "@/features/projects/access/utils/mutateProjectFolderRefs";
import { PROJECT_PAGE_RESOURCES_COPY as C } from "@/features/projects/resources/projectPageResourcesCopy.constant";
import { mapProjectAccessError } from "@/lib/projects/acl/mapProjectAccessError";

/** 403 from the folder-ref device ACL (picked computer not an active seat). */
export const resolveAddFolderRefError = (result: {
  readonly code?: string;
  readonly errorMessage?: string;
}): string =>
  result.code === "folder_ref_device_not_member"
    ? C.foldersDeviceNotMember
    : mapProjectAccessError(result.errorMessage, C.foldersAddFailed);

/** Single owner for folder-ref add/remove mutations (Access + Resources). */
export const useAwcProjectFolderRefActions = (input: {
  readonly projectId: string;
  readonly onMessage: (message: string) => void;
  readonly onReload: () => Promise<void>;
}) => {
  const { projectId, onMessage, onReload } = input;

  const onAdd = async (
    deviceId: string,
    folderPath: string,
  ): Promise<boolean> => {
    const result = await addProjectFolderRef({ projectId, deviceId, folderPath });
    onMessage(result.ok ? C.foldersAdded : resolveAddFolderRefError(result));
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
