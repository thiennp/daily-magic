import type OperatorStepDefinition from "@/lib/workflows/types/OperatorStepDefinition.type";

export function buildOperatorCheckpointPromptSection(
  operatorSteps: readonly OperatorStepDefinition[],
): string {
  if (operatorSteps.length === 0) {
    return "";
  }

  const checkpointLines = operatorSteps.map(
    (step, index) => `${index + 1}. ${step.title}`,
  );

  return [
    "Human operator checkpoints:",
    ...checkpointLines.map((line) => `- ${line}`),
    "Wait for the operator to complete each checkpoint. Use [[AWAITING_INPUT]] when you need confirmation before continuing.",
  ].join("\n");
}

export function appendOperatorCheckpointsToPrompt(
  prompt: string,
  operatorSteps: readonly OperatorStepDefinition[],
): string {
  const checkpointSection = buildOperatorCheckpointPromptSection(operatorSteps);
  const trimmedPrompt = prompt.trim();

  if (checkpointSection.length === 0) {
    return trimmedPrompt;
  }

  if (trimmedPrompt.length === 0) {
    return checkpointSection;
  }

  return `${trimmedPrompt}\n\n${checkpointSection}`;
}
