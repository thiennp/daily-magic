export const HARNESS_WRITER_AGENTS = [
  "claude-cli",
  "codex",
  "cursor",
  "cursor-cloud",
  "antigravity",
] as const;

export type HarnessWriterAgent = (typeof HARNESS_WRITER_AGENTS)[number];
