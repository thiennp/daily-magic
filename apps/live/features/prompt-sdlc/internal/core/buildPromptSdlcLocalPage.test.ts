import { describe, expect, it } from "vitest";

import { buildPromptSdlcLocalCycleSection } from "./buildPromptSdlcLocalCycleSection";
import { buildPromptSdlcLocalPageBody } from "./buildPromptSdlcLocalPage";
import { createPromptSdlcLocalCycle } from "./createPromptSdlcLocalCycle";

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

  it("keeps a running cycle visibly working without reloading the page", () => {
    const cycle = createPromptSdlcLocalCycle({
      goal: "The reply stays inside the facts.",
      sourcePrompt: "Be helpful.",
      judgeModel: "claude-cli",
      improverModel: "codex",
    });
    const html = buildPromptSdlcLocalPageBody({
      goal: "",
      prompt: "",
      modelNote: "",
      canRun: true,
      errorMessage: null,
      cycle,
      history: [],
    });

    expect(html.indexOf("Claude is scoring round 1 of 3.")).toBeLessThan(
      html.indexOf("Optimize a prompt"),
    );
    expect(html).toContain('data-live="true"');
    expect(html).toContain("data-elapsed");
    expect(html).toContain("fragment");
    expect(html).not.toContain("location.reload");
    expect(buildPromptSdlcLocalCycleSection(cycle)).toContain(
      "the page is not stuck",
    );
  });

  it("explains a Codex terminal error instead of showing it as the revision", () => {
    const cycle = {
      ...createPromptSdlcLocalCycle({
        goal: "The reply stays inside the facts.",
        sourcePrompt: "Be helpful.",
        judgeModel: "claude-cli",
        improverModel: "codex",
      }),
      status: "stopped" as const,
      revisions: [
        {
          roundNumber: 1,
          promptText:
            "Reading additional input from stdin...\nNot inside a trusted directory and --skip-git-repo-check was not specified.",
          judgement: {
            score: 0,
            passed: false,
            reasons: "No prompt.",
            rawReply: "0",
          },
        },
      ],
    };
    const html = buildPromptSdlcLocalCycleSection(cycle);
    expect(html).toContain("did not return a prompt");
    expect(html).toContain("later scores are 0");
    expect(html).not.toContain("<pre");
  });
});
