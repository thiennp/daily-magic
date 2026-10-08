import { AgentRunStatus } from "@/lib/dispatch/AgentRunStatus.constant";

/**
 * db0bd005 (Testi run 4 @298): a finished run with no usable summary or
 * output still says what happened instead of an empty section.
 */
export const resolveProjectReportFallbackBody = (input: {
  readonly status: string;
  readonly reasonLine: string | null;
  readonly resultExitCode?: number | null;
}): string => {
  if (input.status === AgentRunStatus.COMPLETED) {
    return "Finished on your computer. No summary was captured.";
  }
  if (input.status === AgentRunStatus.FAILED) {
    if (input.reasonLine !== null && input.reasonLine.length > 0) {
      return input.reasonLine;
    }
    const exitPart =
      typeof input.resultExitCode === "number" && input.resultExitCode !== 0
        ? ` (exit ${input.resultExitCode})`
        : "";
    return `Failed on your computer${exitPart}. No agent output was captured.`;
  }
  if (input.status === AgentRunStatus.EXPIRED) {
    return "Timed out on your computer.";
  }
  return input.status === AgentRunStatus.DENIED ? "Denied." : "";
};
