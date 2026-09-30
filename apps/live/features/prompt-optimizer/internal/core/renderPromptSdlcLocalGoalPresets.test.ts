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
