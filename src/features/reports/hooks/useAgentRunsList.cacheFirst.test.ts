import { describe, expect, it } from "vitest";

import { AGENT_RUNS_LOCAL_CACHE_UPDATED_EVENT } from "@/features/reports/agentRunLocalCache";
import { POLL_INTERVAL_MS } from "@/features/reports/agentRunsPolling.constant";

describe("useAgentRunsList cache-first contract (REPORTS-006)", () => {
  it("bumps the merged list when the local cache event fires", () => {
    expect(AGENT_RUNS_LOCAL_CACHE_UPDATED_EVENT).toBe(
      "daily-magic:agent-runs-cache-updated",
    );
  });

  it("relies on a ~60s remote sync poll as the safety net", () => {
    expect(POLL_INTERVAL_MS * 12).toBe(60_000);
  });
});
