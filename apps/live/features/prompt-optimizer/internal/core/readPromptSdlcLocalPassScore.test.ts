import { describe, expect, it } from "vitest";

import {
  PROMPT_SDLC_WIZARD_MAX_ROUNDS,
  PROMPT_SDLC_WIZARD_MODULE_PASS_SCORE,
  PROMPT_SDLC_WIZARD_PASS_SCORE,
} from "../../../../adapters/promptSdlcAwcCore";
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

  it("uses wizard defaults when pass score fields are empty on run", () => {
    const selection = describePromptSdlcLocalModels(["claude-cli"]);
    const decision = decidePromptSdlcLocalPost({
      posted: new URLSearchParams({
        intent: "run",
        goal: "Stay in the facts.",
        prompt: "Be helpful.",
        folder: "~",
        passScore: "",
        modulePassScore: "",
        judge: "claude-cli",
        improver: "claude-cli",
        runner: "claude-cli",
      }),
      installedIds: ["claude-cli"],
      selection,
      goal: "Stay in the facts.",
      prompt: "Be helpful.",
      pickFolder: () => null,
    });

    expect(decision.kind).toBe("start");
    if (decision.kind === "start") {
      expect(decision.passScore).toBe(PROMPT_SDLC_WIZARD_PASS_SCORE);
      expect(decision.modulePassScore).toBe(
        PROMPT_SDLC_WIZARD_MODULE_PASS_SCORE,
      );
    }
  });

  it("starts a wizard run with wizard pass score and max rounds", () => {
    const selection = describePromptSdlcLocalModels(["claude-cli"]);
    const decision = decidePromptSdlcLocalPost({
      posted: new URLSearchParams({
        intent: "run",
        goal: "Stay in the facts.",
        prompt: "Be helpful.",
        folder: "~",
        passScore: "75",
        modulePassScore: "88",
        judge: "claude-cli",
        improver: "claude-cli",
        runner: "claude-cli",
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
      expect(decision.modulePassScore).toBe(88);
      expect(decision.maxRounds).toBe(PROMPT_SDLC_WIZARD_MAX_ROUNDS);
      expect(decision.runner).toBe("claude-cli");
    }
  });
});
