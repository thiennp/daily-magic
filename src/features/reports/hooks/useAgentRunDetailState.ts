import { useCallback, useEffect, useState } from "react";

import { useDemoPreview } from "@/features/demo/DemoPreviewContext";
import {
  getAgentRunLocalCache,
  upsertAgentRunLocalCache,
} from "@/features/reports/agentRunLocalCache";
import { fetchAgentRunDetail } from "@/features/reports/fetchAgentRunDetail";
import { POLL_INTERVAL_MS } from "@/features/reports/agentRunsPolling.constant";
import { useAgentRunRecordSync } from "@/features/reports/hooks/useAgentRunRecordSync";
import type CapabilityFeedbackRecord from "@/lib/feedback/types/CapabilityFeedbackRecord.type";
import type EnrichedAgentRunRecord from "@/lib/dispatch/types/EnrichedAgentRunRecord.type";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";

const findDemoRun = (
  demoPreview: NonNullable<ReturnType<typeof useDemoPreview>>,
  runId: string,
): EnrichedAgentRunRecord | null =>
  demoPreview.agentRuns.find((item) => item.id === runId) ??
  demoPreview.agentRuns[0] ??
  null;

const toEnrichedRun = (run: AgentRunRecord): EnrichedAgentRunRecord => ({
  ...run,
  requesterEmail: run.requesterUserId,
  executorEmail: run.executorUserId,
  requesterName: null,
  executorName: null,
});

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
      return findDemoRun(demoPreview, runId);
    }

    return cachedRun ? toEnrichedRun(cachedRun) : null;
  });
  const [feedback, setFeedback] = useState<CapabilityFeedbackRecord | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(() => !demoPreview);

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
      setRun(toEnrichedRun(updatedRun));
    }
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

    void fetch(`/api/agent-runs/${runId}/feedback`)
      .then(async (response) => {
        if (!response.ok || !lifecycle.active) {
          return null;
        }

        return response.json() as Promise<unknown>;
      })
      .then((data) => {
        if (
          !lifecycle.active ||
          typeof data !== "object" ||
          data === null ||
          !("feedback" in data) ||
          (data as { feedback: CapabilityFeedbackRecord | null }).feedback ===
            null
        ) {
          return;
        }

        setFeedback((data as { feedback: CapabilityFeedbackRecord }).feedback);
      });

    const timer = setInterval(() => {
      void reloadRun();
    }, POLL_INTERVAL_MS * 6);

    return () => {
      lifecycle.active = false;
      clearInterval(timer);
    };
  }, [demoPreview, runId, reloadRun]);

  return { run, feedback, isLoading, setFeedback, reloadRun };
}
