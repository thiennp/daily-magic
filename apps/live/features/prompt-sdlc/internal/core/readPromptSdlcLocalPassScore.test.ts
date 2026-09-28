import { describe, expect, it } from "vitest";

import { decidePromptSdlcLocalPost } from "./decidePromptSdlcLocalPost";
import { describePromptSdlcLocalModels } from "./promptSdlcLocalForm";
import { readPromptSdlcLocalPassScore } from "./readPromptSdlcLocalPassScore";

describe("readPromptSdlcLocalPassScore", () => {
  it("keeps a whole number from 1 to 100 and rejects anything else", () => {
    expect(readPromptSdlcLocalPassScore("90")).toEqual({
      ok: true,
      passScore: 90,
    });
    expect(readPromptSdlcLocalPassScore("0").ok).toBe(false);
    expect(readPromptSdlcLocalPassScore("101").ok).toBe(false);
    expect(readPromptSdlcLocalPassScore("9.5").ok).toBe(false);
  });

  it("starts a run with the posted pass score", () => {
    const selection = describePromptSdlcLocalModels(["claude-cli"]);
    const decision = decidePromptSdlcLocalPost({
      posted: new URLSearchParams({
        intent: "run",
        goal: "Stay in the facts.",
        prompt: "Be helpful.",
        folder: "~",
        passScore: "75",
        judge: "claude-cli",
        improver: "claude-cli",
      }),
      installedIds: ["claude-cli"],
      selection,
      goal: "Stay in the facts.",
      prompt: "Be helpful.",
      pickFolder: () => null,
    });

    expect(decision.kind).toBe("start");
    if (decision.kind === "start") {
      expect(decision.passScore).toBe(75);
      expect(decision.maxRounds).toBe(10);
    }
  });
});
