import { useEffect, useState } from "react";

import type CapabilityFeedbackRecord from "@/lib/feedback/types/CapabilityFeedbackRecord.type";

export function useAgentRunDetailFeedback(
  runId: string,
  enabled: boolean,
): {
  readonly feedback: CapabilityFeedbackRecord | null;
  readonly setFeedback: (feedback: CapabilityFeedbackRecord) => void;
} {
  const [feedback, setFeedback] = useState<CapabilityFeedbackRecord | null>(
    null,
  );

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const lifecycle = { active: true };

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

    return () => {
      lifecycle.active = false;
    };
  }, [enabled, runId]);

  return { feedback, setFeedback };
}
