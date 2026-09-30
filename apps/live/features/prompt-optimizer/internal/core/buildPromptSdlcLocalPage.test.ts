import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { buildPromptSdlcLocalCycleSection } from "./buildPromptSdlcLocalCycleSection";
import { buildPromptSdlcLocalGuidePageBody } from "./buildPromptSdlcLocalGuidePage";
import { buildPromptSdlcLocalPageBody } from "./buildPromptSdlcLocalPage";
import { createInitialPromptSdlcWizardState } from "../../../../adapters/promptSdlcAwcCore";
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

    expect(html).toContain("prompt-optimizer-compose-details");
    expect(html.indexOf('class="sdlc-form"')).toBeLessThan(
      html.indexOf("prompt-optimizer-wizard-gate-slot"),
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
    expect(html).toContain('name="judgeInstructions"');
    expect(html).toContain('name="improverInstructions"');
    expect(html).toContain("Judge and improver");
    expect(html).toContain("Classic loop options");
    expect(html).toContain("sdlc-wizard-limits-callout");
    expect(html).toContain("Run starts the wizard");
    expect(html).toContain("Classic loop skips the wizard");
    expect(html.match(/class="sdlc-tip"/g)?.length).toBe(12);
    expect(html).toContain("Module runner");
    expect(html).toContain('name="runner"');
    expect(html).toContain('data-writer-status="runner"');
    expect(html).toContain('name="runnerInstructions"');
    expect(html).toContain("data-sdlc-run-hint");
    expect(html).toContain('value="run-classic"');
    expect(html).toContain('name="intent" value="run"');
    expect(html).toContain(
      "If the prompt needs an input, put that input here.",
    );
    expect(html).toContain("How to use Goal");
    expect(html).toContain("How to use Round limit");
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

    expect(html).toContain("Instructions are optional.");
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

    expect(html.indexOf("Optimize a prompt")).toBeLessThan(
      html.indexOf("Claude is running the prompt for round 1."),
    );
    expect(html.indexOf('id="prompt-optimizer-run"')).toBeLessThan(
      html.indexOf('id="prompt-optimizer-wizard-gate-slot"'),
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
    expect(html).toContain('type="number" name="maxRounds"');
    expect(html).toContain('value="10"');
    expect(html).toContain('name="intent" value="stop"');
    expect(html).toContain(">Stop run<");
    expect(html).toContain("This run is marked complete.");
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
    expect(html).toContain('class="sdlc-run-meta"');
    expect(html).toContain('class="sdlc-run-meta-label">Folder</span>');
    expect(html).toContain(" ~</li>");
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

  it("opens a saved prompt from a timeline node and offers the best prompt as a skill", () => {
    const cycle = {
      ...createPromptSdlcLocalCycle({
        goal: "The reply stays inside the facts.",
        sourcePrompt: "Be helpful.",
        judgeModel: "claude-cli" as const,
        improverModel: "codex" as const,
      }),
      status: "passed" as const,
      revisions: [
        {
          roundNumber: 0,
          promptText: "Be helpful.",
          judgement: {
            score: 40,
            passed: false,
            reasons: "Too vague.",
            rawReply: "40",
          },
        },
        {
          roundNumber: 1,
          promptText:
            "Answer only from the ticket, and stop when a fact is missing.",
          judgement: {
            score: 94,
            passed: true,
            reasons: "It names the stop.",
            rawReply: "94",
          },
        },
      ],
    };
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

    expect(html).toContain("data-sdlc-node");
    expect(html).toContain('id="sdlc-node-dialog"');
    expect(html).toContain("Be helpful.");
    expect(html).toContain("Too vague.");
    expect(html).toContain('id="prompt-optimizer-best"');
    expect(html).toContain("Round 1 · Score 94 / 100");
    expect(html).toContain(
      "Answer only from the ticket, and stop when a fact is missing.",
    );
    expect(html).toContain('value="save-skill"');
    expect(html).toContain('name="skillName"');
    expect(html).toContain('value="the-reply-stays-inside-the-facts"');
    expect(html).toContain('name="skillDescription"');
    expect(html).toContain("The reply stays inside the facts.");
    expect(html).toContain('name="skillPrompt"');
    expect(html).toContain('name="skillFileName"');
    expect(html).toContain("Optional.");
  });

  it("lists skills in the chosen folder so one can fill the prompt", () => {
    const folder = fs.mkdtempSync(path.join(os.tmpdir(), "prompt-sdlc-list-"));
    const skillDir = path.join(folder, ".cursor", "skills", "support-reply");
    fs.mkdirSync(skillDir, { recursive: true });
    fs.writeFileSync(
      path.join(skillDir, "SKILL.md"),
      '---\nname: "Support reply"\ndescription: "Answer the customer"\n---\n\nAnswer the question they asked.\n',
      "utf8",
    );

    const html = buildPromptSdlcLocalPageBody({
      goal: "",
      prompt: "",
      modelNote: "",
      writers: [],
      judge: "",
      improver: "",
      folder,
      passScore: "90",
      canRun: true,
      errorMessage: null,
      cycle: null,
      history: [],
    });

    expect(html).toContain('name="skillFile"');
    expect(html).toContain('value="support-reply"');
    expect(html).toContain("Answer the question they asked.");
    expect(html).toContain("Fills the prompt from that skill.");
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
    expect(html).toContain('href="/prompt-optimizer/guide"');
    expect(guide).toContain("How the prompt optimizer works");
    expect(guide).toContain("four-step wizard");
    expect(guide).toContain("Classic loop");
    expect(guide).toContain("Run this sample");
    expect(guide).toContain(
      `href="/prompt-optimizer?example=${PROMPT_SDLC_LOCAL_GUIDE_EXAMPLE}"`,
    );
    expect(guide).not.toContain('name="intent" value="run"');
    expect(guide).toContain("CUSTOMER_MESSAGE");
    expect(guide).toContain("Stop run");
    expect(guide).toContain("tokens spent");
  });

  it("asks for a score of the output when the judge is you", () => {
    const cycle = {
      ...createPromptSdlcLocalCycle({
        goal: "Stay in the facts.",
        sourcePrompt: "Be helpful.",
        judgeModel: "manual",
        improverModel: "codex",
      }),
      revisions: [
        {
          roundNumber: 0,
          promptText: "Be helpful.",
          judgement: null,
          run: {
            output: "The ticket has no refund.",
            tokens: 80,
            delayMs: 1500,
          },
        },
      ],
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
    expect(html).toContain("The ticket has no refund.");
    expect(html).toContain("Tokens used: 80");
    expect(html).toContain("Delay: 1.5s");
    expect(html).toContain(
      "Score the changes below. Weigh the tokens and the delay.",
    );
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
    const improveForm = html.indexOf('intent" value="manual-improve"');
    const verdictAt = html.indexOf("sdlc-manual-verdict", improveForm);
    const manualPromptAt = html.indexOf('name="prompt"', verdictAt);
    expect(verdictAt).toBeGreaterThan(improveForm);
    expect(verdictAt).toBeLessThan(manualPromptAt);
  });

  it("shows a resume banner when another wizard run is paused", () => {
    const paused = {
      ...createPromptSdlcLocalCycle({
        goal: "Resume this wizard run.",
        sourcePrompt: "Be helpful.",
        judgeModel: "claude-cli" as const,
        improverModel: "codex" as const,
      }),
      status: "wizard_paused" as const,
      wizard: {
        ...createInitialPromptSdlcWizardState("Be helpful."),
        gate: "evaluate" as const,
        phase: "evaluate" as const,
      },
    };
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
      history: [],
      resumableWizardCycle: paused,
    });

    expect(html).toContain("Resume wizard");
    expect(html).toContain(`cycle=${paused.id}`);
  });

  it("shows the tokens spent through each scored round", () => {
    const running = {
      ...createPromptSdlcLocalCycle({
        goal: "Stay in the facts.",
        sourcePrompt: "Be helpful.",
        judgeModel: "claude-cli" as const,
        improverModel: "codex" as const,
      }),
      status: "improving" as const,
      revisions: [
        {
          roundNumber: 0,
          promptText: "Be helpful.",
          judgement: {
            score: 40,
            passed: false,
            reasons: "Thin.",
            rawReply: "{}",
            tokens: 1_500,
          },
        },
      ],
    };
    const finished = {
      ...running,
      status: "stopped" as const,
      errorMessage: "Finished. The best prompt is the result.",
    };
    const runningHtml = buildPromptSdlcLocalCycleSection(running);
    const finishedHtml = buildPromptSdlcLocalCycleSection(finished);

    expect(runningHtml).toContain("sdlc-run-meta");
    expect(runningHtml).toContain("1,500 so far");
    expect(runningHtml).toContain("1,500 tokens so far");
    expect(runningHtml).toContain(">Stop run<");
    expect(finishedHtml).toContain("Finished.");
    expect(finishedHtml).toContain("Finished");
    expect(finishedHtml).not.toContain(">Finish<");
  });

  it("orders THIS RUN before collapsed History when viewing a cycle", () => {
    const cycle = {
      ...createPromptSdlcLocalCycle({
        goal: "Goal",
        sourcePrompt: "p",
        judgeModel: "claude-cli",
        improverModel: "claude-cli",
        wizard: {
          ...createInitialPromptSdlcWizardState("p"),
          gate: null,
          phase: "complete",
          modules: [
            {
              moduleId: "m1",
              title: "Main",
              prompt: "p",
              status: "passed",
              selectedRevisionRound: 0,
              statistics: {
                bestScore: 80,
                bestRound: 0,
                bestRunOutput: "out",
                rounds: [
                  {
                    roundNumber: 0,
                    score: 80,
                    passed: true,
                    runOutput: "out",
                    tokens: 1,
                  },
                ],
              },
            },
          ],
        },
      }),
      id: "open-cycle",
      status: "stopped" as const,
    };
    const html = buildPromptSdlcLocalPageBody({
      goal: "",
      prompt: "",
      modelNote: "",
      writers: [{ id: "claude-cli", label: "Claude" }],
      judge: "claude-cli",
      improver: "claude-cli",
      folder: "~",
      passScore: "90",
      canRun: true,
      errorMessage: null,
      cycle,
      history: [cycle],
    });
    expect(html.indexOf("prompt-optimizer-wizard-module-results")).toBeLessThan(
      html.indexOf("prompt-optimizer-wizard-outcome"),
    );
    expect(html.indexOf("prompt-optimizer-run")).toBeLessThan(
      html.indexOf("prompt-optimizer-history"),
    );
    expect(html).toContain("data-sdlc-start-new-run");
    expect(html.match(/id="prompt-optimizer-wizard-outcome"/g)?.length).toBe(1);
    expect(html).toContain("prompt-optimizer-history");
    expect(html).toContain("Wizard finished");
    expect(html).toContain("Review settings");
    expect(html).toContain("prompt-optimizer-wizard-module-results");
    expect(html).toContain("Copy all prompts (Markdown)");
    expect(html).toContain('id="sdlc-run-toast"');
    expect(html).toContain("#prompt-optimizer-wizard-module-results");
    expect(html).toContain("4/4 wizard steps complete");
    expect(html).not.toContain("data-sdlc-jump-wizard-results");
    expect(html).toContain("New prompt");
    expect(html).toContain("sdlc-run-success-actions");
    expect(html).toContain("Download report (.md)");
    expect(html).not.toContain("sdlc-wizard-accordion");
  });
});
