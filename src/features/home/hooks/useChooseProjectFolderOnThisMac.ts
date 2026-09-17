"use client";

import { useCallback, useState } from "react";

import { requestSelectProjectFolderOnWakeServer } from "@/lib/projects/requestSelectProjectFolderOnWakeServer";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";

const useChooseProjectFolderOnThisMac = (input: {
  readonly wakePort?: number | null;
  readonly onSuccess?: () => void | Promise<void>;
}): {
  readonly chooseFolder: (project: UserProjectRecord) => Promise<void>;
  readonly isChoosingFolder: boolean;
  readonly folderPickerError: string | null;
  readonly clearFolderPickerError: () => void;
} => {
  const [isChoosingFolder, setIsChoosingFolder] = useState(false);
  const [folderPickerError, setFolderPickerError] = useState<string | null>(
    null,
  );
  const wakePort = input.wakePort;
  const onSuccess = input.onSuccess;

  const chooseFolder = useCallback(
    async (project: UserProjectRecord): Promise<void> => {
      setIsChoosingFolder(true);
      setFolderPickerError(null);

      try {
        const result = await requestSelectProjectFolderOnWakeServer({
          projectId: project.id,
          wakePort,
        });

        if (result.ok) {
          await onSuccess?.();
          return;
        }

        if ("cancelled" in result && result.cancelled) {
          return;
        }

        setFolderPickerError(
          "errorMessage" in result
            ? result.errorMessage
            : "Could not choose a folder.",
        );
      } finally {
        setIsChoosingFolder(false);
      }
    },
    [onSuccess, wakePort],
  );

  const clearFolderPickerError = useCallback(() => {
    setFolderPickerError(null);
  }, []);

  return {
    chooseFolder,
    isChoosingFolder,
    folderPickerError,
    clearFolderPickerError,
  };
};

export default useChooseProjectFolderOnThisMac;
