import {
  parseAgentLiveProgressUpdates,
  type AgentLiveProgressUpdate,
} from "@/features/agent/utils/parseAgentLiveProgressUpdates";
import { stripAgentRunProgressFromOutput } from "@/features/agent/utils/stripAgentRunProgressFromOutput";

export type FormattedAgentRunPartialOutput = {
  readonly progressUpdates: readonly AgentLiveProgressUpdate[];
  readonly remainingText: string;
};

export const formatAgentRunPartialOutputForDisplay = (
  partialOutput: string,
): FormattedAgentRunPartialOutput => ({
  progressUpdates: parseAgentLiveProgressUpdates(partialOutput),
  remainingText: stripAgentRunProgressFromOutput(partialOutput),
});

export const hasFormattedAgentRunPartialOutput = (
  formatted: FormattedAgentRunPartialOutput,
): boolean =>
  formatted.progressUpdates.length > 0 || formatted.remainingText.length > 0;
