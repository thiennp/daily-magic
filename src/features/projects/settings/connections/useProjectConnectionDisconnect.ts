"use client";

import { useCallback, useState } from "react";

import type { ProjectConnectionProvider } from "@/features/projects/settings/connections/projectConnection.types";
import { requestDisconnectProjectConnection } from "@/features/projects/settings/connections/requestProjectConnectionMutations";

/** Disconnect confirm state + DELETE call; reports ok/fail to the caller. */
export const useProjectConnectionDisconnect = (input: {
  readonly projectId: string;
  readonly onDone: (provider: ProjectConnectionProvider, ok: boolean) => void;
}) => {
  const { projectId, onDone } = input;
  const [target, setTarget] = useState<ProjectConnectionProvider | null>(null);
  const [busy, setBusy] = useState(false);

  const confirm = useCallback(async (): Promise<void> => {
    if (target === null) return;
    setBusy(true);
    const ok = await requestDisconnectProjectConnection({
      projectId,
      provider: target,
    });
    setBusy(false);
    setTarget(null);
    onDone(target, ok);
  }, [projectId, target, onDone]);

  return {
    target,
    busy,
    open: setTarget,
    close: () => setTarget(null),
    confirm,
  };
};
