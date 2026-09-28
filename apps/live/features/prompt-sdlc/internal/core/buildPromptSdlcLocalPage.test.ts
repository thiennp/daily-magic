import { describe, expect, it } from "vitest";

import { buildPromptSdlcLocalCycleSection } from "./buildPromptSdlcLocalCycleSection";
import { buildPromptSdlcLocalGuidePageBody } from "./buildPromptSdlcLocalGuidePage";
import { buildPromptSdlcLocalPageBody } from "./buildPromptSdlcLocalPage";
import { createPromptSdlcLocalCycle } from "./createPromptSdlcLocalCycle";
import { PROMPT_SDLC_LOCAL_GUIDE_EXAMPLE } from "./promptSdlcLocalGuide.constant";
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
    expect(html.indexOf('class="sdlc-form"')).toBeLessThan(
      html.indexOf("No runs yet."),
    );
    expect(html).toContain('name="folder"');
    expect(html).toContain('value="~"');
    expect(html).toContain("Choose folder");
    expect(html).toContain("I'll score it");
    expect(html).toContain("I'll rewrite it");
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

    expect(html).toContain("Choose who scores the prompt and who rewrites it.");
    expect(html).toContain("I'll score it");
    expect(html).toContain("I'll rewrite it");
    expect(html).toContain("Choose who does this step.");
    expect(html).not.toContain('value="claude-cli" selected');
    expect(html).not.toContain('value="codex" selected');
    expect(html).not.toContain('name="deviceId"');
    expect(html).not.toContain('fieldset class="sdlc-fields" disabled');
    expect(html).toContain("sdlc-writers");
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
      cycle,
      history: [],
    });

    expect(html.indexOf("Claude is scoring round 1 of 3.")).toBeLessThan(
      html.indexOf("Optimize a prompt"),
    );
    expect(html).toContain("The reply stays inside the facts.");
    expect(html).toContain("Be helpful.");
    expect(html).toContain('value="claude-cli" selected');
    expect(html).toContain('value="codex" selected');
    expect(html).toContain('fieldset class="sdlc-fields" disabled');
    expect(html).toContain("This run is using these choices.");
    expect(html).toContain("Running…");
    expect(html).toContain("What the score means");
    expect(html).toContain("0–44 bad");
    expect(html).toContain("90–100 passes");
    expect(html).toContain('type="range" name="passScore"');
    expect(html).toContain('value="90"');
    expect(html).toContain("sdlc-pass-range");
    expect(html).toContain("sdlc-pass-bar");
    expect(html).toContain("The bar fades from a weak score to a pass.");
    expect(html).toContain("The mark is the usual 90.");
    expect(html).toContain(
      "0–44 bad · 45–69 weak · 70–89 close · 90–100 passes",
    );
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
    const finished = buildPromptSdlcLocalPageBody({
      goal: "",
      prompt: "",
      modelNote: "",
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
      cycle: { ...cycle, status: "passed" },
      history: [],
    });
    expect(finished).toContain("The reply stays inside the facts.");
    expect(finished).toContain("Be helpful.");
    expect(finished).toContain('value="claude-cli" selected');
    expect(finished).not.toContain('fieldset class="sdlc-fields" disabled');
    expect(finished).toContain(">Run<");
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
    expect(html).toContain("No prompt.");
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
    expect(guide).toContain(
      `href="/prompt-sdlc?example=${PROMPT_SDLC_LOCAL_GUIDE_EXAMPLE}"`,
    );
    expect(guide).not.toContain('name="intent" value="run"');
    expect(guide).toContain("CUSTOMER_MESSAGE");
  });

  it("asks for a score and a reason when the judge is you", () => {
    const cycle = {
      ...createPromptSdlcLocalCycle({
        goal: "Stay in the facts.",
        sourcePrompt: "Be helpful.",
        judgeModel: "manual",
        improverModel: "codex",
      }),
    };
    const html = buildPromptSdlcLocalPageBody({
      goal: "",
      prompt: "",
      modelNote: "",
      writers: [{ id: "codex", label: "Codex" }],
      judge: "manual",
      improver: "codex",
      folder: "~",
      passScore: "90",
      canRun: true,
      errorMessage: null,
      cycle,
      history: [],
    });

    expect(html).toContain("Save score");
    expect(html).toContain("Waiting for you");
    expect(html).toContain('name="reasons"');
    expect(html).toContain("Add a score from 0 to 100 and the reason");
    expect(html).toContain('fieldset class="sdlc-fields" disabled');
    expect(html).not.toContain('data-live="true"');
  });

  it("shows the score and the reason on the rewrite step", () => {
    const cycle = {
      ...createPromptSdlcLocalCycle({
        goal: "Stay in the facts.",
        sourcePrompt: "Be helpful.",
        judgeModel: "claude-cli",
        improverModel: "manual",
      }),
      status: "improving" as const,
      revisions: [
        {
          roundNumber: 0,
          promptText: "Be helpful.",
          judgement: {
            score: 40,
            passed: false,
            reasons: "The prompt never names the facts it may use.",
            rawReply: '{"score":40}',
          },
        },
      ],
    };
    const html = buildPromptSdlcLocalPageBody({
      goal: "",
      prompt: "",
      modelNote: "",
      writers: [{ id: "claude-cli", label: "Claude" }],
      judge: "claude-cli",
      improver: "manual",
      folder: "~",
      passScore: "90",
      canRun: true,
      errorMessage: null,
      cycle,
      history: [],
    });

    expect(html).toContain(
      "Score 40 / 100. The prompt never names the facts it may use.",
    );
    expect(html).toContain("Save revision");
    expect(html.indexOf("sdlc-manual-verdict")).toBeLessThan(
      html.indexOf('name="prompt"'),
    );
  });
});
