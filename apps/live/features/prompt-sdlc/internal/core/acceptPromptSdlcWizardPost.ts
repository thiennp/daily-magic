import {
  appendPromptSdlcWizardFeedback,
  invalidatePromptSdlcWizardDownstream,
  readPromptSdlcWizardEvaluatePromptText,
  type PromptSdlcWizardSplitOption,
} from "../../../../adapters/promptSdlcAwcCore";

import {
  beginPromptSdlcWizardEvaluate,
  beginPromptSdlcWizardModuleEvaluate,
} from "./advancePromptSdlcWizardLocal";
import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";
import {
  readPromptSdlcLocalCycle,
  savePromptSdlcLocalCycle,
} from "./promptSdlcLocalStore";
import { ensurePromptSdlcLocalCycleRunning } from "./runPromptSdlcLocalCycle";

const modulesFromSplit = (
  option: PromptSdlcWizardSplitOption,
): NonNullable<PromptSdlcLocalCycle["wizard"]>["modules"] =>
  [...option.modules]
    .sort((left, right) => left.order - right.order)
    .map((item) => ({
      moduleId: item.id,
      title: item.title,
      prompt: item.prompt,
      status: "pending" as const,
      selectedRevisionRound: null,
    }));

export const tryAcceptPromptSdlcWizardPost = (input: {
  readonly posted: URLSearchParams | null;
  readonly storePath: string;
  readonly response: {
    writeHead: (code: number, headers: Record<string, string>) => void;
    end: () => void;
  };
}): boolean => {
  const posted = input.posted;
  if (posted === null) {
    return false;
  }
  const intent = posted.get("intent") ?? "";
  if (!intent.startsWith("wizard-")) {
    return false;
  }
  const cycleId = posted.get("cycleId")?.trim() ?? "";
  const cycle = readPromptSdlcLocalCycle(input.storePath, cycleId);
  if (cycle === null || cycle.wizard === undefined) {
    input.response.writeHead(303, { Location: "/prompt-sdlc" });
    input.response.end();
    return true;
  }

  const redirect = (id: string): void => {
    input.response.writeHead(303, {
      Location: `/prompt-sdlc?cycle=${encodeURIComponent(id)}`,
    });
    input.response.end();
  };

  if (intent === "wizard-feedback-rerun") {
    const feedback = posted.get("wizardFeedback")?.trim() ?? "";
    const gate = cycle.wizard.gate;
    if (gate === null || feedback.length === 0) {
      redirect(cycleId);
      return true;
    }
    const stepInstructions = posted.get("wizardStepInstructions")?.trim() ?? "";
    let wizard = appendPromptSdlcWizardFeedback(cycle.wizard, gate, feedback);
    wizard = invalidatePromptSdlcWizardDownstream(wizard, gate);
    wizard = {
      ...wizard,
      pendingStepInstructions: stepInstructions,
    };
    const next: PromptSdlcLocalCycle = {
      ...cycle,
      status: "judging",
      wizard: {
        ...wizard,
        gate: null,
      },
      updatedAt: new Date().toISOString(),
    };
    savePromptSdlcLocalCycle(input.storePath, next);
    ensurePromptSdlcLocalCycleRunning(input.storePath, cycleId);
    redirect(cycleId);
    return true;
  }

  if (intent === "wizard-continue") {
    const gate = cycle.wizard.gate;
    if (gate === null) {
      redirect(cycleId);
      return true;
    }

    if (gate === "generalize") {
      const next = beginPromptSdlcWizardEvaluate({
        ...cycle,
        wizard: { ...cycle.wizard, gate: null },
      });
      savePromptSdlcLocalCycle(input.storePath, next);
      ensurePromptSdlcLocalCycleRunning(input.storePath, cycleId);
      redirect(cycleId);
      return true;
    }

    if (gate === "evaluate") {
      const selectedRound = posted.get("wizardRevisionRound");
      const evaluateSelectedRound =
        selectedRound === null || selectedRound === ""
          ? cycle.wizard.evaluateSelectedRound
          : Number(selectedRound);
      const wizardWithRound = {
        ...cycle.wizard,
        evaluateSelectedRound,
      };
      const evaluatePrompt = readPromptSdlcWizardEvaluatePromptText({
        wizard: wizardWithRound,
        revisions: cycle.revisions.map((item) => ({
          roundNumber: item.roundNumber,
          promptText: item.promptText,
          score: item.judgement?.score,
        })),
      });
      const next: PromptSdlcLocalCycle = {
        ...cycle,
        status: "judging",
        wizard: {
          ...wizardWithRound,
          gate: null,
          phase: "separate",
          templatedPrompt: evaluatePrompt,
          splitOptions: [],
        },
        updatedAt: new Date().toISOString(),
      };
      savePromptSdlcLocalCycle(input.storePath, next);
      ensurePromptSdlcLocalCycleRunning(input.storePath, cycleId);
      redirect(cycleId);
      return true;
    }

    if (gate === "separate") {
      const splitId = posted.get("wizardSplitOptionId")?.trim() ?? "";
      const option = cycle.wizard.splitOptions.find(
        (item) => item.id === splitId,
      );
      if (option === undefined) {
        redirect(cycleId);
        return true;
      }
      const next = beginPromptSdlcWizardModuleEvaluate(
        {
          ...cycle,
          wizard: {
            ...cycle.wizard,
            gate: null,
            selectedSplitOptionId: splitId,
            modules: modulesFromSplit(option),
            phase: "optimize_modules",
          },
        },
        0,
      );
      savePromptSdlcLocalCycle(input.storePath, next);
      ensurePromptSdlcLocalCycleRunning(input.storePath, cycleId);
      redirect(cycleId);
      return true;
    }

    if (gate === "optimize_modules") {
      const index = cycle.wizard.currentModuleIndex + 1;
      if (index >= cycle.wizard.modules.length) {
        const next: PromptSdlcLocalCycle = {
          ...cycle,
          status: "passed",
          wizard: {
            ...cycle.wizard,
            gate: null,
            phase: "complete",
          },
          updatedAt: new Date().toISOString(),
        };
        savePromptSdlcLocalCycle(input.storePath, next);
        redirect(cycleId);
        return true;
      }
      const next = beginPromptSdlcWizardModuleEvaluate(cycle, index);
      savePromptSdlcLocalCycle(input.storePath, next);
      ensurePromptSdlcLocalCycleRunning(input.storePath, cycleId);
      redirect(cycleId);
      return true;
    }
  }

  redirect(cycleId);
  return true;
};
