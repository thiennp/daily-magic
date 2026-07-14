import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";

const truncatePrompt = (value: string, maxLength: number = 120): string => {
  const normalized = value.replace(/\s+/g, " ").trim();
  if (normalized.length <= maxLength) {
    return normalized;
  }

  return `${normalized.slice(0, maxLength - 1)}…`;
};

const escapeShellPrompt = (value: string): string =>
  truncatePrompt(value).replace(/"/g, '\\"');

export const formatWriterCliDisplayCommand = (
  writerAgent: HarnessWriterAgent,
  prompt: string,
): string => {
  const escaped = escapeShellPrompt(prompt);

  if (writerAgent === "claude-cli") {
    return `claude -p --dangerously-skip-permissions "${escaped}"`;
  }

  if (writerAgent === "codex") {
    return `codex exec -s danger-full-access "${escaped}"`;
  }

  if (writerAgent === "cursor") {
    return `cursor agent -p --force --trust --sandbox disabled "${escaped}"`;
  }

  return `agy -p --dangerously-skip-permissions "${escaped}"`;
};
