import {
  parseAgentLiveProgressUpdates,
  type AgentLiveProgressUpdate,
} from "@/features/agent/utils/parseAgentLiveProgressUpdates";
import { cleanAgentOutputForUser } from "@/features/agent/utils/cleanAgentOutputForUser";
import { stripAgentRunProgressFromOutput } from "@/features/agent/utils/stripAgentRunProgressFromOutput";
import { parseAgentRunPartialOutputSections } from "@/features/dispatch/public-api/presentation";
import type { AgentRunPartialOutputSection } from "@/features/dispatch/public-api/types";

export type FormattedAgentRunPartialOutput = {
  readonly progressUpdates: readonly AgentLiveProgressUpdate[];
  readonly sections: readonly AgentRunPartialOutputSection[];
};

export const formatAgentRunPartialOutputForDisplay = (
  partialOutput: string,
): FormattedAgentRunPartialOutput => {
  const cleanOutput = cleanAgentOutputForUser(partialOutput, {
    keepMarkers: true,
  }).trim();
  // 3945994e / aedfe094: no raw [[MARKER]] syntax reaches "Context so far".
  const remainingText = cleanAgentOutputForUser(
    stripAgentRunProgressFromOutput(cleanOutput),
  ).trim();

  return {
    progressUpdates: parseAgentLiveProgressUpdates(cleanOutput),
    sections: parseAgentRunPartialOutputSections(remainingText),
  };
};

export const hasFormattedAgentRunPartialOutput = (
  formatted: FormattedAgentRunPartialOutput,
): boolean =>
  formatted.progressUpdates.length > 0 || formatted.sections.length > 0;
