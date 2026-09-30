import { isPromptSdlcTerminalStatus } from "@/lib/promptOptimizer/PromptSdlcCycleStatus.constant";

import {
  pipelineStep,
  pipelineTerminalSample,
} from "./promptSdlcWizardPipelineShared";
import type { PromptSdlcWizardPipelineStep } from "./types/PromptSdlcWizardPipelineStep.type";
import type PromptSdlcWizardState from "./types/PromptSdlcWizardState.type";

export const buildPromptSdlcWizardGeneralizePipeline = (input: {
  readonly writerLabel: string;
  readonly folder: string;
  readonly status: string;
  readonly wizard: PromptSdlcWizardState;
}): readonly PromptSdlcWizardPipelineStep[] => {
  const hasAttempt = input.wizard.attempts.some(
    (item) => item.step === "generalize",
  );
  const pausedAtGate =
    input.status === "wizard_paused" && input.wizard.gate === "generalize";
  const invoking =
    input.status === "judging" &&
    input.wizard.gate === null &&
    !hasAttempt &&
    !isPromptSdlcTerminalStatus(input.status);

  const cliState: PromptSdlcWizardPipelineStep["state"] =
    pausedAtGate || hasAttempt ? "done" : invoking ? "active" : "pending";
  const parseState: PromptSdlcWizardPipelineStep["state"] =
    hasAttempt || pausedAtGate ? "done" : "pending";

  return [
    pipelineStep(
      "awl",
      "Connected on this Mac (Agent Witch Live)",
      "done",
      "Local app",
      "<p>Your browser talks to AWL on <code>127.0.0.1:43347</code>. The run is stored on this Mac.</p>",
    ),
    pipelineStep(
      "folder",
      `Run folder: ${input.folder}`,
      "done",
      "Working directory",
      `<p>Writers use this folder as cwd.</p><pre class="mono">${input.folder}</pre>`,
    ),
    pipelineStep(
      "cli",
      `${input.writerLabel} CLI — generalize`,
      cliState,
      "Writer on this Mac",
      pipelineTerminalSample(input.writerLabel, input.folder),
    ),
    pipelineStep(
      "parse",
      "Parse templated prompt",
      parseState,
      "Structured reply",
      "<p>AWL expects JSON with <code>templatedPrompt</code> and <code>variables</code>.</p>",
    ),
    ...(pausedAtGate
      ? [
          pipelineStep(
            "gate",
            "Review Step 1 output",
            "active",
            "Paused at gate",
            "<p>Continue, Skip, or rerun with feedback.</p>",
          ),
        ]
      : []),
  ];
};
