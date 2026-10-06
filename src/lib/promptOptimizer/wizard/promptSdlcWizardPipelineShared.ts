import type { PromptSdlcWizardPipelineStep } from "./types/PromptSdlcWizardPipelineStep.type";

export const pipelineStep = (
  id: string,
  label: string,
  state: PromptSdlcWizardPipelineStep["state"],
  infoTitle: string,
  infoBodyHtml: string,
): PromptSdlcWizardPipelineStep => ({
  id,
  label,
  state,
  infoTitle,
  infoBodyHtml,
});

export const pipelineTerminalSample = (
  writerLabel: string,
  folder: string,
): string =>
  `<p class="muted">The computer runs a non-interactive ${writerLabel} command in your chosen folder. You will not see a separate Terminal window; output is captured here.</p><pre class="mono sdlc-pipeline-terminal">$ cd ${folder}\n$ ${writerLabel.toLowerCase()} …\n\n{"templatedPrompt":"…","variables":[…]}</pre>`;
