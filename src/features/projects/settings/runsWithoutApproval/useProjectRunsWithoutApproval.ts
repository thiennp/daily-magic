"use client";

import { useCallback, useEffect, useState } from "react";

import { requestProjectRunsWithoutApproval } from "@/features/projects/settings/runsWithoutApproval/requestProjectRunsWithoutApproval";
import type {
  RunsWithoutApprovalLoadState,
  RunsWithoutApprovalSwitchView,
} from "@/features/projects/settings/runsWithoutApproval/runsWithoutApproval.type";

/** Owner-only S0-2 setting: load once, save on demand (server is the truth). */
export const useProjectRunsWithoutApproval = (
  projectId: string,
): RunsWithoutApprovalSwitchView & {
  readonly save: (value: boolean) => Promise<void>;
  readonly reload: () => void;
} => {
  const [loadState, setLoadState] =
    useState<RunsWithoutApprovalLoadState>("loading");
  const [enabled, setEnabled] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveFailed, setSaveFailed] = useState(false);
  const [loadKey, setLoadKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    void requestProjectRunsWithoutApproval({
      projectId,
      signal: controller.signal,
    }).then((result) => {
      if (controller.signal.aborted) return;
      if (!result.ok) {
        setLoadState("error");
        return;
      }
      setEnabled(result.allowRunsWithoutApproval);
      setLoadState("ready");
    });
    return () => controller.abort();
  }, [projectId, loadKey]);

  const save = useCallback(
    async (value: boolean): Promise<void> => {
      setSaving(true);
      setSaveFailed(false);
      const result = await requestProjectRunsWithoutApproval({
        projectId,
        value,
      });
      setSaving(false);
      if (!result.ok) {
        setSaveFailed(true);
        return;
      }
      setEnabled(result.allowRunsWithoutApproval);
    },
    [projectId],
  );

  const reload = useCallback(() => {
    setLoadState("loading");
    setLoadKey((key) => key + 1);
  }, []);

  return { loadState, enabled, saving, saveFailed, save, reload };
};
