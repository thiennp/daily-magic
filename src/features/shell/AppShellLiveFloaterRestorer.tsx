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
 */
export default function AppShellLiveFloaterRestorer() {
  const { expandRunningSendTask } = useSendTaskModal();
  const attempted = useRef(false);

  useEffect(() => {
    if (attempted.current) {
      return;
    }
    attempted.current = true;
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
          expandRunningSendTask(storedRunId);
          return;
        }
        clearLiveFloaterRunId();
      });
  }, [expandRunningSendTask]);

  return null;
}
