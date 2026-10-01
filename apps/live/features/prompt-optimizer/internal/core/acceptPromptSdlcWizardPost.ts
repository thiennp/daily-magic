import {
  appendPromptSdlcWizardFeedback,
  invalidatePromptSdlcWizardDownstream,
  mergePromptSdlcWizardPostedParameterValues,
  summarizePromptSdlcWizardCompletion,
} from "../../../../adapters/promptSdlcAwcCore";
import { confirmPromptSdlcCostBudget } from "../../../../adapters/promptSdlcAwcCore";
import { isPromptSdlcCostBudgetConfirmed } from "../../../../adapters/promptSdlcAwcCore";
import { PROMPT_SDLC_BUDGET_CONFIRM_REQUIRED } from "../../../../adapters/promptSdlcAwcCore";

import {
  beginPromptSdlcWizardEvaluate,
  beginPromptSdlcWizardModuleEvaluate,
} from "./advancePromptSdlcWizardLocal";
import { completePromptSdlcLocalWizardCycle } from "./completePromptSdlcLocalWizardCycle";
import { beginPromptSdlcWizardOptimizeModulesAfterSeparate } from "./beginPromptSdlcWizardOptimizeModulesAfterSeparate";
import { beginPromptSdlcWizardSeparateAfterEvaluate } from "./beginPromptSdlcWizardSeparateAfterEvaluate";
import { buildPromptSdlcLiveRunFragmentHtml } from "./buildPromptSdlcLiveRunFragmentHtml";
import type { PromptSdlcLocalCycle } from "./promptSdlcLocalCycle.type";
import {
  readPromptSdlcLocalCycle,
  savePromptSdlcLocalCycle,
} from "./promptSdlcLocalStore";
import { ensurePromptSdlcLocalCycleRunning } from "./runPromptSdlcLocalCycle";
import {
  canContinuePromptSdlcWizardEvaluateRevision,
  readPromptSdlcWizardEvaluateRevisionScore,
} from "./readPromptSdlcWizardEvaluateRevisionScore";
import { retryPromptSdlcWizardAccordionStep } from "./retryPromptSdlcWizardAccordionStep";
import { skipPromptSdlcWizardTimelineStep } from "./skipPromptSdlcWizardTimelineStep";
import {
  skipPromptSdlcWizardCurrentModule,
  stopPromptSdlcWizardRun,
} from "./stopPromptSdlcWizard";
const WIZARD_EVALUATE_SCORE_ERROR =
  "Pick a revision scored above 0 before continuing to Separate.";

const resumeWizardStepAfterWriterFailure = (
  cycle: PromptSdlcLocalCycle,
): PromptSdlcLocalCycle => ({
  ...cycle,
  status: "judging",
  errorMessage: null,
  wizard:
    cycle.wizard === undefined
      ? undefined
      : {
          ...cycle.wizard,
          gate: null,
        },
  updatedAt: new Date().toISOString(),
});

