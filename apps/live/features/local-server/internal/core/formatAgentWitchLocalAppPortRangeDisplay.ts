import type { AgentWitchLocalAppPortRange } from "./agentWitchLocalAppPortRange.types";

/** Display form used in Settings / Connect (en dash). */
export const formatAgentWitchLocalAppPortRangeDisplay = (
  range: AgentWitchLocalAppPortRange,
): string => `${range.start}–${range.end}`;
