export type HarnessWriterAgentId =
  "claude-cli" | "codex" | "cursor" | "antigravity";

export const isHarnessWriterAgentId = (
  value: string,
): value is HarnessWriterAgentId =>
  value === "claude-cli" ||
  value === "codex" ||
  value === "cursor" ||
  value === "antigravity";
