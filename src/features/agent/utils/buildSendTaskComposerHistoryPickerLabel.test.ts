import { describe, expect, it } from "vitest";

import { buildSendTaskComposerHistoryPickerLabel } from "@/features/agent/utils/buildSendTaskComposerHistoryPickerLabel";

describe("buildSendTaskComposerHistoryPickerLabel", () => {
  it("returns a fallback when the prompt is blank", () => {
    expect(buildSendTaskComposerHistoryPickerLabel("   ")).toBe(
      "Previous task",
    );
  });

  it("keeps short prompts intact after collapsing whitespace", () => {
    expect(buildSendTaskComposerHistoryPickerLabel("  hello\nworld  ")).toBe(
      "hello world",
    );
  });

  it("truncates long prompts with an ellipsis", () => {
    const prompt = "a".repeat(80);
    expect(buildSendTaskComposerHistoryPickerLabel(prompt, 20)).toBe(
      `${"a".repeat(19)}…`,
    );
  });
});
