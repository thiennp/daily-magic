import { useCallback, useEffect, useState } from "react";

import { useDemoPreview } from "@/features/demo/DemoPreviewContext";
import {
  getAgentRunLocalCache,
  upsertAgentRunLocalCache,
} from "@/features/reports/agentRunLocalCache";
import { fetchAgentRunDetail } from "@/features/reports/fetchAgentRunDetail";
import { POLL_INTERVAL_MS } from "@/features/reports/agentRunsPolling.constant";
import { useAgentRunDetailFeedback } from "@/features/reports/hooks/useAgentRunDetailFeedback";
import { useAgentRunEventsSse } from "@/features/reports/hooks/useAgentRunEventsSse";
import { useAgentRunRecordSync } from "@/features/reports/hooks/useAgentRunRecordSync";
import {
  findDemoAgentRun,
  toEnrichedAgentRun,
} from "@/features/reports/utils/agentRunDetailState.helpers";
import { isTerminalAgentRunStatus } from "@/lib/dispatch/isTerminalAgentRunStatus";
import type CapabilityFeedbackRecord from "@/lib/feedback/types/CapabilityFeedbackRecord.type";
import type EnrichedAgentRunRecord from "@/lib/dispatch/types/EnrichedAgentRunRecord.type";

export function useAgentRunDetailState(runId: string): {
  readonly run: EnrichedAgentRunRecord | null;
  readonly feedback: CapabilityFeedbackRecord | null;
  readonly isLoading: boolean;
  readonly setFeedback: (feedback: CapabilityFeedbackRecord) => void;
  readonly reloadRun: () => Promise<void>;
} {
  const demoPreview = useDemoPreview();
  const cachedRun = getAgentRunLocalCache(runId);
  const [run, setRun] = useState<EnrichedAgentRunRecord | null>(() => {
    if (demoPreview) {
      return findDemoAgentRun(demoPreview, runId);
    }

    return cachedRun ? toEnrichedAgentRun(cachedRun) : null;
  });
  const [isLoading, setIsLoading] = useState(() => !demoPreview);
  const [sseActive, setSseActive] = useState(false);
  const { feedback, setFeedback } = useAgentRunDetailFeedback(
    runId,
    demoPreview === null,
  );

  const reloadRun = useCallback(async (): Promise<void> => {
    const nextRun = await fetchAgentRunDetail(runId);
    if (nextRun !== null) {
      upsertAgentRunLocalCache(nextRun);
      setRun(nextRun);
    }
    setIsLoading(false);
  }, [runId]);

  useAgentRunRecordSync((updatedRun) => {
    if (updatedRun.id === runId) {
      setRun(toEnrichedAgentRun(updatedRun));
    }
  });

  useAgentRunEventsSse({
    runId,
    enabled:
      demoPreview === null &&
      (run === null || !isTerminalAgentRunStatus(run.status)),
    onEvent: () => {
      setSseActive(true);
      void reloadRun();
    },
    onTerminal: () => {
      void reloadRun();
    },
  });

  useEffect(() => {
    if (demoPreview) {
      return;
    }

    const lifecycle = { active: true };

    void fetchAgentRunDetail(runId).then((nextRun) => {
      if (!lifecycle.active) {
        return;
      }

      if (nextRun !== null) {
        upsertAgentRunLocalCache(nextRun);
        setRun(nextRun);
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
  }, [demoPreview, reloadRun, runId, sseActive]);

  return { run, feedback, isLoading, setFeedback, reloadRun };
}
