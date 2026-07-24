export const wrapPromptWithPrerecordedAgentRunEstimate = (
  prompt: string,
  input: {
    readonly estimateSeconds: number | null;
    readonly estimateSummary: string;
  },
): string => {
  const estimateLine =
    input.estimateSeconds !== null
      ? `Recorded estimate: ${input.estimateSeconds} seconds.`
      : "A time estimate was recorded locally.";

  return [
    prompt.trim(),
    "",
    "---",
    [
      "Agent Witch already saved a local job report with your time estimate.",
      estimateLine,
      `Report summary: ${input.estimateSummary}`,
      "Proceed with the task immediately.",
      "Do not use [[AWAITING_INPUT]] to ask the operator to confirm the estimate.",
      "Do not emit a new [[WORKING_ESTIMATE]] unless your plan changes significantly.",
    ].join("\n"),
  ].join("\n");
};
