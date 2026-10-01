import { useCallback, useEffect, useState } from "react";

import {
  getAgentRunLocalCache,
  upsertAgentRunLocalCache,
} from "@/features/reports/agentRunLocalCache";
import { fetchAgentRunDetail } from "@/features/reports/fetchAgentRunDetail";
import { POLL_INTERVAL_MS } from "@/features/reports/agentRunsPolling.constant";
import { useAgentRunDetailFeedback } from "@/features/reports/hooks/useAgentRunDetailFeedback";
import { useAgentRunEventsSse } from "@/features/reports/hooks/useAgentRunEventsSse";
import { useAgentRunRecordSync } from "@/features/reports/hooks/useAgentRunRecordSync";
import { toEnrichedAgentRun } from "@/features/reports/utils/agentRunDetailState.helpers";
import { isTerminalAgentRunStatus } from "@/lib/dispatch/isTerminalAgentRunStatus";
import type CapabilityFeedbackRecord from "@/lib/feedback/types/CapabilityFeedbackRecord.type";
import type EnrichedAgentRunRecord from "@/lib/dispatch/types/EnrichedAgentRunRecord.type";

export function useAgentRunDetailState(runId: string): {
  readonly run: EnrichedAgentRunRecord | null;
  readonly feedback: CapabilityFeedbackRecord | null;
  readonly isLoading: boolean;
  readonly loadError: boolean;
  readonly setFeedback: (feedback: CapabilityFeedbackRecord) => void;
  readonly reloadRun: () => Promise<void>;
} {
  const cachedRun = getAgentRunLocalCache(runId);
  const [run, setRun] = useState<EnrichedAgentRunRecord | null>(() =>
    cachedRun ? toEnrichedAgentRun(cachedRun) : null,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [sseActive, setSseActive] = useState(false);
  const { feedback, setFeedback } = useAgentRunDetailFeedback(runId, true);

  const reloadRun = useCallback(async (): Promise<void> => {
    const outcome = await fetchAgentRunDetail(runId);
    if (outcome.status === "ok") {
      upsertAgentRunLocalCache(outcome.run);
      setRun(outcome.run);
      setLoadError(false);
    } else if (outcome.status === "error" && run === null) {
      setLoadError(true);
    }
    setIsLoading(false);
  }, [run, runId]);

  useAgentRunRecordSync((updatedRun) => {
    if (updatedRun.id === runId) {
      setRun(toEnrichedAgentRun(updatedRun));
    }
  });

  useAgentRunEventsSse({
    runId,
    enabled: run === null || !isTerminalAgentRunStatus(run.status),
    onEvent: () => {
      setSseActive(true);
      void reloadRun();
    },
    onTerminal: () => {
      void reloadRun();
    },
  });

  useEffect(() => {
    const lifecycle = { active: true };

    void fetchAgentRunDetail(runId).then((outcome) => {
      if (!lifecycle.active) {
        return;
      }

      if (outcome.status === "ok") {
        upsertAgentRunLocalCache(outcome.run);
        setRun(outcome.run);
        setLoadError(false);
      } else if (outcome.status === "error") {
        setLoadError(true);
      } else {
        setLoadError(false);
      }
      setIsLoading(false);
    });

    const pollMs = sseActive ? POLL_INTERVAL_MS * 12 : POLL_INTERVAL_MS * 6;
    const timer = setInterval(() => {
      void reloadRun();
    }, pollMs);

    return () => {
      lifecycle.active = false;
      clearInterval(timer);
    };
  }, [reloadRun, runId, sseActive]);

  return { run, feedback, isLoading, loadError, setFeedback, reloadRun };
}
