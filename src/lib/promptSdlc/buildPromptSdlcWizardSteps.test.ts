import { describe, expect, it } from "vitest";

import { buildPromptSdlcSteps } from "@/lib/promptSdlc/buildPromptSdlcSteps";
import type PromptSdlcCycleView from "@/lib/promptSdlc/types/PromptSdlcCycleView.type";

const baseCycle = (
  overrides: Partial<PromptSdlcCycleView>,
): PromptSdlcCycleView => ({
  id: "cycle-1",
  goal: "Ship",
  judgeModel: "claude-cli",
  improverModel: "claude-cli",
  status: "wizard_paused",
  currentRound: 0,
  maxRounds: 5,
  passScore: 70,
  errorMessage: null,
  activeRunId: null,
  activeRunStatus: null,
  pendingLocal: null,
  revisions: [
    {
      id: "rev-0",
      roundNumber: 0,
      promptText: "Be helpful",
      judgement: null,
    },
  ],
  ...overrides,
});

describe("buildPromptSdlcSteps wizard timeline", () => {
  it("shows step 1 only at the generalize gate (no round labels)", () => {
    const labels = buildPromptSdlcSteps(
      baseCycle({
        wizard: { phase: "generalize", gate: "generalize" },
      }),
    ).map((step) => step.label);

    expect(labels).toEqual(["Step 1 — Generalize"]);
    expect(labels.some((label) => label.toLowerCase().includes("round"))).toBe(
      false,
    );
  });

  it("shows step 2 active after generalize when evaluate runs", () => {
    const labels = buildPromptSdlcSteps(
      baseCycle({
        status: "judging",
        wizard: { phase: "evaluate", gate: null },
      }),
    ).map((step) => step.label);

    expect(labels[0]).toBe("Step 1 — Generalize");
    expect(labels[1]).toBe("Step 2 — Evaluate");
    expect(labels).not.toContain("Step 4 — Optimize modules");
  });

  it("shows step 3 at the separate gate, not step 4", () => {
    const labels = buildPromptSdlcSteps(
      baseCycle({
        wizard: { phase: "separate", gate: "separate" },
      }),
    ).map((step) => step.label);

    expect(labels).toEqual([
      "Step 1 — Generalize",
      "Step 2 — Evaluate",
      "Step 3 — Separate",
    ]);
  });
});
