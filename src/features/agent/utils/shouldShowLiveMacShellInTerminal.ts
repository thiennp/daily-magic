import type { AgentMacShellStatus } from "@/features/agent/utils/reduceAgentMacShellMessage";

/** Live PTY should render inside the Local Mac terminal chrome. */
export const shouldShowLiveMacShellInTerminal = (
  status: AgentMacShellStatus | undefined,
  options?: {
    readonly preferStreamMirror?: boolean;
  },
): boolean => {
  if (options?.preferStreamMirror === true) {
    return false;
  }

  return status === "open" || status === "opening";
};

/** Prefer pipe/stream mirror when Live PTY has no data but stream text exists. */
export const shouldPreferStreamMirrorOverLiveShell = (input: {
  readonly streamOutput: string;
  readonly hasLiveShellData: boolean;
  readonly terminalStatus: string;
}): boolean => {
  if (input.hasLiveShellData) {
    return false;
  }

  if (input.streamOutput.trim().length === 0) {
    return false;
  }

  return (
    input.terminalStatus === "streaming" ||
    input.terminalStatus === "finished" ||
    input.terminalStatus === "error" ||
    input.terminalStatus === "starting"
  );
};
