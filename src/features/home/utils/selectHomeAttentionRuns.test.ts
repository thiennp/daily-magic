import { describe, expect, it } from "vitest";

import selectHomeAttentionRuns from "@/features/home/utils/selectHomeAttentionRuns";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";

const NOW = Date.parse("2026-10-08T12:00:00Z");
const run = (id: string, status: string, updatedAt: string): AgentRunRecord =>
  ({ id, status, updatedAt }) as AgentRunRecord;

describe("selectHomeAttentionRuns", () => {
  it("keeps pending approvals and recent failures, newest first", () => {
    const result = selectHomeAttentionRuns(
      [
        run("old-fail", "failed", "2026-10-06T12:00:00Z"),
        run("fail", "failed", "2026-10-08T10:00:00Z"),
        run("ok", "completed", "2026-10-08T11:00:00Z"),
        run("wait", "pending_approval", "2026-10-08T11:30:00Z"),
        run("old-wait", "pending_approval", "2026-10-01T00:00:00Z"),
      ],
      NOW,
    );

    expect(result.map((r) => r.id)).toEqual(["wait", "fail", "old-wait"]);
  });
});
