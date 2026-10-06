import { describe, expect, it } from "vitest";

import { PROMPT_SDLC_GOAL_PRESETS } from "./promptSdlcGoalPresets.constant";
import { renderPromptSdlcLocalGoalPresets } from "./renderPromptSdlcLocalGoalPresets";

describe("renderPromptSdlcLocalGoalPresets", () => {
  it("renders a chip per preset with goal text in data attribute", () => {
    const html = renderPromptSdlcLocalGoalPresets();
    expect(html).toContain('class="sdlc-goal-presets"');
    for (const preset of PROMPT_SDLC_GOAL_PRESETS) {
      expect(html).toContain(`>${preset.label}</button>`);
      expect(html).toContain(
        `data-sdlc-goal-preset="${preset.goal.replaceAll('"', "&quot;")}"`,
      );
    }
  });
});

describe("renderPromptSdlcLocalGoalPresets with options", () => {
  it("renders submit chips with custom presets and labels", () => {
    const html = renderPromptSdlcLocalGoalPresets({
      presets: [{ label: "Haiku", goal: 'Write a "haiku"' }],
      groupLabel: "Sample prompts",
      leadLabel: "Try:",
      submitName: "rulePrompt",
    });
    expect(html).toContain('aria-label="Sample prompts"');
    expect(html).toContain(">Try:</span>");
    expect(html).toContain(
      'type="submit" class="sdlc-goal-preset-chip" name="rulePrompt" value="Write a &quot;haiku&quot;"',
    );
    expect(html).not.toContain("data-sdlc-goal-preset");
  });
});
