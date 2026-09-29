import { describe, expect, it } from "vitest";

import { PROMPT_SDLC_GOAL_MAX_LENGTH } from "@/lib/promptOptimizer/promptSdlcLimits.constant";
import { validatePromptSdlcStart } from "@/lib/promptOptimizer/validatePromptSdlcStart";

const ollama = { kind: "ollama" as const, model: "qwen2.5:7b" };
const cursor = { kind: "writer" as const, writerAgent: "cursor" as const };
const cloud = { kind: "writer" as const, writerAgent: "cursor-cloud" as const };

describe("validatePromptSdlcStart", () => {
  it("requires text, a length cap, and a Mac only for a local writer", () => {
    expect(
      validatePromptSdlcStart({
        goal: "  ",
        sourcePrompt: "prompt",
        deviceId: null,
        judge: ollama,
        improver: ollama,
      }),
    ).toBe("Add a goal and a prompt.");

    expect(
      validatePromptSdlcStart({
        goal: "g".repeat(PROMPT_SDLC_GOAL_MAX_LENGTH + 1),
        sourcePrompt: "prompt",
        deviceId: null,
        judge: ollama,
        improver: ollama,
      }),
    ).toBe("The goal or prompt is too long.");

    expect(
      validatePromptSdlcStart({
        goal: "goal",
        sourcePrompt: "prompt",
        deviceId: null,
        judge: cursor,
        improver: cursor,
      }),
    ).toBe("Choose a Mac for the writer.");

    expect(
      validatePromptSdlcStart({
        goal: "goal",
        sourcePrompt: "prompt",
        deviceId: null,
        judge: cloud,
        improver: ollama,
      }),
    ).toBe(
      "The prompt optimizer uses reasoning models only: Claude, Codex, Cursor, Antigravity, or Cursor Cloud.",
    );

    expect(
      validatePromptSdlcStart({
        goal: "goal",
        sourcePrompt: "prompt",
        deviceId: "mac-1",
        judge: cursor,
        improver: cloud,
      }),
    ).toBeNull();
  });
});
