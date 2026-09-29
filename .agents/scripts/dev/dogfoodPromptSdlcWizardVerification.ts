#!/usr/bin/env tsx
/**
 * Live Prompt SDLC wizard dogfood: improves PROMPT_SDLC_WIZARD_VERIFICATION_SOURCE_PROMPT.
 * Requires local writers (e.g. Cursor `agent` on PATH). Auto-continues gates.
 */
import fs from "node:fs";
import path from "node:path";

import { createInitialPromptSdlcWizardState } from "../../../apps/live/adapters/promptSdlcAwcCore";
import {
  PROMPT_SDLC_WIZARD_VERIFICATION_GOAL,
  PROMPT_SDLC_WIZARD_VERIFICATION_SOURCE_PROMPT,
} from "../../../apps/live/features/prompt-sdlc/internal/core/promptSdlcWizardVerificationScenario";
import { tryAcceptPromptSdlcWizardPost } from "../../../apps/live/features/prompt-sdlc/internal/core/acceptPromptSdlcWizardPost";
import { createPromptSdlcLocalCycle } from "../../../apps/live/features/prompt-sdlc/internal/core/createPromptSdlcLocalCycle";
import type { PromptSdlcLocalCycle } from "../../../apps/live/features/prompt-sdlc/internal/core/promptSdlcLocalCycle.type";
import { ensurePromptSdlcLocalCycleRunning } from "../../../apps/live/features/prompt-sdlc/internal/core/runPromptSdlcLocalCycle";
import {
  readPromptSdlcLocalCycle,
  savePromptSdlcLocalCycle,
} from "../../../apps/live/features/prompt-sdlc/internal/core/promptSdlcLocalStore";
import { isPromptSdlcTerminalStatus } from "../../../apps/live/adapters/promptSdlcAwcCore";

const installDir =
  process.env.AWL_DOGFOOD_INSTALL_DIR?.trim() ||
  path.join("/opt/cursor/artifacts", "awl-wizard-dogfood");

const waitUntil = async (
  predicate: () => boolean,
  label: string,
  attempts = 2400,
  onTick?: () => void,
): Promise<void> => {
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    if (predicate()) {
      return;
    }
    onTick?.();
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`timed out: ${label}`);
};

const kickCycleRunner = (storePath: string, cycleId: string): void => {
  ensurePromptSdlcLocalCycleRunning(storePath, cycleId);
};

const noopResponse = {
  writeHead: () => undefined,
  end: () => undefined,
};

const continueWizard = (
  storePath: string,
  cycleId: string,
  extra?: URLSearchParams,
): void => {
  const posted = new URLSearchParams({ intent: "wizard-continue", cycleId });
  if (extra !== undefined) {
    for (const [key, value] of extra.entries()) {
      posted.set(key, value);
    }
  }
  tryAcceptPromptSdlcWizardPost({ posted, storePath, response: noopResponse });
  ensurePromptSdlcLocalCycleRunning(storePath, cycleId);
};

const pickBestRevisionRound = (cycle: PromptSdlcLocalCycle): number => {
  let best = cycle.revisions[0]?.roundNumber ?? 0;
  let bestScore = -1;
  for (const revision of cycle.revisions) {
    const score = revision.judgement?.score;
    if (score !== null && score !== undefined && score > bestScore) {
      bestScore = score;
      best = revision.roundNumber;
    }
  }
  return best;
};

const writeResult = (cycle: PromptSdlcLocalCycle): void => {
  const outPath = path.join(
    "/opt/cursor/artifacts",
    "prompt-sdlc-wizard-dogfood-result.md",
  );
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  const modules =
    cycle.wizard?.modules.map(
      (item) => `### ${item.title}\n\n\`\`\`\n${item.prompt}\n\`\`\``,
    ) ?? [];
  const revisions = cycle.revisions
    .map(
      (item) =>
        `- Round ${item.roundNumber}: score ${item.judgement?.score ?? "—"}\n\n\`\`\`\n${item.promptText}\n\`\`\``,
    )
    .join("\n\n");
  fs.writeFileSync(
    outPath,
    `# Prompt SDLC wizard dogfood result

## Goal

${cycle.goal}

## Final templated prompt (wizard)

\`\`\`
${cycle.wizard?.templatedPrompt ?? "(none)"}
\`\`\`

## Variables

${(cycle.wizard?.variables ?? [])
  .map((item) => `- {{${item.name}}} — ${item.description}`)
  .join("\n")}

## Revisions (last module / evaluate)

${revisions}

## Module prompts

${modules.join("\n\n")}

## Status

${cycle.status}

`,
    "utf8",
  );
  console.log(`Wrote ${outPath}`);
};

