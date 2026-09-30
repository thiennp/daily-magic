import { isPromptSdlcTerminalStatus } from "@/lib/promptOptimizer/PromptSdlcCycleStatus.constant";
import { buildPromptSdlcClassicRoundSteps } from "@/lib/promptOptimizer/buildPromptSdlcClassicRoundSteps";
import type { PromptSdlcStep } from "@/lib/promptOptimizer/buildPromptSdlcSteps";
import { buildPromptSdlcWizardStepIndex } from "@/lib/promptOptimizer/buildPromptSdlcWizardStepIndex";
import { shouldShowPromptSdlcWizardEvaluateRounds } from "@/lib/promptOptimizer/shouldShowPromptSdlcWizardEvaluateRounds";
import type PromptSdlcCycleView from "@/lib/promptOptimizer/types/PromptSdlcCycleView.type";

const WIZARD_STEP_LABELS = [
  "Step 1 — Generalize",
  "Step 2 — Evaluate",
  "Step 3 — Separate",
  "Step 4 — Optimize modules",
] as const;

const terminalLabel = (cycle: PromptSdlcCycleView): string => {
  if (cycle.wizard !== undefined && cycle.wizard.phase === "complete") {
    return "Finished";
  }
  if (cycle.status === "passed") {
    return "Passed";
  }
  if (cycle.status === "stopped") {
    if (cycle.wizard?.phase === "complete") {
      return "Finished";
    }
    return (cycle.errorMessage ?? "").startsWith("Finished")
      ? "Finished"
      : "Stopped";
  }
  return "Failed";
};

export const buildPromptSdlcWizardSteps = (
  cycle: PromptSdlcCycleView,
): readonly PromptSdlcStep[] => {
  const wizard = cycle.wizard;
  if (wizard === undefined) {
    return [];
  }

  const activeIndex = buildPromptSdlcWizardStepIndex(wizard);
  const revealedThroughIndex = Math.max(
    activeIndex,
    wizard.phase === "optimize_modules" || wizard.gate === "optimize_modules"
      ? 3
      : activeIndex,
  );
  const pausedAtGate = cycle.status === "wizard_paused";
  const isComplete = wizard.phase === "complete";
  const wizardSteps: PromptSdlcStep[] = WIZARD_STEP_LABELS.map(
    (label, index) => {
      const state: PromptSdlcStep["state"] =
        !isComplete && !pausedAtGate && index === activeIndex
          ? "active"
          : "done";
      return {
        id: `wizard-${index + 1}`,
        label,
        state,
        detail: null,
      };
    },
  ).filter((step, index) => {
    if (isComplete) {
      return true;
    }
    return index <= revealedThroughIndex;
  });

  const showRoundStepsWhilePausedAtGate =
    pausedAtGate &&
    (wizard.gate === "evaluate" || wizard.gate === "optimize_modules");
  const roundSteps =
    shouldShowPromptSdlcWizardEvaluateRounds(wizard) &&
    (!pausedAtGate || showRoundStepsWhilePausedAtGate)
      ? buildPromptSdlcClassicRoundSteps(cycle)
      : [];

  const endStep: readonly PromptSdlcStep[] =
    isPromptSdlcTerminalStatus(cycle.status) && !isComplete
      ? [
          {
            id: "end",
            label: terminalLabel(cycle),
            state: "done",
            detail: cycle.errorMessage,
          },
        ]
      : [];

  return [...wizardSteps, ...roundSteps, ...endStep];
};
