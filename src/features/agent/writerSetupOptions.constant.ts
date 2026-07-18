import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";

export const WRITER_SETUP_OPTIONS: ReadonlyArray<{
  readonly id: HarnessWriterAgent;
  readonly label: string;
  readonly hint: string;
}> = [
  {
    id: "cursor",
    label: "Cursor",
    hint: "Install and sign in to Cursor on this Mac",
  },
  {
    id: "claude-cli",
    label: "Claude",
    hint: "Install and sign in to Claude on this Mac",
  },
  {
    id: "codex",
    label: "Codex",
    hint: "Install and sign in to Codex on this Mac",
  },
  {
    id: "antigravity",
    label: "Antigravity",
    hint: "Install and sign in to Antigravity on this Mac",
  },
];
