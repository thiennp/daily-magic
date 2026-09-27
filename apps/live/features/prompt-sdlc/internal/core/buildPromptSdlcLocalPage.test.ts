import { describe, expect, it } from "vitest";

import { buildPromptSdlcLocalPageBody } from "./buildPromptSdlcLocalPage";

describe("buildPromptSdlcLocalPageBody", () => {
  it("shows the chosen models and does not ask for a Mac or a model", () => {
    const html = buildPromptSdlcLocalPageBody({
      goal: "",
      prompt: "",
      modelNote: "Judge: Claude. Improver: Codex.",
      canRun: true,
      errorMessage: null,
      cycle: null,
      history: [],
    });

    expect(html).toContain("Judge: Claude. Improver: Codex.");
    expect(html).toContain("No runs yet.");
    expect(html).not.toContain("<select");
    expect(html).not.toContain('name="deviceId"');
  });
});
