import { useCallback, useEffect, useState } from "react";

import { useDemoPreview } from "@/features/demo/DemoPreviewContext";
import { fetchAgentRunDetail } from "@/features/reports/fetchAgentRunDetail";
import { POLL_INTERVAL_MS } from "@/features/reports/agentRunsPolling.constant";
import type CapabilityFeedbackRecord from "@/lib/feedback/types/CapabilityFeedbackRecord.type";
import type EnrichedAgentRunRecord from "@/lib/dispatch/types/EnrichedAgentRunRecord.type";

const findDemoRun = (
  demoPreview: NonNullable<ReturnType<typeof useDemoPreview>>,
  runId: string,
): EnrichedAgentRunRecord | null =>
  demoPreview.agentRuns.find((item) => item.id === runId) ??
  demoPreview.agentRuns[0] ??
  null;

export function useAgentRunDetailState(runId: string): {
  readonly run: EnrichedAgentRunRecord | null;
  readonly feedback: CapabilityFeedbackRecord | null;
  readonly isLoading: boolean;
  readonly setFeedback: (feedback: CapabilityFeedbackRecord) => void;
  readonly reloadRun: () => Promise<void>;
} {
  const demoPreview = useDemoPreview();
  const [run, setRun] = useState<EnrichedAgentRunRecord | null>(() =>
    demoPreview ? findDemoRun(demoPreview, runId) : null,
  );
  const [feedback, setFeedback] = useState<CapabilityFeedbackRecord | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(() => !demoPreview);

  const reloadRun = useCallback(async (): Promise<void> => {
    const nextRun = await fetchAgentRunDetail(runId);
    setRun(nextRun);
    setIsLoading(false);
  }, [runId]);

  useEffect(() => {
    if (demoPreview) {
      return;
    }

    const lifecycle = { active: true };

    void fetchAgentRunDetail(runId).then((nextRun) => {
      if (lifecycle.active) {
        setRun(nextRun);
        setIsLoading(false);
      }
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
    }, POLL_INTERVAL_MS);

    return () => {
      lifecycle.active = false;
      clearInterval(timer);
    };
  }, [demoPreview, runId, reloadRun]);

  return { run, feedback, isLoading, setFeedback, reloadRun };
}
