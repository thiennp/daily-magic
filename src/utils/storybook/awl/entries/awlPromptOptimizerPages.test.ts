import { describe, expect, it } from "vitest";

import { AWL_PROMPT_OPTIMIZER_PAGE_ENTRIES } from "@/utils/storybook/awl/entries/awlPromptOptimizerPages";

describe("awlPromptOptimizerPages fixture", () => {
  it("stacks goal and prompt fields with AWL compose layout classes", () => {
    const entry = AWL_PROMPT_OPTIMIZER_PAGE_ENTRIES.find(
      (item) => item.id === "prompt-optimizer",
    );
    expect(entry).toBeDefined();
    const html = entry?.renderHtml("ready") ?? "";
    expect(html).toContain('class="sdlc-fields"');
    expect(html).toContain('<div class="field">');
    expect(html).toContain('<span class="field-label">Goal</span>');
    expect(html).toContain('<span class="field-label">Prompt</span>');
    expect(html).not.toMatch(/<label>Goal<input/);
  });
});
