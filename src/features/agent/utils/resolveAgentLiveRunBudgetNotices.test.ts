import { describe, expect, it } from "vitest";

import {
  AGENT_LIVE_SESSION_LIMIT_PREWARN_LABEL,
  AGENT_LIVE_SOFT_ESTIMATE_LABEL,
} from "@/lib/dispatch/agentRunBudgetLabels.constant";
import { resolveAgentLiveRunBudgetNotices } from "@/features/agent/utils/resolveAgentLiveRunBudgetNotices";
import { resolveAgentLiveWorkingEstimateProgress } from "@/features/agent/utils/resolveAgentLiveWorkingEstimateProgress";

describe("resolveAgentLiveRunBudgetNotices", () => {
  it("returns no notices while within the soft estimate", () => {
    const estimateProgress = resolveAgentLiveWorkingEstimateProgress({
      estimateSeconds: 100,
      workedMs: 40_000,
    });

    expect(
      resolveAgentLiveRunBudgetNotices({
        isWorking: true,
        estimateProgress,
      }),
    ).toEqual([]);
  });

  it("shows soft guidance past WORKING_ESTIMATE without session-limit pre-warn yet", () => {
    const estimateProgress = resolveAgentLiveWorkingEstimateProgress({
      estimateSeconds: 100,
      workedMs: 105_000,
    });

    const notices = resolveAgentLiveRunBudgetNotices({
      isWorking: true,
      estimateProgress,
    });

    expect(notices.map((n) => n.label)).toEqual([
      AGENT_LIVE_SOFT_ESTIMATE_LABEL,
    ]);
    expect(notices[0]?.tone).toBe("soft");
  });

  it("adds session-limit pre-warn before a hard stop when deep past soft budget", () => {
    const estimateProgress = resolveAgentLiveWorkingEstimateProgress({
      estimateSeconds: 100,
      workedMs: 140_000,
    });

    const labels = resolveAgentLiveRunBudgetNotices({
      isWorking: true,
      estimateProgress,
    }).map((n) => n.label);

    expect(labels).toContain(AGENT_LIVE_SOFT_ESTIMATE_LABEL);
    expect(labels).toContain(AGENT_LIVE_SESSION_LIMIT_PREWARN_LABEL);
  });
});
