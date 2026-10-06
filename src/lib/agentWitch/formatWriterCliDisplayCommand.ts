import type { HarnessWriterAgent } from "@/lib/agentWitch/harness/types/HarnessWriterAgent.constant";
import type { WriterCliSessionTurn } from "@/lib/agentWitch/writerCliSessionTurn.type";

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
  sessionTurn: WriterCliSessionTurn = "first",
): string => {
  const escaped = escapeShellPrompt(prompt);
  const continueFlag = sessionTurn === "continue" ? "--continue " : "";

  if (writerAgent === "claude-cli") {
    // Display only: AWL also passes --allowedTools and --max-budget-usd
    // (scripts/buildWriterCliInvocation.ts, S0-4 workspace-write profile).
    return `claude ${continueFlag}-p --permission-mode dontAsk --max-turns 30 "${escaped}"`;
  }

  if (writerAgent === "codex") {
    return `codex exec -s workspace-write "${escaped}"`;
  }

  if (writerAgent === "cursor") {
    return `cursor agent ${continueFlag}-p --trust --sandbox enabled "${escaped}"`;
  }

  return `agy ${continueFlag}--sandbox -p "${escaped}"`;
};

export const formatWriterSessionStartDisplayCommand = (
  writerAgent: HarnessWriterAgent,
): string => {
  if (writerAgent === "claude-cli") {
    return "claude -v";
  }

  if (writerAgent === "codex") {
    return "codex --version";
  }

  if (writerAgent === "cursor") {
    return "cursor agent";
  }

  return "agy --version";
};
