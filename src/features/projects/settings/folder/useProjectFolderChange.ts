"use client";

import { useState } from "react";

import { linkProjectFolderViaBridge } from "@/features/projects/settings/folder/projectFolderBridge";
import { describeProjectFolderLinkError } from "@/features/projects/settings/folder/projectFolderLinkMessages";

/** Form state + submit for the typed-path folder change. */
export const useProjectFolderChange = (input: {
  readonly projectId: string;
  readonly wakePort: number;
  readonly initialPath: string;
  readonly onLinked: () => void;
}) => {
  const [folderPath, setFolderPath] = useState(input.initialPath);
  const [allowOutsideHome, setAllowOutsideHome] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async () => {
    setPending(true);
    setError(null);
    const result = await linkProjectFolderViaBridge({
      wakePort: input.wakePort,
      projectId: input.projectId,
      folderPath: folderPath.trim(),
      allowOutsideHome,
    });
    setPending(false);
    if (result.ok) {
      input.onLinked();
      return;
    }
    setError(describeProjectFolderLinkError(result.code, result.message));
  };

  return {
    folderPath,
    setFolderPath,
    allowOutsideHome,
    setAllowOutsideHome,
    pending,
    error,
    submit,
  };
};
