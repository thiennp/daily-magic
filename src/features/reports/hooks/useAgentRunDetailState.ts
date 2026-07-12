import { useEffect, useState } from "react";

import { useDemoPreview } from "@/features/demo/DemoPreviewContext";
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
} {
  const demoPreview = useDemoPreview();
  const [run, setRun] = useState<EnrichedAgentRunRecord | null>(() =>
    demoPreview ? findDemoRun(demoPreview, runId) : null,
  );
  const [feedback, setFeedback] = useState<CapabilityFeedbackRecord | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(() => !demoPreview);

  useEffect(() => {
    if (demoPreview) {
      return;
    }

    const loadRun = async (): Promise<void> => {
      const response = await fetch(`/api/agent-runs/${runId}`);
      if (!response.ok) {
        setRun(null);
        setIsLoading(false);
        return;
      }

      const data: unknown = await response.json();
      if (
        typeof data === "object" &&
        data !== null &&
        "run" in data &&
        typeof (data as { run: EnrichedAgentRunRecord }).run === "object"
      ) {
        setRun((data as { run: EnrichedAgentRunRecord }).run);
      }
      setIsLoading(false);
    };

    const loadFeedback = async (): Promise<void> => {
      const response = await fetch(`/api/agent-runs/${runId}/feedback`);
      if (!response.ok) {
        return;
      }

      const data: unknown = await response.json();
      if (
        typeof data === "object" &&
        data !== null &&
        "feedback" in data &&
        (data as { feedback: CapabilityFeedbackRecord | null }).feedback !==
          null
      ) {
        setFeedback((data as { feedback: CapabilityFeedbackRecord }).feedback);
      }
    };

    void loadRun();
    void loadFeedback();
    const timer = setInterval(() => {
      void loadRun();
    }, POLL_INTERVAL_MS);

    return () => {
      clearInterval(timer);
    };
  }, [demoPreview, runId]);

  return { run, feedback, isLoading, setFeedback };
}
