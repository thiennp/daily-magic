import { describe, expect, it } from "vitest";

import { buildPromptSdlcLocalCycleSection } from "./buildPromptSdlcLocalCycleSection";
import { buildPromptSdlcLocalGuidePageBody } from "./buildPromptSdlcLocalGuidePage";
import { buildPromptSdlcLocalPageBody } from "./buildPromptSdlcLocalPage";
import { createPromptSdlcLocalCycle } from "./createPromptSdlcLocalCycle";
import { promptSdlcLocalHistoryTitle } from "./promptSdlcLocalHistoryTitle";

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
      passScore: "90",
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
      judge: "",
      improver: "",
      folder: "~",
      passScore: "90",
      canRun: true,
      errorMessage: null,
      cycle: null,
      history: [],
    });

    expect(html).toContain("Choose which writers run this prompt.");
    expect(html).toContain('name="judge"');
    expect(html).toContain('name="improver"');
    expect(html).toContain('value="" selected');
    expect(html).toContain("Choose a writer.");
    expect(html).not.toContain('value="claude-cli" selected');
    expect(html).not.toContain('value="codex" selected');
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
      passScore: "90",
      canRun: true,
      errorMessage: null,
      cycle,
      history: [],
    });

    expect(html.indexOf("Claude is scoring round 1 of 3.")).toBeLessThan(
      html.indexOf("Optimize a prompt"),
    );
    expect(html).toContain("What the score means");
    expect(html).toContain("0–44 bad");
    expect(html).toContain("90–100 passes");
    expect(html).toContain('name="passScore"');
    expect(html).toContain('value="90"');
    expect(html).toContain('class="sdlc-tree"');
    expect(html).toContain("sdlc-node-done");
    expect(html).toContain("sdlc-node-active");
    expect(html).toContain("Source prompt saved");
    expect(html).toContain("score for round 0...");
    expect(html).not.toContain("  |");
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
    expect(html).toContain("0 / 100 (bad)");
    expect(html).not.toContain('<pre class="mono">');
  });

  it("shows a short history title and an instruction page that can run the sample", () => {
    const goal =
      "When this prompt is used on a customer email, the reply answers the question they asked.";
    const cycle = createPromptSdlcLocalCycle({
      goal,
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
      passScore: "90",
      canRun: true,
      errorMessage: null,
      cycle: null,
      history: [cycle],
    });
    const guide = buildPromptSdlcLocalGuidePageBody();

    expect(promptSdlcLocalHistoryTitle(goal)).toBe(
      "When this prompt is used on a customer email",
    );
    expect(html).toContain('class="sdlc-history"');
    expect(html).toContain('value="delete-history"');
    expect(html).toContain(">Delete<");
    expect(html).toContain("When this prompt is used on a customer email");
    expect(html).not.toContain(goal);
    expect(html).toContain('href="/prompt-sdlc/guide"');
    expect(guide).toContain("How Prompt SDLC works");
    expect(guide).toContain("Run this sample");
    expect(guide).toContain('name="intent" value="run"');
    expect(guide).toContain("CUSTOMER_MESSAGE");
  });
});
