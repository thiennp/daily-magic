import type { AgentMacShellStatus } from "@/features/agent/utils/reduceAgentMacShellMessage";

/** Live PTY should render inside the Local Mac terminal chrome. */
export const shouldShowLiveMacShellInTerminal = (
  status: AgentMacShellStatus | undefined,
): boolean => status === "open" || status === "opening";
