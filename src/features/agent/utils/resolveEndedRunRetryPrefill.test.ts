import { describe, expect, it } from "vitest";

import { resolveEndedRunRetryPrefill } from "@/features/agent/utils/resolveEndedRunRetryPrefill";
import type AgentRunRecord from "@/lib/dispatch/types/AgentRunRecord.type";

const run = (overrides: Partial<AgentRunRecord>): AgentRunRecord =>
  ({ prompt: "Ship it", projectId: "p-1", ...overrides }) as AgentRunRecord;

describe("resolveEndedRunRetryPrefill (afae8216)", () => {
  it("refills the ask and project of the ended run", () => {
    expect(resolveEndedRunRetryPrefill(run({}))).toEqual({
      prompt: "Ship it",
      projectId: "p-1",
    });
  });

  it("keeps the project unset when the run had none", () => {
    expect(resolveEndedRunRetryPrefill(run({ projectId: null }))).toEqual({
      prompt: "Ship it",
      projectId: null,
    });
  });

  it("returns null without a cached run or ask", () => {
    expect(resolveEndedRunRetryPrefill(null)).toBeNull();
    expect(resolveEndedRunRetryPrefill(run({ prompt: "  " }))).toBeNull();
  });
});
