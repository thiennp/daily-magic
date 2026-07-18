import type { AgentLiveTerminalStatus } from "@/features/agent/utils/agentLiveTerminalState.type";
import { shouldPreferStreamMirrorOverLiveShell } from "@/features/agent/utils/shouldShowLiveMacShellInTerminal";

export const resolvePreferStreamMirrorOverLiveShell = (input: {
  readonly output: string;
  readonly status: AgentLiveTerminalStatus;
  readonly macShellChunkSeq: number;
  readonly macShellLatestChunk: string | null;
}): boolean => {
  const hasLiveShellData =
    input.macShellChunkSeq > 0 ||
    (input.macShellLatestChunk !== null &&
      input.macShellLatestChunk.length > 0);

  return shouldPreferStreamMirrorOverLiveShell({
    streamOutput: input.output,
    hasLiveShellData,
    terminalStatus: input.status,
  });
};
