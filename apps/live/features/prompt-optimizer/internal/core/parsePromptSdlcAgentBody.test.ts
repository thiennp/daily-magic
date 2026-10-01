import { describe, expect, it } from "vitest";

import { PROMPT_SDLC_AGENT_BODY_ERROR } from "../../../../adapters/promptSdlcAwcCore";
import { parsePromptSdlcAgentBody } from "./parsePromptSdlcAgentBody";

describe("parsePromptSdlcAgentBody", () => {
  it("reads a prompt that should run in a project folder", () => {
    const parsed = parsePromptSdlcAgentBody(
      JSON.stringify({
        goal: "Answer from the repo",
        prompt: "Summarize the open bug",
        workingDirectory: "/tmp/repo",
        judge: "claude-cli",
        improver: "codex",
        passScore: 90,
      }),
    );

    expect(parsed).toEqual({
      ok: true,
      body: {
        goal: "Answer from the repo",
        prompt: "Summarize the open bug",
        workingDirectory: "/tmp/repo",
        judge: "claude-cli",
        improver: "codex",
        passScore: "90",
        maxRounds: null,
        maxTrials: null,
        maxSpendUsd: null,
        earlyStop: null,
        earlyStopFlatRounds: null,
        confirmedTokenBudget: null,
        confirmedMaxSpendUsd: null,
        rateUsdPer1kTokens: null,
      },
    });
  });

  it("allows the caller to omit writers and the pass score", () => {
    const parsed = parsePromptSdlcAgentBody(
      JSON.stringify({
        goal: "Stay in the facts",
        prompt: "Reply to the customer",
        workingDirectory: "  ~/repo  ",
      }),
    );

    expect(parsed.ok && parsed.body.judge).toBe(null);
    expect(parsed.ok && parsed.body.improver).toBe(null);
    expect(parsed.ok && parsed.body.passScore).toBe(null);
    expect(parsed.ok && parsed.body.maxRounds).toBe(null);
    expect(parsed.ok && parsed.body.maxTrials).toBe(null);
    expect(parsed.ok && parsed.body.confirmedTokenBudget).toBe(null);
    expect(parsed.ok && parsed.body.workingDirectory).toBe("~/repo");
  });

  it("rejects a body that is not the project folder contract", () => {
    expect(parsePromptSdlcAgentBody("not-json")).toEqual({
      ok: false,
      error: "Send a JSON object.",
    });
    expect(parsePromptSdlcAgentBody(JSON.stringify({ goal: "only" }))).toEqual({
      ok: false,
      error: PROMPT_SDLC_AGENT_BODY_ERROR,
    });
    expect(
      parsePromptSdlcAgentBody(
        JSON.stringify({
          goal: "Goal",
          prompt: "Prompt",
          workingDirectory: "  ",
        }),
      ),
    ).toEqual({
      ok: false,
      error: PROMPT_SDLC_AGENT_BODY_ERROR,
    });
  });
});
