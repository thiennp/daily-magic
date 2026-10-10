"use client";

import {
  addProjectFolderRef,
  removeProjectFolderRef,
  setProjectFolderRefShared,
} from "@/features/projects/access/utils/mutateProjectFolderRefs";
import { PROJECT_PAGE_RESOURCES_COPY as C } from "@/features/projects/resources/public-api/types";
import { mapProjectAccessError } from "@/lib/projects/acl/mapProjectAccessError";

/** 403 from the folder-ref device ACL (picked computer not an active seat). */
export const resolveAddFolderRefError = (result: {
  readonly code?: string;
  readonly errorMessage?: string;
}): string => {
  if (result.code === "folder_ref_device_not_member") {
    return C.foldersDeviceNotMember;
  }
  if (result.code === "folder_ref_path_required") {
    return "Enter a folder path.";
  }
  if (result.code === "folder_ref_invalid_device") {
    return C.foldersChooseComputerFirst;
  }
  if (result.code === "folder_ref_failed") {
    return C.foldersAddFailed;
  }
  const mapped = mapProjectAccessError(
    result.errorMessage ?? result.code,
    C.foldersAddFailed,
  );
  // Never show display-name Nickname copy on folder-path errors.
  if (/nickname/i.test(mapped)) {
    return C.foldersAddFailed;
  }
  return mapped;
};

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
    shared = true,
  ): Promise<boolean> => {
    const result = await addProjectFolderRef({
      projectId,
      deviceId,
      folderPath,
      shared,
    });
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

  const onToggleShared = (refId: string, shared: boolean): void => {
    void setProjectFolderRefShared({ projectId, refId, shared }).then(
      async (result) => {
        onMessage(
          result.ok
            ? shared
              ? C.foldersNowShared
              : C.foldersNowPrivate
            : mapProjectAccessError(result.errorMessage, C.foldersAddFailed),
        );
        await onReload();
      },
    );
  };

  return { onAdd, onRemove, onToggleShared };
};
