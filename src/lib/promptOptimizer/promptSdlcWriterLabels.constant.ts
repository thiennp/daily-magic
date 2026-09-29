import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";

export const PROMPT_SDLC_WRITER_LABELS: Record<HarnessWriterAgent, string> = {
  "claude-cli": "Claude (terminal)",
  codex: "Codex (ChatGPT)",
  cursor: "Cursor",
  "cursor-cloud": "Cursor Cloud",
  antigravity: "Antigravity",
};
