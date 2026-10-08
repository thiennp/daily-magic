"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import type {
  LinearTaskSyncState,
  LinearTaskSyncUpdate,
} from "@/features/projects/settings/connections/projectTaskSync.types";
import { formatProjectConnectionsCopy as fmt } from "@/features/projects/settings/connections/projectConnectionsCopy.constant";
import { PROJECT_TASK_SYNC_COPY as C } from "@/features/projects/settings/connections/projectTaskSyncCopy.constant";
import {
  getLinearTaskSync,
  putLinearTaskSync,
} from "@/features/projects/settings/connections/requestLinearTaskSync";
import { runLinearTaskSyncRounds } from "@/features/projects/settings/connections/runLinearTaskSyncRounds";
import { taskSyncFailureMessage } from "@/features/projects/settings/connections/taskSyncFailureMessage";

export type TaskSyncLoadState = "loading" | "ready" | "unavailable" | "error";

/** Linear task-sync settings: GET / PUT / "Sync now" with abort on unmount. */
export const useProjectTaskSyncLinear = (
  projectId: string,
  enabledForOwner: boolean,
) => {
  const [loadState, setLoadState] = useState<TaskSyncLoadState>("loading");
  const [state, setState] = useState<LinearTaskSyncState | null>(null);
  const [loadKey, setLoadKey] = useState(0);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [syncLeft, setSyncLeft] = useState<number | null>(null);
  const [syncSummary, setSyncSummary] = useState<string | null>(null);
  // Back to "loading" when the project or reload key changes (render-time reset).
  const [shownFor, setShownFor] = useState({ projectId, loadKey });
  if (shownFor.projectId !== projectId || shownFor.loadKey !== loadKey) {
    setShownFor({ projectId, loadKey });
    setLoadState("loading");
  }
  const actionAbort = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!enabledForOwner) return;
    const controller = new AbortController();
    void getLinearTaskSync(projectId, controller.signal).then((result) => {
      if (controller.signal.aborted) return;
      if (result.ok) {
        setState(result.value);
        setLoadState("ready");
        return;
      }
      setLoadState(result.reason === "unavailable" ? "unavailable" : "error");
    });
    return () => controller.abort();
  }, [projectId, enabledForOwner, loadKey]);

  useEffect(() => () => actionAbort.current?.abort(), [projectId]);

  const reload = useCallback(() => setLoadKey((key) => key + 1), []);

  const update = useCallback(
    async (change: LinearTaskSyncUpdate) => {
      const controller = new AbortController();
      actionAbort.current = controller;
      setSaving(true);
      setNotice(null);
      const result = await putLinearTaskSync(
        projectId,
        change,
        controller.signal,
      );
      if (controller.signal.aborted) return;
      setSaving(false);
      if (result.ok) setState(result.value);
      else setNotice(taskSyncFailureMessage(result.reason, C.saveError));
    },
    [projectId],
  );

  const syncNow = useCallback(async () => {
    const controller = new AbortController();
    actionAbort.current = controller;
    setNotice(null);
    setSyncSummary(null);
    setSyncLeft(0);
    const result = await runLinearTaskSyncRounds({
      projectId,
      signal: controller.signal,
      onProgress: setSyncLeft,
    });
    if (controller.signal.aborted) return;
    setSyncLeft(null);
    if (result.ok) {
      setSyncSummary(
        fmt(C.syncSummary, {
          pushed: String(result.value.pushed),
          failed: String(result.value.failed),
        }),
      );
    } else {
      setNotice(taskSyncFailureMessage(result.reason, C.syncError));
    }
    const fresh = await getLinearTaskSync(projectId, controller.signal);
    if (!controller.signal.aborted && fresh.ok) setState(fresh.value);
  }, [projectId]);

  return {
    loadState,
    state,
    saving,
    notice,
    syncLeft,
    syncSummary,
    reload,
    update,
    syncNow,
  };
};
