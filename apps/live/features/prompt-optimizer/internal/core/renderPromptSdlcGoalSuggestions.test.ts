import { describe, expect, it } from "vitest";

import { renderPromptSdlcGoalSuggestions } from "./renderPromptSdlcGoalSuggestions";

describe("renderPromptSdlcGoalSuggestions", () => {
  it("escapes goal text and marks none of these", () => {
    const html = renderPromptSdlcGoalSuggestions({
      suggestKey: "abc123",
      options: ['Use only <facts> in "reply".'],
      promptFingerprint: "p",
      folderFingerprint: "f",
      judgeFingerprint: "j",
    });
    expect(html).toContain('data-suggest-key="abc123"');
    expect(html).toContain("&lt;facts&gt;");
    expect(html).toContain('value="none"');
    expect(html).not.toContain("checked");
  });
});
