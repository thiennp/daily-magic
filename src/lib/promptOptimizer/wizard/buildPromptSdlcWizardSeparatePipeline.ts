import {
  pipelineStep,
  pipelineTerminalSample,
} from "./promptSdlcWizardPipelineShared";
import type { PromptSdlcWizardPipelineStep } from "./types/PromptSdlcWizardPipelineStep.type";
import type PromptSdlcWizardState from "./types/PromptSdlcWizardState.type";

export const buildPromptSdlcWizardSeparatePipeline = (input: {
  readonly writerLabel: string;
  readonly folder: string;
  readonly status: string;
  readonly wizard: PromptSdlcWizardState;
}): readonly PromptSdlcWizardPipelineStep[] => {
  const hasOptions = input.wizard.splitOptions.length > 0;
  const pausedAtGate =
    input.status === "wizard_paused" && input.wizard.gate === "separate";
  const invoking =
    input.status === "judging" &&
    input.wizard.gate === null &&
    !hasOptions &&
    !pausedAtGate;

  return [
    pipelineStep(
      "awl",
      "Connected on this computer (AgentWitch Local)",
      "done",
      "Local app",
      "<p>Separate keeps <code>{{placeholders}}</code> in module text.</p>",
    ),
    pipelineStep(
      "cli",
      `${input.writerLabel} CLI — suggest splits`,
      hasOptions || pausedAtGate ? "done" : invoking ? "active" : "pending",
      "Split writer",
      pipelineTerminalSample(input.writerLabel, input.folder),
    ),
    ...(pausedAtGate
      ? [
          pipelineStep(
            "gate",
            "Choose a split option",
            "active",
            "Step 3 gate",
            "<p>Pick chain or parallel, or Skip.</p>",
          ),
        ]
      : []),
  ];
};
