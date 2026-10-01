import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it, vi } from "vitest";

import { createInitialPromptSdlcWizardState } from "../../../../adapters/promptSdlcAwcCore";
import { tryAcceptPromptSdlcWizardPost } from "./acceptPromptSdlcWizardPost";
import { buildPromptSdlcLocalPageBody } from "./buildPromptSdlcLocalPage";
import { createPromptSdlcLocalCycle } from "./createPromptSdlcLocalCycle";
import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";
import { ensurePromptSdlcLocalCycleRunning } from "./runPromptSdlcLocalCycle";
import * as writerReply from "./runPromptSdlcWriterReply";
import {
  readPromptSdlcLocalCycle,
  savePromptSdlcLocalCycle,
} from "./promptSdlcLocalStore";

const ARTIFACTS_ROOT = "/opt/cursor/artifacts";

const canWriteUnderArtifactsRoot = (): boolean => {
  try {
    fs.mkdirSync(ARTIFACTS_ROOT, { recursive: true });
    const probe = path.join(ARTIFACTS_ROOT, `.write-probe-${process.pid}`);
    fs.writeFileSync(probe, "");
    fs.unlinkSync(probe);
    return true;
  } catch {
    return false;
  }
};

/** Prefer walkthrough artifacts when writable; otherwise use a temp install dir. */
export const resolveWizardFullRoundInstallDir = (): string => {
  if (canWriteUnderArtifactsRoot()) {
    return path.join(ARTIFACTS_ROOT, "awl-wizard-full-round");
  }
  return fs.mkdtempSync(path.join(os.tmpdir(), "awl-wizard-full-round-"));
};

const COMPLEX_GOAL =
  "Draft tier-2 EU support replies: cite only approved policy snippets, never promise legal outcomes, and escalate billing disputes above €500 to a human.";

const COMPLEX_SOURCE =
  "Be helpful with billing email. Mention refunds if asked. Do not invent policy or legal advice.";

const COMPLEX_TEMPLATE =
  "You are {{brand}} support tier {{tier}}. Customer locale: {{locale}}. Issue: {{issue}}. Use only these facts: {{policy_facts}}. If {{escalation_trigger}} is true, output ESCALATE and stop.";

const COMPLEX_VARIABLES = [
  {
    name: "brand",
    description: "Product name shown to the customer",
    sampleValue: "Agent Witch Cloud",
  },
  {
    name: "tier",
    description: "Support tier (1 or 2)",
    sampleValue: "2",
  },
  {
    name: "locale",
    description: "BCP-47 locale for tone",
    sampleValue: "de-DE",
  },
  {
    name: "issue",
    description: "Redacted ticket summary",
    sampleValue: "VAT invoice mismatch on annual plan",
  },
  {
    name: "policy_facts",
    description: "Bullet list from the knowledge base",
    sampleValue:
      "14-day refund window; no backdated credits; EU consumer rights disclaimer required",
  },
  {
    name: "escalation_trigger",
    description: "Whether human handoff is mandatory",
    sampleValue: "false",
  },
];

const waitUntil = async (
  predicate: () => boolean,
  label: string,
): Promise<void> => {
  for (let attempt = 0; attempt < 160; attempt += 1) {
    if (predicate()) {
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, 25));
  }
  throw new Error(`timed out: ${label}`);
};

const noopResponse = {
  writeHead: () => undefined,
  end: () => undefined,
};

const snapshotCycle = (
  storePath: string,
  snapshotId: string,
  cycle: PromptSdlcLocalCycle,
): void => {
  savePromptSdlcLocalCycle(storePath, { ...cycle, id: snapshotId });
};

const pageBody = (installDir: string, cycle: PromptSdlcLocalCycle): string =>
  buildPromptSdlcLocalPageBody({
    goal: COMPLEX_GOAL,
    prompt: "",
    modelNote: "",
    writers: [{ id: "claude-cli", label: "Claude" }],
    judge: "claude-cli",
    improver: "claude-cli",
    folder: installDir,
    passScore: "70",
    modulePassScore: "90",
    canRun: true,
    errorMessage: null,
    cycle,
    history: [],
  });

