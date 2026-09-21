import type { ResolvedAgentRunOutcome } from "@agent-witch/shared/dispatch";

import { buildAgentRunOutcomePresentation } from "@/lib/dispatch/buildAgentRunOutcomePresentation";

export const formatHardStopOutcomeTerminalBlock = (
  outcome: ResolvedAgentRunOutcome,
): string => {
  const presentation = buildAgentRunOutcomePresentation(
    outcome.code,
    outcome.resetHint,
  );

  return [
    presentation.title,
    `Stopped reason: ${presentation.detail}`,
    presentation.nextStep,
  ].join("\n");
};
