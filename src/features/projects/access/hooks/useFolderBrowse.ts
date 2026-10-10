"use client";

import { useState } from "react";

import { pickFolderViaBridge } from "@/features/projects/settings/folder/public-api/presentation";

/** Native folder picker on the selected computer; typing stays the fallback. */
export const useFolderBrowse = (input: {
  readonly wakePort: number | null | undefined;
  readonly onPicked: (folderPath: string) => void;
}) => {
  const [picking, setPicking] = useState(false);
  const { wakePort, onPicked } = input;
  const canBrowse = wakePort !== null && wakePort !== undefined;

  const browse = async (): Promise<void> => {
    if (!canBrowse || picking) return;
    setPicking(true);
    const result = await pickFolderViaBridge(wakePort);
    setPicking(false);
    if (result.kind === "picked") onPicked(result.folderPath);
  };

  return { picking, canBrowse, browse };
};
