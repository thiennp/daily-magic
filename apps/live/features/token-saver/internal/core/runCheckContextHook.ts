import type { CheckContextResult } from "../../public-api/types";
import { CHECK_CONTEXT_CREATE_PROMPT } from "./checkContextHookText.constant";

/** Claude Code `UserPromptSubmit` hook I/O (injected for tests). */
export interface CheckContextHookIo {
  readonly readStdin: () => Promise<string>;
  readonly writeStdout: (text: string) => void;
  readonly writeStderr: (text: string) => void;
  readonly runCheckContext: (
    raw: unknown,
  ) => CheckContextResult | Promise<CheckContextResult>;
}

const HOOK_EVENT_NAME = "UserPromptSubmit";

const readString = (
  record: Readonly<Record<string, unknown>>,
  key: string,
): string | undefined => {
  const value = record[key];
  return typeof value === "string" && value.trim().length > 0
    ? value
    : undefined;
};

/**
 * Map Claude hook stdin JSON (`prompt`, `cwd`, `session_id`, …) to
 * check_context args. Returns null when stdin is not a JSON object.
 */
export const parseClaudeHookInput = (
  raw: string,
): {
  readonly cwd?: string;
  readonly message?: string;
  readonly sessionId?: string;
} | null => {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return null;
  }
  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    return null;
  }
  const record = parsed as Readonly<Record<string, unknown>>;
  const cwd = readString(record, "cwd");
  const message = readString(record, "prompt");
  const sessionId = readString(record, "session_id");
  return {
    ...(cwd !== undefined ? { cwd } : {}),
    ...(message !== undefined ? { message } : {}),
    ...(sessionId !== undefined ? { sessionId } : {}),
  };
};

/** Context text per status: hit → tip, none+promptCreate → create prompt, else nothing. Project notes ride along when present. */
export const toCheckContextHookContext = (
  result: CheckContextResult,
): string | null => {
  const notes = result.notes?.trim() ?? "";
  if (result.status === "hit") {
    const tip = result.tip?.trim() ?? "";
    const parts = [tip, notes].filter((part) => part.length > 0);
    return parts.length > 0 ? parts.join("\n\n") : null;
  }
  if (result.status === "miss" && notes.length > 0) {
    return notes;
  }
  if (result.status === "none" && result.promptCreate === true) {
    return CHECK_CONTEXT_CREATE_PROMPT;
  }
  return null;
};

/** Documented UserPromptSubmit JSON output (`hookSpecificOutput.additionalContext`). */
export const formatClaudeHookOutput = (additionalContext: string): string =>
  `${JSON.stringify({
    hookSpecificOutput: {
      hookEventName: HOOK_EVENT_NAME,
      additionalContext,
    },
  })}\n`;

/**
 * `agent-witch mcp-hook check_context` for Claude Code UserPromptSubmit.
 * Always resolves 0 and never blocks the prompt: bad input / errors log to
 * stderr only and print nothing on stdout.
 */
export const runCheckContextHook = async (
  io: CheckContextHookIo,
): Promise<0> => {
  try {
    const input = parseClaudeHookInput(await io.readStdin());
    if (input === null) {
      io.writeStderr("[agent-witch] mcp-hook: stdin is not a JSON object\n");
      return 0;
    }
    const context = toCheckContextHookContext(await io.runCheckContext(input));
    if (context !== null) {
      io.writeStdout(formatClaudeHookOutput(context));
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    try {
      io.writeStderr(`[agent-witch] mcp-hook: ${message}\n`);
    } catch {
      // stderr unavailable: still never block the prompt.
    }
  }
  return 0;
};
