import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";

export const CODING_TOOL_LABELS: Readonly<Record<HarnessWriterAgent, string>> =
  {
    "claude-cli": "Claude Code",
    codex: "Codex",
    cursor: "Cursor",
    "cursor-cloud": "Cursor Cloud",
    antigravity: "Antigravity",
  };

const ASSIGNABLE: readonly HarnessWriterAgent[] = [
  "claude-cli",
  "codex",
  "cursor",
  "antigravity",
];

export const ASSIGN_CODING_TOOL_OPTIONS = ASSIGNABLE.map((value) => ({
  value,
  label: CODING_TOOL_LABELS[value],
}));
