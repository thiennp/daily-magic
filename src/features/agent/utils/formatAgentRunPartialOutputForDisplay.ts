import {
  parseAgentLiveProgressUpdates,
  type AgentLiveProgressUpdate,
} from "@/features/agent/utils/parseAgentLiveProgressUpdates";
import { stripAgentRunCliNoise } from "@/features/agent/utils/stripAgentRunCliNoise";
import { stripAgentRunProgressFromOutput } from "@/features/agent/utils/stripAgentRunProgressFromOutput";
import {
  parseAgentRunPartialOutputSections,
  type AgentRunPartialOutputSection,
} from "@/features/dispatch/utils/parseAgentRunPartialOutputSections";

export type FormattedAgentRunPartialOutput = {
  readonly progressUpdates: readonly AgentLiveProgressUpdate[];
  readonly sections: readonly AgentRunPartialOutputSection[];
};

export const formatAgentRunPartialOutputForDisplay = (
  partialOutput: string,
): FormattedAgentRunPartialOutput => {
  const cleanOutput = stripAgentRunCliNoise(partialOutput);
  const remainingText = stripAgentRunProgressFromOutput(cleanOutput);

  return {
    progressUpdates: parseAgentLiveProgressUpdates(cleanOutput),
    sections: parseAgentRunPartialOutputSections(remainingText),
  };
};

export const hasFormattedAgentRunPartialOutput = (
  formatted: FormattedAgentRunPartialOutput,
): boolean =>
  formatted.progressUpdates.length > 0 || formatted.sections.length > 0;
