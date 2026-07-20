import { describe, expect, it } from "vitest";

import {
  buildAgentRunEventsSseUrl,
  resolveNextAgentRunSseCursor,
  shouldRefreshAgentRunsOnSseEvent,
} from "@/features/reports/utils/shouldRefreshAgentRunsOnSseEvent";

describe("shouldRefreshAgentRunsOnSseEvent", () => {
  it("REPORTS-004: refreshes only on terminal end or status changes", () => {
    expect(
      shouldRefreshAgentRunsOnSseEvent({
        seq: 1,
        kind: "status.running",
        payload: {},
        createdAt: "",
      }),
    ).toBe(true);
    expect(
      shouldRefreshAgentRunsOnSseEvent({
        seq: 2,
        kind: "terminal.end",
        payload: {},
        createdAt: "",
      }),
    ).toBe(true);
    expect(
      shouldRefreshAgentRunsOnSseEvent({
        seq: 3,
        kind: "terminal.chunk",
        payload: {},
        createdAt: "",
      }),
    ).toBe(false);
  });
});

describe("resolveNextAgentRunSseCursor", () => {
  it("REPORTS-004: ignores replayed events at or below the cursor", () => {
    expect(
      resolveNextAgentRunSseCursor({
        lastSeq: 3,
        event: {
          seq: 2,
          kind: "status.running",
          payload: {},
          createdAt: "",
        },
      }),
    ).toEqual({ nextSeq: 3, shouldRefresh: false });
  });

  it("advances the cursor for new status events", () => {
    expect(
      resolveNextAgentRunSseCursor({
        lastSeq: 1,
        event: {
          seq: 2,
          kind: "status.completed",
          payload: {},
          createdAt: "",
        },
      }),
    ).toEqual({ nextSeq: 2, shouldRefresh: true });
  });
});

describe("buildAgentRunEventsSseUrl", () => {
  it("includes afterSeq when resuming", () => {
    expect(buildAgentRunEventsSseUrl("run-1", 4)).toBe(
      "/api/agent-runs/run-1/events?afterSeq=4",
    );
  });
});
