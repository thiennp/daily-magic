import { pipelineStep } from "./promptSdlcWizardPipelineShared";
import type { PromptSdlcWizardPipelineStep } from "./types/PromptSdlcWizardPipelineStep.type";
import type PromptSdlcWizardState from "./types/PromptSdlcWizardState.type";

export const buildPromptSdlcWizardEvaluatePipeline = (input: {
  readonly writerLabel: string;
  readonly folder: string;
  readonly status: string;
  readonly wizard: PromptSdlcWizardState;
  readonly currentRound: number;
}): readonly PromptSdlcWizardPipelineStep[] => {
  const pausedAtGate =
    input.status === "wizard_paused" && input.wizard.gate === "evaluate";
  const judging =
    input.status === "judging" && input.wizard.gate === null && !pausedAtGate;

  return [
    pipelineStep(
      "awl",
      "Connected on this Mac (Agent Witch Live)",
      "done",
      "Local app",
      "<p>Step 2 scores prompt text only (no folder run).</p>",
    ),
    pipelineStep(
      "cli",
      `${input.writerLabel} — score round ${input.currentRound + 1}`,
      judging ? "active" : "done",
      "Judge scores prompt text",
      `<pre class="mono sdlc-pipeline-terminal">$ cd ${input.folder}\n$ ${input.writerLabel.toLowerCase()} …\n\n{"score":72,"passed":true,"reasons":"…"}</pre>`,
    ),
    ...(pausedAtGate
      ? [
          pipelineStep(
            "gate",
            "Pick a revision or continue",
            "active",
            "Step 2 gate",
            "<p>Choose a revision for Separate, or Skip.</p>",
          ),
        ]
      : []),
  ];
};
