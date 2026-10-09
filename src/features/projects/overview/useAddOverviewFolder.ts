"use client";

import { useState } from "react";

import { addProjectFolderRef } from "@/features/projects/access/utils/mutateProjectFolderRefs";

/** State + action behind the Overview prompt's path box. */
export const useAddOverviewFolder = (input: {
  readonly projectId: string;
  readonly thisDeviceId: string | null;
  readonly onAdded: () => Promise<void>;
}) => {
  const [path, setPath] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);
  const add = async (): Promise<void> => {
    if (input.thisDeviceId === null || path.trim().length === 0) return;
    setPending(true);
    setError(false);
    const result = await addProjectFolderRef({
      projectId: input.projectId,
      deviceId: input.thisDeviceId,
      folderPath: path.trim(),
    });
    setPending(false);
    if (result.ok) {
      setPath("");
      await input.onAdded();
    } else {
      setError(true);
    }
  };
  return { path, setPath, pending, error, add };
};
