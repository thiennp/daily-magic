export const AGENT_STEP_OUTPUT_PREVIEW_MAX_LENGTH = 4000;

export const buildAgentStepOutputPreview = (output: string): string =>
  output.length > AGENT_STEP_OUTPUT_PREVIEW_MAX_LENGTH
    ? output.slice(0, AGENT_STEP_OUTPUT_PREVIEW_MAX_LENGTH)
    : output;

export default buildAgentStepOutputPreview;
