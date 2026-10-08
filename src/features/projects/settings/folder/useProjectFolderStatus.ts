"use client";

import { useEffect, useState } from "react";

import {
  fetchProjectFolderStatus,
  type ProjectFolderStatusResult,
} from "@/features/projects/settings/folder/projectFolderBridge";

/** Folder check on the project's computer; `unreachable` when this browser is not on that computer. */
export const useProjectFolderStatus = (input: {
  readonly projectId: string;
  readonly wakePort: number | null;
  readonly reloadKey: string;
}): ProjectFolderStatusResult | "loading" => {
  const { projectId, wakePort, reloadKey } = input;
  const key = `${projectId}|${wakePort}|${reloadKey}`;
  const [answer, setAnswer] = useState<{
    readonly key: string;
    readonly result: ProjectFolderStatusResult;
  } | null>(null);

  useEffect(() => {
    if (wakePort === null) return;
    const state = { cancelled: false };
    void fetchProjectFolderStatus(wakePort, projectId).then((result) => {
      if (!state.cancelled) setAnswer({ key, result });
    });
    return () => {
      state.cancelled = true;
    };
  }, [key, projectId, wakePort]);

  if (wakePort === null) return { kind: "unreachable" };
  return answer?.key === key ? answer.result : "loading";
};
