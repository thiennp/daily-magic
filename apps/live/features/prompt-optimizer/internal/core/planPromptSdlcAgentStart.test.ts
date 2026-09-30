import { describe, expect, it } from "vitest";

import {
  PROMPT_SDLC_MAX_ROUNDS,
  PROMPT_SDLC_PASS_SCORE,
} from "../../../../adapters/promptSdlcAwcCore";
import { planPromptSdlcAgentStart } from "./planPromptSdlcAgentStart";

describe("planPromptSdlcAgentStart", () => {
  it("uses classic defaults 90/10 when body omits pass score and max rounds", () => {
    const plan = planPromptSdlcAgentStart({
      body: {
        goal: "Test",
        prompt: "Do the thing",
        workingDirectory: "/tmp",
        judge: null,
        improver: null,
        passScore: null,
        maxRounds: null,
      },
      installedIds: ["codex"],
    });
    expect(plan).toMatchObject({
      ok: true,
      passScore: PROMPT_SDLC_PASS_SCORE,
      maxRounds: PROMPT_SDLC_MAX_ROUNDS,
    });
  });

  it("keeps custom pass score and max rounds from the agent body", () => {
    const plan = planPromptSdlcAgentStart({
      body: {
        goal: "Test",
        prompt: "Do the thing",
        workingDirectory: "/tmp",
        judge: null,
        improver: null,
        passScore: "85",
        maxRounds: "3",
      },
      installedIds: ["codex"],
    });
    expect(plan).toMatchObject({
      ok: true,
      passScore: 85,
      maxRounds: 3,
    });
  });
});
