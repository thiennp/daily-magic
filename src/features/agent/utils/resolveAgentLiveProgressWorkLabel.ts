import type { AgentLiveTerminalStatus } from "@/features/agent/utils/agentLiveTerminalState.type";
import { AGENT_LIVE_PROGRESS_ACTIVITY_PATTERNS } from "@/features/agent/utils/agentLiveProgressPatterns.constant";

const FALLBACK_DETAIL_MAX_CHARS = 280;
const FALLBACK_DETAIL_MAX_LINES = 3;

export const resolveAgentLiveProgressActivityLabel = (
  cleanedOutput: string,
): string => {
  for (const activity of AGENT_LIVE_PROGRESS_ACTIVITY_PATTERNS) {
    if (activity.pattern.test(cleanedOutput)) {
      return activity.label;
    }
  }
  return "Working on your request";
};

export const hasAgentLiveProgressStartedUserTask = (input: {
  readonly cleanedOutput: string;
  readonly pendingCommandLine?: string | null;
  readonly status: AgentLiveTerminalStatus;
}): boolean => {
  if ((input.pendingCommandLine ?? "").trim().length > 0) {
    return true;
  }
  if (
    input.status === "streaming" ||
    input.status === "waiting_approval" ||
    input.status === "finished"
  ) {
    return true;
  }
  return input.cleanedOutput.length > 0;
};

export const resolveAgentLiveProgressFallbackWorkLabel = (input: {
  readonly needsInput: boolean;
  readonly status: AgentLiveTerminalStatus;
  readonly started: boolean;
  readonly isFinished: boolean;
  readonly cleaned: string;
}): string => {
  if (input.needsInput) {
    return "Waiting for your answer";
  }
  if (input.status === "waiting_approval") {
    return "Waiting for your approval";
  }
  if (input.started && !input.isFinished) {
    return resolveAgentLiveProgressActivityLabel(input.cleaned);
  }
  return "Working on your request";
};

const resolveCleanedOutputSnippet = (cleaned: string): string | null => {
  const lines = cleaned
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
  if (lines.length === 0) {
    return null;
  }

  const snippet = lines.slice(-FALLBACK_DETAIL_MAX_LINES).join("\n");
  if (snippet.length <= FALLBACK_DETAIL_MAX_CHARS) {
    return snippet;
  }
  return `…${snippet.slice(-(FALLBACK_DETAIL_MAX_CHARS - 1))}`;
};

export const resolveAgentLiveProgressFallbackWorkDetail = (input: {
  readonly cleaned: string;
  readonly needsInput: boolean;
  readonly isFinished: boolean;
  readonly pendingQuestion?: string | null;
}): string | null => {
  const question = (input.pendingQuestion ?? "").trim();
  const snippet = resolveCleanedOutputSnippet(input.cleaned);

  if (input.needsInput) {
    if (
      snippet !== null &&
      question.length > 0 &&
      !snippet.includes(question)
    ) {
      return `${snippet}\n\n${question}`;
    }
    if (question.length > 0) {
      return question;
    }
    return snippet;
  }
  if (input.isFinished) {
    return null;
  }
  return snippet ?? "Waiting for the first update from your Mac agent…";
};
