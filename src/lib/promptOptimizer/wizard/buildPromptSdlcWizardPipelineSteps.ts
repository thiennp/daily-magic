import {
  isPromptSdlcTerminalStatus,
  type PromptSdlcCycleStatus,
} from "@/lib/promptOptimizer/PromptSdlcCycleStatus.constant";

import { buildPromptSdlcWizardEvaluatePipeline } from "./buildPromptSdlcWizardEvaluatePipeline";
import { buildPromptSdlcWizardGeneralizePipeline } from "./buildPromptSdlcWizardGeneralizePipeline";
import { buildPromptSdlcWizardOptimizePipeline } from "./buildPromptSdlcWizardOptimizePipeline";
import { buildPromptSdlcWizardSeparatePipeline } from "./buildPromptSdlcWizardSeparatePipeline";
import type { PromptSdlcWizardPipelineStep } from "./types/PromptSdlcWizardPipelineStep.type";
import type PromptSdlcWizardState from "./types/PromptSdlcWizardState.type";

export const buildPromptSdlcWizardPipelineSteps = (input: {
  readonly status: PromptSdlcCycleStatus;
  readonly wizard: PromptSdlcWizardState | undefined;
  readonly writerLabel: string;
  readonly runnerLabel: string;
  readonly folderDisplay: string;
  readonly currentRound: number;
}): readonly PromptSdlcWizardPipelineStep[] => {
  const wizard = input.wizard;
  if (wizard === undefined || wizard.phase === "complete") {
    return [];
  }
  if (isPromptSdlcTerminalStatus(input.status)) {
    return [];
  }

  const base = {
    writerLabel: input.writerLabel,
    folder: input.folderDisplay,
    status: input.status,
    wizard,
  };

  switch (wizard.phase) {
    case "generalize":
      return buildPromptSdlcWizardGeneralizePipeline(base);
    case "evaluate":
      return buildPromptSdlcWizardEvaluatePipeline({
        ...base,
        currentRound: input.currentRound,
      });
    case "separate":
      return buildPromptSdlcWizardSeparatePipeline(base);
    case "optimize_modules":
      return buildPromptSdlcWizardOptimizePipeline({
        runnerLabel: input.runnerLabel,
        folder: input.folderDisplay,
        status: input.status,
        wizard,
      });
    default:
      return [];
  }
};
