"use client";

import { useCallback, useEffect, useState } from "react";

import { mergeConnectionRows } from "@/features/projects/settings/connections/mergeConnectionRows";
import type {
  ProjectConnectionItem,
  ProjectConnectionsLoadState,
} from "@/features/projects/settings/connections/projectConnection.types";
import { requestProjectConnections } from "@/features/projects/settings/connections/requestProjectConnections";

/** Settings → Connections list. 404/501/network → unavailable (honest). */
export const useProjectConnections = (
  projectId: string,
): {
  readonly loadState: ProjectConnectionsLoadState;
  readonly rows: readonly ProjectConnectionItem[];
  readonly reload: () => void;
} => {
  const [loadState, setLoadState] =
    useState<ProjectConnectionsLoadState>("loading");
  const [rows, setRows] = useState<readonly ProjectConnectionItem[]>(() =>
    mergeConnectionRows([]),
  );
  const [loadKey, setLoadKey] = useState(0);
  // Back to "loading" when the project or reload key changes (render-time reset).
  const [shownFor, setShownFor] = useState({ projectId, loadKey });
  if (shownFor.projectId !== projectId || shownFor.loadKey !== loadKey) {
    setShownFor({ projectId, loadKey });
    setLoadState("loading");
  }

  useEffect(() => {
    const controller = new AbortController();
    void requestProjectConnections({
      projectId,
      signal: controller.signal,
    }).then((result) => {
      if (controller.signal.aborted) return;
      if (!result.ok) {
        setRows(mergeConnectionRows([]));
        setLoadState(result.reason);
        return;
      }
      setRows(mergeConnectionRows(result.items));
      setLoadState("ready");
    });
    return () => controller.abort();
  }, [projectId, loadKey]);

  const reload = useCallback(() => {
    setLoadKey((key) => key + 1);
  }, []);

  return { loadState, rows, reload };
};