describe("prompt SDLC wizard full round proof (for screenshots)", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("runs all four gates with a complex EU support prompt and writes snapshot cycles", async () => {
    const installDir = resolveWizardFullRoundInstallDir();
    fs.mkdirSync(installDir, { recursive: true });
    for (const sub of ["logs", "harness/sets", "projects", "app"]) {
      fs.mkdirSync(path.join(installDir, sub), { recursive: true });
    }
    const bundle = path.join(
      process.cwd(),
      "public/install/agent-witch/app/agent-witch.js",
    );
    if (fs.existsSync(bundle)) {
      try {
        fs.copyFileSync(bundle, path.join(installDir, "app/agent-witch.js"));
      } catch {
        // Bundle copy is optional for screenshot installs; mocks drive this flow.
      }
    }

    const storePath = path.join(installDir, "prompt-optimizer-cycles.json");
    const gateTrace: string[] = [];
    let judgeCalls = 0;

    vi.spyOn(writerReply, "runPromptSdlcWriterReply").mockImplementation(
      async (input) => {
        if (
          input.prompt.includes("generalize") ||
          input.prompt.includes("Generalize")
        ) {
          return {
            ok: true,
            text: JSON.stringify({
              templatedPrompt: COMPLEX_TEMPLATE,
              variables: COMPLEX_VARIABLES,
            }),
            tokens: 40,
          };
        }
        if (input.prompt.includes("split this prompt into smaller modules")) {
          return {
            ok: true,
            text: JSON.stringify({
              options: [
                {
                  id: "policy-then-draft",
                  title: "Policy check → draft",
                  summary: "Two-step chain",
                  topology: "chain",
                  recommended: true,
                  modules: [
                    {
                      id: "m1",
                      title: "Policy guard",
                      prompt: "Verify {{policy_facts}} allow a reply",
                      order: 0,
                    },
                    {
                      id: "m2",
                      title: "Draft",
                      prompt: COMPLEX_TEMPLATE,
                      order: 1,
                    },
                  ],
                },
              ],
            }),
            tokens: 12,
          };
        }
        if (input.prompt.startsWith("You improve prompts.")) {
          return {
            ok: true,
            text: `${COMPLEX_TEMPLATE}\n\n(Adds explicit EU consumer rights footer.)`,
            tokens: 30,
          };
        }
        if (input.prompt.startsWith("Do the task in the prompt below.")) {
          return {
            ok: true,
            text: "Simulated folder diff: added support_reply.md with EU disclaimer footer.",
            tokens: 15,
          };
        }
        if (input.prompt.includes("wizard step 2 (evaluate revisions)")) {
          judgeCalls += 1;
          const score = judgeCalls % 2 === 1 ? 58 : 65;
          return {
            ok: true,
            text: JSON.stringify({
              score,
              passed: score >= 70,
              reasons:
                score < 70
                  ? "Missing EU disclaimer in the prompt text."
                  : "Policy-safe prompt with escalation guard.",
              rawReply: String(score),
            }),
            tokens: 20,
          };
        }
        if (input.prompt.includes("Score the changes from 0 to 100")) {
          const moduleScore = 92;
          return {
            ok: true,
            text: JSON.stringify({
              score: moduleScore,
              passed: moduleScore >= 90,
              reasons: "Module run evidence looks good.",
            }),
            tokens: 20,
          };
        }
        return { ok: true, text: "ok", tokens: 1 };
      },
    );

    const liveId = "full-round-live";
    const cycle = createPromptSdlcLocalCycle({
      goal: COMPLEX_GOAL,
      sourcePrompt: COMPLEX_SOURCE,
      judgeModel: "claude-cli",
      improverModel: "claude-cli",
      runnerModel: "claude-cli",
      workingDirectory: installDir,
      wizard: createInitialPromptSdlcWizardState(COMPLEX_SOURCE),
    });
    savePromptSdlcLocalCycle(storePath, { ...cycle, id: liveId });
    ensurePromptSdlcLocalCycleRunning(storePath, liveId);

    const continueWizard = (extra?: Record<string, string>): void => {
      const live = readPromptSdlcLocalCycle(storePath, liveId);
      const budgetFields: Record<string, string> = {};
      if (
        live?.wizard?.gate === "optimize_modules" &&
        live.costControls &&
        !live.costControls.budgetConfirmed
      ) {
        budgetFields.confirmedTokenBudget = String(
          live.costControls.targetTokenBudget ?? 8000,
        );
        budgetFields.confirmedMaxSpendUsd = String(
          live.costControls.estimatedSpendUsd ?? 0.08,
        );
      }
      tryAcceptPromptSdlcWizardPost({
        posted: new URLSearchParams({
          intent: "wizard-continue",
          cycleId: liveId,
          ...budgetFields,
          ...extra,
        }),
        storePath,
        response: noopResponse,
      });
      ensurePromptSdlcLocalCycleRunning(storePath, liveId);
    };

    await waitUntil(() => {
      const current = readPromptSdlcLocalCycle(storePath, liveId);
      return (
        current?.status === "wizard_paused" &&
        current.wizard?.gate === "generalize"
      );
    }, "step 1 generalize gate");
    gateTrace.push("generalize");
    let paused = readPromptSdlcLocalCycle(storePath, liveId)!;
    snapshotCycle(storePath, "full-round-step-1-generalize", paused);
    const page1 = pageBody(installDir, paused);
    expect(page1).toContain("Step 1 — Generalize");
    expect(page1).toContain("escalation_trigger");

    tryAcceptPromptSdlcWizardPost({
      posted: new URLSearchParams({
        intent: "wizard-continue",
        cycleId: liveId,
      }),
      storePath,
      response: noopResponse,
    });
    ensurePromptSdlcLocalCycleRunning(storePath, liveId);

    await waitUntil(() => {
      const current = readPromptSdlcLocalCycle(storePath, liveId);
      return (
        current?.status === "wizard_paused" &&
        current.wizard?.gate === "evaluate"
      );
    }, "step 2 evaluate gate");
    gateTrace.push("evaluate");
    paused = readPromptSdlcLocalCycle(storePath, liveId)!;
    snapshotCycle(storePath, "full-round-step-2-evaluate", paused);
    const page2 = pageBody(installDir, paused);
    expect(page2).toContain("Step 2 — Evaluate");
    expect(page2).toContain("Round 0 — 58");
    expect(page2).toContain("Round 1 — 65");
    expect(page2).not.toContain("Step 3 — Separate");
    expect(paused.revisions.length).toBeGreaterThanOrEqual(2);

    tryAcceptPromptSdlcWizardPost({
      posted: new URLSearchParams({
        intent: "wizard-continue",
        cycleId: liveId,
        wizardRevisionRound: "1",
      }),
      storePath,
      response: noopResponse,
    });
    ensurePromptSdlcLocalCycleRunning(storePath, liveId);

    await waitUntil(() => {
      const current = readPromptSdlcLocalCycle(storePath, liveId);
      return (
        current?.status === "wizard_paused" &&
        current.wizard?.gate === "separate"
      );
    }, "step 3 separate gate");
    gateTrace.push("separate");
    paused = readPromptSdlcLocalCycle(storePath, liveId)!;
    snapshotCycle(storePath, "full-round-step-3-separate", paused);
    const page3 = pageBody(installDir, paused);
    expect(page3).toContain("Step 3 — Separate");
    expect(page3).toContain("sdlc-wizard-chunks");
    expect(page3).toContain("Policy check → draft");

    tryAcceptPromptSdlcWizardPost({
      posted: new URLSearchParams({
        intent: "wizard-continue",
        cycleId: liveId,
        wizardSplitOptionId: "policy-then-draft",
      }),
      storePath,
      response: noopResponse,
    });
    ensurePromptSdlcLocalCycleRunning(storePath, liveId);

    await waitUntil(() => {
      const current = readPromptSdlcLocalCycle(storePath, liveId);
      return (
        current?.status === "wizard_paused" &&
        current.wizard?.gate === "optimize_modules"
      );
    }, "step 4 optimize gate (parameters)");
    gateTrace.push("optimize_modules");
    paused = readPromptSdlcLocalCycle(storePath, liveId)!;
    const continueWizard = (extra?: Record<string, string>): void => {
      const live = readPromptSdlcLocalCycle(storePath, liveId);
      const budgetFields: Record<string, string> = {};
      if (
        live?.wizard?.gate === "optimize_modules" &&
        live.costControls &&
        !live.costControls.budgetConfirmed
      ) {
        budgetFields.confirmedTokenBudget = String(
          live.costControls.targetTokenBudget ?? 8000,
        );
        budgetFields.confirmedMaxSpendUsd = String(
          live.costControls.estimatedSpendUsd ?? 0.08,
        );
      }
      tryAcceptPromptSdlcWizardPost({
        posted: new URLSearchParams({
          intent: "wizard-continue",
          cycleId: liveId,
          ...budgetFields,
          ...extra,
        }),
        storePath,
        response: noopResponse,
      });
      ensurePromptSdlcLocalCycleRunning(storePath, liveId);
    };

    snapshotCycle(storePath, "full-round-step-4-confirm", paused);
    const page4Confirm = pageBody(installDir, paused);
    expect(page4Confirm).toContain("Confirm Step 4 cost ceiling");
    expect(page4Confirm).toContain("Policy guard");

    continueWizard({
      wizardParam_policy_facts: COMPLEX_VARIABLES.find(
        (item) => item.name === "policy_facts",
      )!.sampleValue,
    });
    await waitUntil(() => {
      const current = readPromptSdlcLocalCycle(storePath, liveId);
      return (
        current?.status === "wizard_paused" &&
        current.wizard?.gate === "optimize_modules" &&
        (current.revisions[0]?.judgement?.score ?? 0) > 0
      );
    }, "step 4 optimize gate after module 1 run");
    paused = readPromptSdlcLocalCycle(storePath, liveId)!;
    snapshotCycle(storePath, "full-round-step-4-optimize", paused);
    const page4 = pageBody(installDir, paused);
    expect(page4).toContain("Separated modules");
    expect(page4).toContain("Scored rounds for");
    expect(page4).toContain("Trial run — 92");
    expect(page4).toContain("Judge scored round 0");

    continueWizard();
    await waitUntil(() => {
      const current = readPromptSdlcLocalCycle(storePath, liveId);
      return (
        current?.status === "passed" ||
        (current?.status === "wizard_paused" &&
          current.wizard?.gate === "optimize_modules")
      );
    }, "after step 4 continue");
    let afterStep4 = readPromptSdlcLocalCycle(storePath, liveId)!;
    if (
      afterStep4.status === "wizard_paused" &&
      afterStep4.wizard?.gate === "optimize_modules"
    ) {
      continueWizard();
      await waitUntil(() => {
        const current = readPromptSdlcLocalCycle(storePath, liveId);
        return (
          current?.status === "passed" ||
          (current?.status === "wizard_paused" &&
            current.wizard?.gate === "optimize_modules")
        );
      }, "second module optimize gate or passed");
      afterStep4 = readPromptSdlcLocalCycle(storePath, liveId)!;
      if (
        afterStep4.status === "wizard_paused" &&
        afterStep4.wizard?.gate === "optimize_modules"
      ) {
        const modulePrompt =
          afterStep4.wizard.modules[afterStep4.wizard.currentModuleIndex]
            ?.prompt ?? "";
        const extra: Record<string, string> = {};
        for (const variable of COMPLEX_VARIABLES) {
          if (modulePrompt.includes(`{{${variable.name}}}`)) {
            extra[`wizardParam_${variable.name}`] = variable.sampleValue;
          }
        }
        continueWizard(extra);
      }
    }
    ensurePromptSdlcLocalCycleRunning(storePath, liveId);
    await waitUntil(() => {
      const current = readPromptSdlcLocalCycle(storePath, liveId);
      return current?.status === "passed";
    }, "wizard passed");
    const finalCycle = readPromptSdlcLocalCycle(storePath, liveId)!;
    expect(finalCycle.status).toBe("passed");
    gateTrace.push("passed");
    snapshotCycle(storePath, "full-round-final-passed", finalCycle);
    expect(pageBody(installDir, finalCycle)).toContain("Passed");

    expect(gateTrace).toEqual([
      "generalize",
      "evaluate",
      "separate",
      "optimize_modules",
      "passed",
    ]);

    const manifest = {
      ok: true,
      installDir,
      port: 43349,
      gateTrace,
      judgeCalls,
      cycles: [
        { step: 1, id: "full-round-step-1-generalize" },
        { step: 2, id: "full-round-step-2-evaluate" },
        { step: 3, id: "full-round-step-3-separate" },
        { step: 4, id: "full-round-step-4-optimize" },
        { step: 5, id: "full-round-final-passed" },
      ],
    };
    fs.writeFileSync(
      path.join(installDir, "full-round-manifest.json"),
      `${JSON.stringify(manifest, null, 2)}\n`,
    );
    if (canWriteUnderArtifactsRoot()) {
      fs.writeFileSync(
        path.join(ARTIFACTS_ROOT, "wizard-full-round-proof.json"),
        `${JSON.stringify(manifest, null, 2)}\n`,
      );
    }
  }, 240_000);
});
