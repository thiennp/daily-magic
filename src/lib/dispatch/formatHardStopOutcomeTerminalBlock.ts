import type { ResolvedAgentRunOutcome } from "@agent-witch/shared/dispatch";

import { buildAgentRunOutcomePresentation } from "@/lib/dispatch/buildAgentRunOutcomePresentation";

export const formatHardStopOutcomeTerminalBlock = (
  outcome: ResolvedAgentRunOutcome,
): string => {
  const presentation = buildAgentRunOutcomePresentation(outcome.code);

  return `${presentation.title}\n${presentation.body}`;
};