const main = async (): Promise<void> => {
  fs.mkdirSync(installDir, { recursive: true });
  for (const sub of ["logs", "harness/sets", "projects", "app"]) {
    fs.mkdirSync(path.join(installDir, sub), { recursive: true });
  }
  const bundle = path.join(
    process.cwd(),
    "public/install/agent-witch/app/agent-witch.js",
  );
  if (fs.existsSync(bundle)) {
    fs.copyFileSync(bundle, path.join(installDir, "app/agent-witch.js"));
  }

  const storePath = path.join(installDir, "prompt-sdlc-cycles.json");
  const cycleId = "wizard-verification-dogfood";
  const existing = readPromptSdlcLocalCycle(storePath, cycleId);
  if (existing?.status === "passed") {
    writeResult(existing);
    return;
  }
  if (
    existing === null ||
    isPromptSdlcTerminalStatus(existing.status) ||
    process.env.AWL_DOGFOOD_RESET === "1"
  ) {
    const cycle = createPromptSdlcLocalCycle({
      goal: PROMPT_SDLC_WIZARD_VERIFICATION_GOAL,
      sourcePrompt: PROMPT_SDLC_WIZARD_VERIFICATION_SOURCE_PROMPT,
      judgeModel: "cursor",
      improverModel: "cursor",
      runnerModel: "cursor",
      workingDirectory: installDir,
      wizard: createInitialPromptSdlcWizardState(
        PROMPT_SDLC_WIZARD_VERIFICATION_SOURCE_PROMPT,
      ),
    });
    savePromptSdlcLocalCycle(storePath, { ...cycle, id: cycleId });
  } else {
    console.log(
      `Resuming existing cycle (${existing.status}, phase ${existing.wizard?.phase})`,
    );
  }
  ensurePromptSdlcLocalCycleRunning(storePath, cycleId);

  const resumeFromGate = (): boolean => {
    const current = readPromptSdlcLocalCycle(storePath, cycleId);
    if (current?.status !== "wizard_paused" || current.wizard?.gate === null) {
      return false;
    }
    if (current.wizard.gate === "evaluate") {
      continueWizard(
        storePath,
        cycleId,
        new URLSearchParams({
          wizardRevisionRound: String(pickBestRevisionRound(current)),
        }),
      );
      return true;
    }
    if (current.wizard.gate === "separate") {
      const splitId =
        current.wizard.splitOptions.find((item) => item.recommended)?.id ??
        current.wizard.splitOptions[0]?.id ??
        "";
      if (splitId.length === 0) {
        return false;
      }
      continueWizard(
        storePath,
        cycleId,
        new URLSearchParams({ wizardSplitOptionId: splitId }),
      );
      return true;
    }
    continueWizard(storePath, cycleId);
    return true;
  };

  if (resumeFromGate()) {
    await waitUntil(() => {
      const current = readPromptSdlcLocalCycle(storePath, cycleId);
      return current?.status !== "wizard_paused";
    }, "resume past paused gate");
  }

  await waitUntil(() => {
    const current = readPromptSdlcLocalCycle(storePath, cycleId);
    return (
      current?.status === "wizard_paused" &&
      current.wizard?.gate === "generalize"
    );
  }, "step 1 generalize gate");
  continueWizard(storePath, cycleId);

  await waitUntil(() => {
    const current = readPromptSdlcLocalCycle(storePath, cycleId);
    return (
      current?.status === "wizard_paused" && current.wizard?.gate === "evaluate"
    );
  }, "step 2 evaluate gate");
  const atEvaluate = readPromptSdlcLocalCycle(storePath, cycleId)!;
  continueWizard(
    storePath,
    cycleId,
    new URLSearchParams({
      wizardRevisionRound: String(pickBestRevisionRound(atEvaluate)),
    }),
  );

  await waitUntil(() => {
    const current = readPromptSdlcLocalCycle(storePath, cycleId);
    return (
      current?.status === "wizard_paused" && current.wizard?.gate === "separate"
    );
  }, "step 3 separate gate");
  const atSeparate = readPromptSdlcLocalCycle(storePath, cycleId)!;
  const splitId =
    atSeparate.wizard?.splitOptions.find((item) => item.recommended)?.id ??
    atSeparate.wizard?.splitOptions[0]?.id ??
    "";
  if (splitId.length === 0) {
    throw new Error("No split options at separate gate");
  }
  continueWizard(
    storePath,
    cycleId,
    new URLSearchParams({ wizardSplitOptionId: splitId }),
  );

  let kickCounter = 0;
  const maybeKick = (): void => {
    kickCounter += 1;
    if (kickCounter % 40 !== 0) {
      return;
    }
    kickCycleRunner(storePath, cycleId);
  };

  for (let moduleIndex = 0; moduleIndex < 8; moduleIndex += 1) {
    await waitUntil(
      () => {
        const current = readPromptSdlcLocalCycle(storePath, cycleId);
        return (
          current?.status === "passed" ||
          (current?.status === "wizard_paused" &&
            current.wizard?.gate === "optimize_modules")
        );
      },
      `step 4 optimize gate or passed (module ${moduleIndex})`,
      2400,
      maybeKick,
    );
    const current = readPromptSdlcLocalCycle(storePath, cycleId)!;
    if (current.status === "passed") {
      writeResult(current);
      return;
    }
    continueWizard(storePath, cycleId);
  }

  throw new Error("Wizard did not reach passed status");
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
