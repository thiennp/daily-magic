import { describe, expect, it } from "vitest";

import {
  appendOperatorCheckpointsToPrompt,
  buildOperatorCheckpointPromptSection,
} from "@/lib/workflows/buildOperatorCheckpointPromptSection";
import { buildWorkflowPrompt } from "@/lib/workflows/buildWorkflowPrompt";

describe("buildOperatorCheckpointPromptSection", () => {
  it("returns empty text when there are no operator steps", () => {
    expect(buildOperatorCheckpointPromptSection([])).toBe("");
    expect(appendOperatorCheckpointsToPrompt("Run task", [])).toBe("Run task");
  });

  it("appends checkpoint titles for the Mac agent", () => {
    const section = buildOperatorCheckpointPromptSection([
      {
        id: "op-1",
        title: "Prepare browser",
        content: "Open the page.",
      },
    ]);

    expect(section).toContain("Human operator checkpoints:");
    expect(section).toContain("Prepare browser");
    expect(section).toContain("[[AWAITING_INPUT]]");
  });
});

describe("buildWorkflowPrompt", () => {
  it("includes operator checkpoints without duplicating full human copy", () => {
    const prompt = buildWorkflowPrompt(
      "Weekly report",
      [{ key: "week", label: "Week of", type: "text", required: true }],
      { week: "2026-07-14" },
      "Keep it short.",
      [
        {
          id: "op-1",
          title: "Prepare browser",
          content: "Open the page and log in before sending.",
        },
      ],
    );

    expect(prompt).toContain("Run workflow: Weekly report");
    expect(prompt).toContain("Prepare browser");
    expect(prompt).not.toContain("Open the page and log in");
  });
});
