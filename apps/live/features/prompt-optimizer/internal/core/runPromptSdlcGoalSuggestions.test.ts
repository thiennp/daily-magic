import { describe, expect, it, vi } from "vitest";

import { runPromptSdlcGoalSuggestions } from "./runPromptSdlcGoalSuggestions";

vi.mock("./runPromptSdlcWriterReply", () => ({
  runPromptSdlcWriterReply: vi.fn(),
}));

const { runPromptSdlcWriterReply } = await import("./runPromptSdlcWriterReply");

describe("runPromptSdlcGoalSuggestions", () => {
  it("rejects manual judge", async () => {
    const posted = new URLSearchParams({
      folder: process.cwd(),
      judge: "manual",
      improver: "manual",
    });
    const result = await runPromptSdlcGoalSuggestions({
      installedIds: ["cursor"],
      posted,
      prompt: "Do something.",
    });
    expect(result).toEqual({
      kind: "error",
      errorMessage: "Choose an installed judge writer to suggest goals.",
    });
  });

  it("parses writer JSON into options", async () => {
    vi.mocked(runPromptSdlcWriterReply).mockResolvedValue({
      ok: true,
      text: JSON.stringify({
        options: ["First measurable goal.", "Second measurable goal."],
      }),
      tokens: 10,
    });
    const posted = new URLSearchParams({
      folder: process.cwd(),
      judge: "cursor",
      improver: "cursor",
    });
    const result = await runPromptSdlcGoalSuggestions({
      installedIds: ["cursor"],
      posted,
      prompt: "Do something.",
    });
    expect(result.kind).toBe("options");
    if (result.kind === "options") {
      expect(result.options).toHaveLength(2);
      expect(result.promptFingerprint).toBe("Do something.");
    }
  });
});
