import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it, vi } from "vitest";

import {
  buildPromptSdlcSteps,
  createInitialPromptSdlcWizardState,
} from "../../../../adapters/promptSdlcAwcCore";
import { tryAcceptPromptSdlcWizardPost } from "./acceptPromptSdlcWizardPost";
import { buildPromptSdlcLocalPageBody } from "./buildPromptSdlcLocalPage";
import { createPromptSdlcLocalCycle } from "./createPromptSdlcLocalCycle";
import { mapPromptSdlcLocalCycleView } from "./mapPromptSdlcLocalCycleView";
import { ensurePromptSdlcLocalCycleRunning } from "./runPromptSdlcLocalCycle";
import {
  readPromptSdlcLocalCycle,
  savePromptSdlcLocalCycle,
} from "./promptSdlcLocalStore";
import * as writerReply from "./runPromptSdlcWriterReply";
import type http from "node:http";

const COMPLEX_GOAL =
  "Draft tier-2 EU support replies: cite only approved policy snippets, never promise legal outcomes, and escalate billing disputes above €500 to a human.";

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
  for (let attempt = 0; attempt < 120; attempt += 1) {
    if (predicate()) {
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, 25));
  }
  throw new Error(`timed out: ${label}`);
};

describe("prompt SDLC wizard does not skip step 2 (evaluate)", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("runs generalize → evaluate gate (complex prompt, 2 scored revisions) → then separate", async () => {
    const storeDir = fs.mkdtempSync(path.join(os.tmpdir(), "psdlc-step2-"));
    const storePath = path.join(storeDir, "prompt-sdlc-cycles.json");
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
          const score = judgeCalls === 1 ? 58 : 84;
          return {
            ok: true,
            text: JSON.stringify({
              score,
              passed: score >= 70,
              reasons:
                score < 70
                  ? "Missing EU disclaimer and escalation guard in the prompt text."
                  : "Policy-safe prompt with escalation guard.",
              rawReply: String(score),
            }),
            tokens: 20,
          };
        }
        if (input.prompt.includes("Score the changes from 0 to 100")) {
          return {
            ok: true,
            text: JSON.stringify({
              score: 88,
              passed: true,
              reasons: "Module run evidence looks good.",
            }),
            tokens: 20,
          };
        }
        return {
          ok: true,
          text: "ok",
          tokens: 1,
        };
      },
    );

    const cycle = createPromptSdlcLocalCycle({
      goal: COMPLEX_GOAL,
      sourcePrompt:
        "Be helpful with billing email. Mention refunds if asked. Do not invent policy.",
      judgeModel: "claude-cli",
      improverModel: "claude-cli",
      runnerModel: "claude-cli",
      workingDirectory: storeDir,
      wizard: createInitialPromptSdlcWizardState(
        "Be helpful with billing email. Mention refunds if asked. Do not invent policy.",
      ),
    });
    savePromptSdlcLocalCycle(storePath, cycle);
    ensurePromptSdlcLocalCycleRunning(storePath, cycle.id);

    await waitUntil(() => {
      const current = readPromptSdlcLocalCycle(storePath, cycle.id);
      if (current?.wizard?.gate === "generalize") {
        gateTrace.push("generalize");
      }
      return (
        current?.status === "wizard_paused" &&
        current.wizard?.gate === "generalize"
      );
    }, "generalize gate");

    tryAcceptPromptSdlcWizardPost({
      posted: new URLSearchParams({
        intent: "wizard-continue",
        cycleId: cycle.id,
      }),
      storePath,
      response: {
        writeHead: () => undefined,
        end: () => undefined,
      } as unknown as http.ServerResponse,
    });
    ensurePromptSdlcLocalCycleRunning(storePath, cycle.id);

    await waitUntil(() => {
      const current = readPromptSdlcLocalCycle(storePath, cycle.id);
      if (
        current?.wizard?.phase === "evaluate" &&
        current.wizard.gate === null &&
        current.status === "judging"
      ) {
        gateTrace.push("evaluate-running");
      }
      return (
        current?.status === "wizard_paused" &&
        current.wizard?.gate === "evaluate"
      );
    }, "evaluate gate");

    const atEvaluate = readPromptSdlcLocalCycle(storePath, cycle.id)!;
    gateTrace.push("evaluate");
    expect(atEvaluate.wizard?.phase).toBe("evaluate");
    expect(atEvaluate.wizard?.gate).toBe("evaluate");
    expect(atEvaluate.wizard?.phase).not.toBe("separate");
    expect(atEvaluate.revisions.length).toBeGreaterThanOrEqual(2);
    expect(
      atEvaluate.revisions.every((item) => (item.judgement?.score ?? 0) > 0),
    ).toBe(true);

    const timelineAtEvaluate = buildPromptSdlcSteps(
      mapPromptSdlcLocalCycleView(atEvaluate),
    ).map((step) => step.label);
    expect(timelineAtEvaluate).toContain("Step 1 — Generalize");
    expect(timelineAtEvaluate).toContain("Step 2 — Evaluate");
    expect(timelineAtEvaluate).not.toContain("Step 3 — Separate");

    const pageAtEvaluate = buildPromptSdlcLocalPageBody({
      goal: COMPLEX_GOAL,
      prompt: "",
      modelNote: "",
      writers: [{ id: "claude-cli", label: "Claude" }],
      judge: "claude-cli",
      improver: "claude-cli",
      folder: storeDir,
      passScore: "70",
      canRun: true,
      errorMessage: null,
      cycle: atEvaluate,
      history: [],
    });
    expect(pageAtEvaluate).toContain("Step 2 — Evaluate");
    expect(pageAtEvaluate).toContain("{{escalation_trigger}}");
    expect(pageAtEvaluate).toContain("Round 0 — 58");
    expect(pageAtEvaluate).toContain("Round 1 — 84");
    expect(pageAtEvaluate).not.toContain("Step 3 — Separate");

    const proofPath = path.join(
      "/opt/cursor/artifacts",
      "wizard-step2-not-skipped-proof.json",
    );
    fs.mkdirSync(path.dirname(proofPath), { recursive: true });
    fs.writeFileSync(
      proofPath,
      `${JSON.stringify(
        {
          gateTrace,
          judgeCalls,
          revisionScores: atEvaluate.revisions.map((item) => ({
            round: item.roundNumber,
            score: item.judgement?.score,
          })),
          timelineAtEvaluate,
          templatedPromptSnippet: atEvaluate.wizard?.templatedPrompt?.slice(
            0,
            120,
          ),
        },
        null,
        2,
      )}\n`,
      "utf8",
    );

    tryAcceptPromptSdlcWizardPost({
      posted: new URLSearchParams({
        intent: "wizard-continue",
        cycleId: cycle.id,
        wizardRevisionRound: "1",
      }),
      storePath,
      response: {
        writeHead: () => undefined,
        end: () => undefined,
      } as unknown as http.ServerResponse,
    });
    ensurePromptSdlcLocalCycleRunning(storePath, cycle.id);

    await waitUntil(() => {
      const current = readPromptSdlcLocalCycle(storePath, cycle.id);
      if (current?.wizard?.gate === "separate") {
        gateTrace.push("separate");
      }
      return (
        current?.status === "wizard_paused" &&
        current.wizard?.gate === "separate"
      );
    }, "separate gate");

    expect(gateTrace).toEqual([
      "generalize",
      "evaluate-running",
      "evaluate",
      "separate",
    ]);
  });
});
