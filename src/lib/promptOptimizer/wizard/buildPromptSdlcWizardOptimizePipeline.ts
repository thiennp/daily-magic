import { pipelineStep } from "./promptSdlcWizardPipelineShared";
import type { PromptSdlcWizardPipelineStep } from "./types/PromptSdlcWizardPipelineStep.type";
import type PromptSdlcWizardState from "./types/PromptSdlcWizardState.type";

export const buildPromptSdlcWizardOptimizePipeline = (input: {
  readonly runnerLabel: string;
  readonly folder: string;
  readonly status: string;
  readonly wizard: PromptSdlcWizardState;
}): readonly PromptSdlcWizardPipelineStep[] => {
  const moduleIndex = input.wizard.currentModuleIndex + 1;
  const moduleTotal = input.wizard.modules.length;
  const pausedAtGate =
    input.status === "wizard_paused" &&
    input.wizard.gate === "optimize_modules";
  const judging = input.status === "judging" && !pausedAtGate;

  return [
    pipelineStep(
      "awl",
      "Connected on this Mac (Agent Witch Live)",
      "done",
      "Local app",
      "<p>Step 4 runs the module in your folder, then scores output.</p>",
    ),
    pipelineStep(
      "cli",
      `${input.runnerLabel} — module ${moduleIndex} of ${moduleTotal}`,
      judging ? "active" : "done",
      "Runner + judge",
      `<pre class="mono sdlc-pipeline-terminal">$ cd ${input.folder}\n$ ${input.runnerLabel.toLowerCase()} …\n\n…runner output…</pre>`,
    ),
    ...(pausedAtGate
      ? [
          pipelineStep(
            "gate",
            "Module parameters or review",
            "active",
            "Step 4 gate",
            "<p>Fill placeholders or continue after scored rounds.</p>",
          ),
        ]
      : []),
  ];
};
