import { describe, expect, it } from "vitest";

import {
  mapPromptSdlcCycleRow,
  mapPromptSdlcJudgementRow,
} from "@/lib/promptSdlc/mapPromptSdlcRows";

const cycleRow = {
  id: "cycle-1",
  owner_user_id: "user-1",
  device_id: null,
  goal: "Be specific",
  source_prompt: "Do it",
  judge_kind: "ollama",
  judge_model: "qwen2.5:7b",
  improver_kind: "writer",
  improver_model: "cursor",
  pass_score: 80,
  max_rounds: 3,
  status: "judging",
  active_run_id: null,
  pending_local_prompt: null,
  pending_local_role: null,
  current_round: 0,
  error_message: null,
  created_at: "2026-09-27T00:00:00.000Z",
  updated_at: "2026-09-27T00:00:00.000Z",
};

describe("mapPromptSdlcRows", () => {
  it("maps a cycle and a judgement with nullable scores", () => {
    expect(mapPromptSdlcCycleRow(cycleRow).judgeModel).toBe("qwen2.5:7b");
    expect(
      mapPromptSdlcJudgementRow({
        id: "judge-1",
        cycle_id: "cycle-1",
        revision_id: "rev-0",
        judge_kind: "ollama",
        judge_model: "qwen2.5:7b",
        score: null,
        passed: null,
        reasons: null,
        raw_reply: "nope",
        created_at: "2026-09-27T00:00:00.000Z",
      }).score,
    ).toBeNull();
  });

  it("rejects an unknown status, kind, or role", () => {
    expect(() =>
      mapPromptSdlcCycleRow({ ...cycleRow, status: "draft" }),
    ).toThrow("Unknown prompt SDLC cycle status.");
    expect(() =>
      mapPromptSdlcCycleRow({ ...cycleRow, judge_kind: "cloud" }),
    ).toThrow("Unknown prompt SDLC model kind.");
    expect(() =>
      mapPromptSdlcCycleRow({ ...cycleRow, pending_local_role: "score" }),
    ).toThrow("Unknown prompt SDLC call role.");
  });
});
