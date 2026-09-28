import { describe, expect, it } from "vitest";

import { buildPromptSdlcLocalCycleSection } from "./buildPromptSdlcLocalCycleSection";
import { buildPromptSdlcLocalPageBody } from "./buildPromptSdlcLocalPage";
import { createPromptSdlcLocalCycle } from "./createPromptSdlcLocalCycle";

describe("buildPromptSdlcLocalPageBody", () => {
  it("shows the chosen models and does not ask for a Mac or a model", () => {
    const html = buildPromptSdlcLocalPageBody({
      goal: "",
      prompt: "",
      modelNote: "Judge: Claude. Improver: Claude.",
      writers: [{ id: "claude-cli", label: "Claude" }],
      judge: "claude-cli",
      improver: "claude-cli",
      folder: "~",
      canRun: true,
      errorMessage: null,
      cycle: null,
      history: [],
    });

    expect(html.indexOf('class="sdlc-form"')).toBeLessThan(
      html.indexOf("scrollHeight"),
    );
    expect(html).toContain("Judge: Claude. Improver: Claude.");
    expect(html).toContain("No runs yet.");
    expect(html).toContain('name="folder"');
    expect(html).toContain('value="~"');
    expect(html).toContain("Choose folder");
    expect(html).not.toContain("<select");
    expect(html).not.toContain('name="deviceId"');
  });

  it("lets the user choose the judge and improver when several writers are installed", () => {
    const html = buildPromptSdlcLocalPageBody({
      goal: "",
      prompt: "",
      modelNote: "Installed: Claude, Codex.",
      writers: [
        { id: "claude-cli", label: "Claude" },
        { id: "codex", label: "Codex" },
      ],
      judge: "claude-cli",
      improver: "codex",
      folder: "~",
      canRun: true,
      errorMessage: null,
      cycle: null,
      history: [],
    });

    expect(html).toContain("Choose which writers run this prompt.");
    expect(html).toContain('name="judge"');
    expect(html).toContain('name="improver"');
    expect(html).toContain('value="claude-cli" selected');
    expect(html).toContain('value="codex" selected');
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
      writers: [],
      judge: "",
      improver: "",
      folder: "~",
      canRun: true,
      errorMessage: null,
      cycle,
      history: [],
    });

    expect(html.indexOf("Claude is scoring round 1 of 3.")).toBeLessThan(
      html.indexOf("Optimize a prompt"),
    );
    expect(html).toContain("Folder ~");
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
