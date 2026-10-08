"use client";

import { useEffect, useRef } from "react";

import { useSendTaskModal } from "@/features/agent/SendTaskModalProvider";
import {
  clearLiveFloaterRunId,
  getLiveFloaterRunId,
} from "@/features/agent/utils/liveFloaterRunIdStorage";
import { getAgentRunLocalCache } from "@/features/reports/agentRunLocalCache";
import { fetchAgentRunDetail } from "@/features/reports/fetchAgentRunDetail";
import { isAgentRunSilentPastStall } from "@/lib/dispatch/isAgentRunSilentPastStall";
import { shouldRestoreLiveFloaterAfterReload } from "@/features/shell/utils/shouldRestoreLiveFloaterAfterReload";
import { shouldDockResumedLiveSessionOnLoad } from "@/features/shell/utils/shouldDockResumedLiveSessionOnLoad";
import { shouldDockRestoredLiveFloater } from "@/features/shell/utils/shouldDockRestoredLiveFloater";

const readRunStatus = async (runId: string): Promise<string | null> => {
  const cached = getAgentRunLocalCache(runId);
  if (cached !== null) {
    // 6253aa7e: a cached "running" run silent for hours is not live.
    return isAgentRunSilentPastStall(cached, Date.now())
      ? "stalled"
      : cached.status;
  }
  const outcome = await fetchAgentRunDetail(runId);
  return outcome.status === "ok" ? outcome.run.status : null;
};

/**
 * afae8216: the host auto-update reloads the tab; reopen the floater this
 * tab had open for a run that is still live, once per page load.
 * d863fc9e: like ?resumeLive=1, it lands docked in the floater, not the big
 * modal: the run opens with its URL, then docks once the panel is up.
 */
export default function AppShellLiveFloaterRestorer() {
  const { expandRunningSendTask, minimizeSendTaskModal, isOpen } =
    useSendTaskModal();
  const attempted = useRef(false);
  const dockPending = useRef(false);

  useEffect(() => {
    if (
      !shouldDockRestoredLiveFloater({
        isOpen,
        dockPending: dockPending.current,
      })
    ) {
      return;
    }
    dockPending.current = false;
    minimizeSendTaskModal();
  }, [isOpen, minimizeSendTaskModal]);

  useEffect(() => {
    if (attempted.current) {
      return;
    }
    attempted.current = true;
    // a6053d1c: a reload mid-run restores the floater, not the big modal.
    if (shouldDockResumedLiveSessionOnLoad(window.location.search)) {
      minimizeSendTaskModal();
      return;
    }
    const storedRunId = getLiveFloaterRunId();
    const floaterOpen =
      new URLSearchParams(window.location.search).get("sendTask") === "1";
    if (storedRunId === null || floaterOpen) {
      return;
    }
    void readRunStatus(storedRunId)
      .catch(() => null)
      .then((runStatus) => {
        if (
          shouldRestoreLiveFloaterAfterReload({
            storedRunId,
            runStatus,
            floaterOpen,
          })
        ) {
          dockPending.current = true;
          expandRunningSendTask(storedRunId);
          return;
        }
        clearLiveFloaterRunId();
      });
  }, [expandRunningSendTask, minimizeSendTaskModal]);

  return null;
}
