import { describe, expect, it } from "vitest";

import {
  AgentRunBudgetReasonCode,
  AGENT_RUN_ESTIMATE_PAST_TITLE,
  AGENT_RUN_SESSION_LIMIT_APPROACHING_TITLE,
} from "@/lib/dispatch/agentRunBudgetNoticeCopy.constant";
import { resolveAgentLiveRunBudgetNotices } from "@/features/agent/utils/resolveAgentLiveRunBudgetNotices";
import { resolveAgentLiveWorkingEstimateProgress } from "@/features/agent/utils/resolveAgentLiveWorkingEstimateProgress";

describe("resolveAgentLiveRunBudgetNotices (Desi P0)", () => {
  it("estimate_ok — no banner while under WORKING_ESTIMATE", () => {
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

  it("estimate_past — exact title and body", () => {
    const estimateProgress = resolveAgentLiveWorkingEstimateProgress({
      estimateSeconds: 100,
      workedMs: 105_000,
    });

    const notices = resolveAgentLiveRunBudgetNotices({
      isWorking: true,
      estimateProgress,
    });

    expect(notices[0]?.reasonCode).toBe(AgentRunBudgetReasonCode.ESTIMATE_PAST);
    expect(notices[0]?.title).toBe(AGENT_RUN_ESTIMATE_PAST_TITLE);
    expect(notices[0]?.body).toBe(
      "This run is past its working estimate (about 2 min). It can keep going until the session limit.",
    );
  });

  it("session_limit_approaching — exact pre-warn copy", () => {
    const estimateProgress = resolveAgentLiveWorkingEstimateProgress({
      estimateSeconds: 100,
      workedMs: 140_000,
    });

    const prewarn = resolveAgentLiveRunBudgetNotices({
      isWorking: true,
      estimateProgress,
    }).find(
      (n) =>
        n.reasonCode === AgentRunBudgetReasonCode.SESSION_LIMIT_APPROACHING,
    );

    expect(prewarn?.title).toBe(AGENT_RUN_SESSION_LIMIT_APPROACHING_TITLE);
    expect(prewarn?.body).toBe(
      "This run is near the session limit — a hard stop. Wrap up or expect the run to stop when the limit is hit.",
    );
    expect(prewarn?.secondary).toBe("Working estimate was about 2 min (soft).");
  });
});
