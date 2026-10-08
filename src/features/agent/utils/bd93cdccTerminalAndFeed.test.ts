import { describe, expect, it } from "vitest";

import { appendProgressStepsUntilIndex } from "@/features/agent/utils/appendAgentLiveProgressTimelineSteps";
import { formatAgentLiveTerminalMarkersForDisplay } from "@/features/agent/utils/formatAgentLiveTerminalMarkersForDisplay";

describe("bd93cdcc terminal and feed", () => {
  it("never shows the raw [checkpoint answer] marker mid-line", () => {
    const shown = formatAgentLiveTerminalMarkersForDisplay(
      "agent-witch@linux ~ $ [checkpoint answer] Yes, proceed",
    );
    expect(shown).not.toContain("[checkpoint answer]");
    expect(shown).toContain("Your answer: Yes, proceed");
  });

  it("shows a progress block reported twice as one step", () => {
    const update = {
      title: "Inspecting workspace and preparing checkpoints",
      detail: "",
    };
    const steps = appendProgressStepsUntilIndex({
      updates: [update, update],
      updateStates: ["done", "active"],
      needsInput: false,
      progressIndex: 1,
      progressCursor: 0,
      steps: [],
    });
    expect(steps.map((step) => [step.label, step.state])).toEqual([
      ["Inspecting workspace and preparing checkpoints", "active"],
    ]);
  });
});
