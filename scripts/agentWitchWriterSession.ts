import type { HarnessWriterAgentId } from "./buildWriterCliInvocation";

interface WriterSessionState {
  readonly warmed: boolean;
  readonly conversationStarted: boolean;
}

const writerSessions = new Map<HarnessWriterAgentId, WriterSessionState>();

export const supportsWriterSessionWarmup = (
  writerAgent: HarnessWriterAgentId,
): boolean => writerAgent === "cursor" || writerAgent === "antigravity";

export const supportsWriterSessionContinuation = (
  writerAgent: HarnessWriterAgentId,
): boolean => writerAgent === "cursor";

export const isWriterSessionWarmed = (
  writerAgent: HarnessWriterAgentId,
): boolean => writerSessions.get(writerAgent)?.warmed === true;

export const markWriterSessionWarmed = (
  writerAgent: HarnessWriterAgentId,
): void => {
  const current = writerSessions.get(writerAgent);
  writerSessions.set(writerAgent, {
    warmed: true,
    conversationStarted: current?.conversationStarted ?? false,
  });
};

export const isWriterConversationStarted = (
  writerAgent: HarnessWriterAgentId,
): boolean => writerSessions.get(writerAgent)?.conversationStarted === true;

export const markWriterConversationStarted = (
  writerAgent: HarnessWriterAgentId,
): void => {
  const current = writerSessions.get(writerAgent);
  writerSessions.set(writerAgent, {
    warmed: current?.warmed ?? true,
    conversationStarted: true,
  });
};

export const clearWriterSession = (writerAgent: HarnessWriterAgentId): void => {
  writerSessions.delete(writerAgent);
};

export const resetWriterSessionsForTests = (): void => {
  writerSessions.clear();
};

export const buildWriterSessionWarmupMessage = (
  writerAgent: HarnessWriterAgentId,
): string => {
  if (writerAgent === "cursor") {
    return "Preparing Cursor for this session…\n";
  }

  if (writerAgent === "antigravity") {
    return "Preparing Antigravity for this session…\n";
  }

  return "";
};

const WRITER_SESSION_READY_LABELS: Record<HarnessWriterAgentId, string> = {
  "claude-cli": "Claude",
  codex: "Codex",
  cursor: "Cursor",
  antigravity: "Antigravity",
};

export const buildWriterSessionReadyMessage = (
  writerAgent: HarnessWriterAgentId,
): string =>
  `${WRITER_SESSION_READY_LABELS[writerAgent]} is ready on your Mac.\nSend a task from the box below when you are ready.\n`;