export const tryAcceptPromptSdlcWizardPost = (input: {
  readonly posted: URLSearchParams | null;
  readonly storePath: string;
  readonly response: {
    writeHead: (code: number, headers: Record<string, string>) => void;
    end: (body?: string) => void;
  };
}): boolean => {
  const posted = input.posted;
  if (posted === null) {
    return false;
  }
  const liveFragment = posted.get("liveFragment") === "1";
  const intent = posted.get("intent") ?? "";
  if (!intent.startsWith("wizard-")) {
    return false;
  }
  const cycleId = posted.get("cycleId")?.trim() ?? "";
  let cycle = readPromptSdlcLocalCycle(input.storePath, cycleId);
  if (cycle === null || cycle.wizard === undefined) {
    input.response.writeHead(303, { Location: "/prompt-optimizer" });
    input.response.end();
    return true;
  }

  const redirect = (id: string): void => {
    input.response.writeHead(303, {
      Location: `/prompt-optimizer?cycle=${encodeURIComponent(id)}`,
    });
    input.response.end();
  };

  const finish = (id: string): void => {
    if (!liveFragment) {
      redirect(id);
      return;
    }
    const saved = readPromptSdlcLocalCycle(input.storePath, id);
    if (saved === null) {
      input.response.writeHead(404, {});
      input.response.end();
      return;
    }
    input.response.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
    });
    input.response.end(
      buildPromptSdlcLiveRunFragmentHtml(input.storePath, saved),
    );
  };

  if (intent === "wizard-stop-all") {
    const next = stopPromptSdlcWizardRun(cycle);
    savePromptSdlcLocalCycle(input.storePath, next);
    ensurePromptSdlcLocalCycleRunning(input.storePath, cycleId);
    finish(cycleId);
    return true;
  }

  if (intent === "wizard-skip-module") {
    const next = skipPromptSdlcWizardCurrentModule(cycle);
    savePromptSdlcLocalCycle(input.storePath, next);
    finish(cycleId);
    return true;
  }

  if (intent === "wizard-retry-step") {
    const stepId = posted.get("wizardStepId")?.trim() ?? "";
    const next = retryPromptSdlcWizardAccordionStep(cycle, stepId);
    savePromptSdlcLocalCycle(input.storePath, next);
    finish(cycleId);
    return true;
  }

  if (intent === "wizard-skip-step") {
    const stepId = posted.get("wizardStepId")?.trim() ?? "";
    const next = skipPromptSdlcWizardTimelineStep(cycle, stepId);
    savePromptSdlcLocalCycle(input.storePath, next);
    if (
      next.status === "judging" ||
      next.wizard?.additionalSkillSuggestionsStatus === "pending"
    ) {
      ensurePromptSdlcLocalCycleRunning(input.storePath, cycleId);
    }
    finish(cycleId);
    return true;
  }

  if (intent === "wizard-feedback-rerun") {
    const feedback = posted.get("wizardFeedback")?.trim() ?? "";
    const gate = cycle.wizard.gate;
    if (gate === null || feedback.length === 0) {
      finish(cycleId);
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
      errorMessage: null,
      wizard: {
        ...wizard,
        gate: null,
      },
      updatedAt: new Date().toISOString(),
    };
    savePromptSdlcLocalCycle(input.storePath, next);
    ensurePromptSdlcLocalCycleRunning(input.storePath, cycleId);
    finish(cycleId);
    return true;
  }

  if (intent === "wizard-continue") {
    const gate = cycle.wizard.gate;
    if (gate === null) {
      finish(cycleId);
      return true;
    }

    if (gate === "generalize") {
      const hasSuccessfulGeneralizeAttempt = cycle.wizard.attempts.some(
        (item) => item.step === "generalize",
      );
      const writerFailed =
        (cycle.errorMessage?.trim().length ?? 0) > 0 &&
        !hasSuccessfulGeneralizeAttempt;
      const next = writerFailed
        ? resumeWizardStepAfterWriterFailure(cycle)
        : beginPromptSdlcWizardEvaluate({
            ...cycle,
            wizard: { ...cycle.wizard, gate: null },
          });
      savePromptSdlcLocalCycle(input.storePath, next);
      ensurePromptSdlcLocalCycleRunning(input.storePath, cycleId);
      finish(cycleId);
      return true;
    }

    if (gate === "evaluate") {
      const selectedRound = posted.get("wizardRevisionRound");
      const evaluateSelectedRound =
        selectedRound === null || selectedRound === ""
          ? cycle.wizard.evaluateSelectedRound
          : Number(selectedRound);
      const revisionScore = readPromptSdlcWizardEvaluateRevisionScore(
        cycle,
        evaluateSelectedRound ?? -1,
      );
      if (!canContinuePromptSdlcWizardEvaluateRevision(revisionScore)) {
        const next: PromptSdlcLocalCycle = {
          ...cycle,
          errorMessage: WIZARD_EVALUATE_SCORE_ERROR,
          updatedAt: new Date().toISOString(),
        };
        savePromptSdlcLocalCycle(input.storePath, next);
        finish(cycleId);
        return true;
      }
      const next = beginPromptSdlcWizardSeparateAfterEvaluate({
        ...cycle,
        wizard: {
          ...cycle.wizard,
          evaluateSelectedRound,
        },
      });
      savePromptSdlcLocalCycle(input.storePath, next);
      ensurePromptSdlcLocalCycleRunning(input.storePath, cycleId);
      finish(cycleId);
      return true;
    }

    if (gate === "separate") {
      const writerFailed =
        (cycle.errorMessage?.trim().length ?? 0) > 0 &&
        cycle.wizard.splitOptions.length === 0;
      if (writerFailed) {
        const next = resumeWizardStepAfterWriterFailure(cycle);
        savePromptSdlcLocalCycle(input.storePath, next);
        ensurePromptSdlcLocalCycleRunning(input.storePath, cycleId);
        finish(cycleId);
        return true;
      }
      const splitId = posted.get("wizardSplitOptionId")?.trim() ?? "";
      const option = cycle.wizard.splitOptions.find(
        (item) => item.id === splitId,
      );
      if (option === undefined) {
        const next: PromptSdlcLocalCycle = {
          ...cycle,
          errorMessage:
            splitId.length === 0
              ? "Choose one split option before continuing to Step 4."
              : "That split option is no longer available. Pick another option or rerun Separate.",
          updatedAt: new Date().toISOString(),
        };
        savePromptSdlcLocalCycle(input.storePath, next);
        finish(cycleId);
        return true;
      }
      const next = beginPromptSdlcWizardOptimizeModulesAfterSeparate(
        cycle,
        option,
      );
      savePromptSdlcLocalCycle(input.storePath, next);
      finish(cycleId);
      return true;
    }

    if (gate === "optimize_modules") {
      const wizardState = cycle.wizard;
      const moduleIndex = wizardState.currentModuleIndex;
      const moduleRun = wizardState.modules[moduleIndex];
      if (moduleRun === undefined) {
        finish(cycleId);
        return true;
      }

      // Pre-Step4: require confirmedTokenBudget / confirmedMaxSpendUsd before trials.
      if (!isPromptSdlcCostBudgetConfirmed(cycle.costControls)) {
        const tokenRaw = posted.get("confirmedTokenBudget")?.trim() ?? "";
        const spendRaw = posted.get("confirmedMaxSpendUsd")?.trim() ?? "";
        if (tokenRaw.length === 0) {
          const next: PromptSdlcLocalCycle = {
            ...cycle,
            errorMessage: PROMPT_SDLC_BUDGET_CONFIRM_REQUIRED,
            updatedAt: new Date().toISOString(),
          };
          savePromptSdlcLocalCycle(input.storePath, next);
          finish(cycleId);
          return true;
        }
        const confirmed = confirmPromptSdlcCostBudget({
          existing: cycle.costControls,
          confirmedTokenBudget: Number(tokenRaw),
          confirmedMaxSpendUsd: spendRaw.length === 0 ? null : Number(spendRaw),
          rateUsdPer1kTokens: cycle.costControls?.rateUsdPer1kTokens,
        });
        if (!confirmed.ok) {
          const next: PromptSdlcLocalCycle = {
            ...cycle,
            errorMessage: confirmed.errorMessage,
            updatedAt: new Date().toISOString(),
          };
          savePromptSdlcLocalCycle(input.storePath, next);
          finish(cycleId);
          return true;
        }
        cycle = {
          ...cycle,
          costControls: confirmed.costControls,
          errorMessage: null,
          updatedAt: new Date().toISOString(),
        };
        savePromptSdlcLocalCycle(input.storePath, cycle);
      }

      const mergedParams = mergePromptSdlcWizardPostedParameterValues({
        wizard: wizardState,
        modulePrompt: moduleRun.prompt,
        posted,
      });
      if (!mergedParams.ok) {
        const next: PromptSdlcLocalCycle = {
          ...cycle,
          errorMessage: mergedParams.errorMessage,
          updatedAt: new Date().toISOString(),
        };
        savePromptSdlcLocalCycle(input.storePath, next);
        finish(cycleId);
        return true;
      }

      const wizardWithParams = {
        ...wizardState,
        parameterValues: mergedParams.parameterValues,
      };

      if (moduleRun.status === "pending") {
        const next = beginPromptSdlcWizardModuleEvaluate(
          {
            ...cycle,
            wizard: { ...wizardWithParams, gate: null },
          },
          moduleIndex,
        );
        savePromptSdlcLocalCycle(input.storePath, next);
        ensurePromptSdlcLocalCycleRunning(input.storePath, cycleId);
        finish(cycleId);
        return true;
      }

      const nextIndex = moduleIndex + 1;
      if (nextIndex >= wizardState.modules.length) {
        const completion =
          summarizePromptSdlcWizardCompletion(wizardWithParams);
        const next = completePromptSdlcLocalWizardCycle(
          {
            ...cycle,
            wizard: wizardWithParams,
          },
          completion.terminalStatusSuggestion,
        );
        savePromptSdlcLocalCycle(input.storePath, next);
        ensurePromptSdlcLocalCycleRunning(input.storePath, cycleId);
        finish(cycleId);
        return true;
      }

      const next: PromptSdlcLocalCycle = {
        ...cycle,
        status: "wizard_paused",
        errorMessage: null,
        revisions: [],
        wizard: {
          ...wizardWithParams,
          gate: "optimize_modules",
          currentModuleIndex: nextIndex,
        },
        updatedAt: new Date().toISOString(),
      };
      savePromptSdlcLocalCycle(input.storePath, next);
      finish(cycleId);
      return true;
    }
  }

  finish(cycleId);
  return true;
};
