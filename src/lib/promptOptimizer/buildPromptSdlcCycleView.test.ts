import { describe, expect, it } from "vitest";

import { buildPromptSdlcCycleView } from "@/lib/promptOptimizer/buildPromptSdlcCycleView";
import type PromptSdlcCycleRecord from "@/lib/promptOptimizer/types/PromptSdlcCycleRecord.type";

const cycle: PromptSdlcCycleRecord = {
  id: "cycle-1",
  ownerUserId: "user-1",
  deviceId: null,
  goal: "Be specific",
  sourcePrompt: "Do it",
  judgeKind: "ollama",
  judgeModel: "qwen2.5:7b",
  improverKind: "writer",
  improverModel: "cursor",
  passScore: 80,
  maxRounds: 3,
  status: "awaiting_local",
  activeRunId: null,
  pendingLocalPrompt: "Judge this",
  pendingLocalRole: "judge",
  currentRound: 0,
  errorMessage: null,
  createdAt: "2026-09-27T00:00:00.000Z",
  updatedAt: "2026-09-27T00:00:00.000Z",
};

describe("buildPromptSdlcCycleView", () => {
  it("orders revisions and attaches the matching judgement", () => {
    const view = buildPromptSdlcCycleView({
      cycle,
      revisions: [
        {
          id: "rev-1",
          cycleId: "cycle-1",
          roundNumber: 1,
          promptText: "Later",
          createdAt: "2026-09-27T00:00:00.000Z",
        },
        {
          id: "rev-0",
          cycleId: "cycle-1",
          roundNumber: 0,
          promptText: "Do it",
          createdAt: "2026-09-27T00:00:00.000Z",
        },
      ],
      judgements: [
        {
          id: "judge-1",
          cycleId: "cycle-1",
          revisionId: "rev-0",
          judgeKind: "ollama",
          judgeModel: "qwen2.5:7b",
          score: 40,
          passed: false,
          reasons: "vague",
          rawReply: "{}",
          createdAt: "2026-09-27T00:00:00.000Z",
        },
      ],
      activeRunStatus: null,
    });

    expect(view.pendingLocal).toEqual({ role: "judge", prompt: "Judge this" });
    expect(view.revisions.map((revision) => revision.roundNumber)).toEqual([
      0, 1,
    ]);
    expect(view.revisions[0]?.judgement?.score).toBe(40);
    expect(view.revisions[1]?.judgement).toBeNull();
    expect(view.judgeModel).toBe("qwen2.5:7b");
  });

  it("hides a local call unless the cycle is waiting on this Mac", () => {
    const view = buildPromptSdlcCycleView({
      cycle: { ...cycle, status: "judging", pendingLocalRole: null },
      revisions: [],
      judgements: [],
      activeRunStatus: "running",
    });

    expect(view.pendingLocal).toBeNull();
    expect(view.activeRunStatus).toBe("running");
  });
});
