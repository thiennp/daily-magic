import { useCallback, useEffect, useState } from "react";

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
  const cachedRun = getAgentRunLocalCache(runId);
  const [run, setRun] = useState<EnrichedAgentRunRecord | null>(() =>
    cachedRun ? toEnrichedRun(cachedRun) : null,
  );
  const [feedback, setFeedback] = useState<CapabilityFeedbackRecord | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);

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
  }, [runId, reloadRun]);

  return { run, feedback, isLoading, setFeedback, reloadRun };
}
