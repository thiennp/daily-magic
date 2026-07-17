import type { AgentMacShellStatus } from "@/features/agent/utils/reduceAgentMacShellMessage";

export interface AgentMacShellPanelProps {
  readonly macShellStatus?: AgentMacShellStatus;
  readonly macShellCanWrite?: boolean;
  readonly macShellLatestChunk?: string | null;
  readonly macShellChunkSeq?: number;
  readonly macShellClearToken?: number;
  readonly onMacShellInput?: (data: string) => void;
  readonly onMacShellResize?: (cols: number, rows: number) => void;
  readonly onMacShellClose?: () => void;
}
