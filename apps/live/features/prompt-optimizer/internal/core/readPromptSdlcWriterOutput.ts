import type { HarnessWriterAgentId } from "../../../../adapters/writerDispatchPresentation";
import { parseClaudeCliPrintResult } from "../../../../adapters/writerDispatchPresentation";
import { readPromptSdlcWriterTokens } from "./readPromptSdlcWriterTokens";

export type PromptSdlcWriterErrorKind =
  | "writer_timeout"
  | "writer_interrupted"
  | "writer_no_reply"
  | "usage_limit"
  | "action_required"
  | "budget_exceeded";

export type PromptSdlcWriterResult =
  | { readonly ok: true; readonly text: string; readonly tokens: number | null }
  | {
      readonly ok: false;
      readonly errorMessage: string;
      readonly stopped?: boolean;
      readonly errorKind?: PromptSdlcWriterErrorKind;
      readonly killSignal?: "SIGTERM" | "SIGKILL";
    };

/** Timeout-shaped writer failure (message or explicit kind). */
export const isPromptSdlcWriterTimeoutError = (input: {
  readonly errorMessage: string;
  readonly errorKind?: PromptSdlcWriterErrorKind;
}): boolean =>
  input.errorKind === "writer_timeout" ||
  /timed out after/i.test(input.errorMessage);

/** Cursor monthly usage / quota — not a writer timeout. */
const USAGE_LIMIT_ERROR =
  /usage limit|monthly (usage )?limit|hit your (usage )?limit|quota|insufficient credit|resource[_ ]?exhausted|billing|subscription required|rate limit/i;

/** Cursor ActionRequiredError and similar hard stops that need human action. */
const ACTION_REQUIRED_ERROR =
  /ActionRequiredError|action required|authentication required|please run .+login|not logged in|login required|unauthorized|invalid api key|api[_ ]?key/i;

export const classifyPromptSdlcWriterErrorKind = (input: {
  readonly errorMessage: string;
  readonly stopped?: boolean;
  readonly errorKind?: PromptSdlcWriterErrorKind;
}): PromptSdlcWriterErrorKind | undefined => {
  if (input.errorKind !== undefined) {
    return input.errorKind;
  }
  if (input.stopped === true) {
    return "writer_interrupted";
  }
  if (/timed out after/i.test(input.errorMessage)) {
    return "writer_timeout";
  }
  if (/did not reply/i.test(input.errorMessage)) {
    return "writer_no_reply";
  }
  // Prefer usage_limit over action_required when both could match (quota/billing).
  if (USAGE_LIMIT_ERROR.test(input.errorMessage)) {
    return "usage_limit";
  }
  if (ACTION_REQUIRED_ERROR.test(input.errorMessage)) {
    return "action_required";
  }
  return undefined;
};

const CODEX_TRUST_ERROR =
  "Codex stopped with a terminal error (not a trusted git directory) and did not return a prompt.";

const STDIN_ERROR =
  "The writer waited on terminal input and did not return a prompt.";

const CLI_STATUS_ERROR =
  /authentication required|please run .+login|api[_ ]?key|not logged in|login required|unauthorized|invalid api key|quota|usage limit|insufficient credit|rate limit|billing|subscription required/i;

const cliStatusLine = (raw: string): string | null => {
  const trimmed = raw.trim();
  if (
    trimmed.length === 0 ||
    trimmed.length >= 500 ||
    !CLI_STATUS_ERROR.test(trimmed)
  ) {
    return null;
  }
  const line =
    trimmed
      .split("\n")
      .map((item) => item.trim())
      .find((item) => CLI_STATUS_ERROR.test(item)) ?? trimmed;
  return line.length > 280 ? `${line.slice(0, 277)}...` : line;
};

const looksLikeCliStatusReply = (text: string): boolean => {
  const trimmed = text.trim();
  if (trimmed.length === 0 || trimmed.length >= 500) {
    return false;
  }
  if (/^(Error|Warning|Fatal|✖)/i.test(trimmed)) {
    return true;
  }
  return /authentication required|please run .+login|not logged in|login required/i.test(
    trimmed,
  );
};

const readWriterCliStatusFailure = (input: {
  readonly replyFile: string;
  readonly stdout: string;
  readonly stderr: string;
}): string | null =>
  cliStatusLine(input.stdout) ??
  cliStatusLine(input.stderr) ??
  (looksLikeCliStatusReply(input.replyFile)
    ? cliStatusLine(input.replyFile)
    : null);

/** Codex/stdin failures stored as revision text — not login/quota heuristics. */
export const describePromptSdlcWriterTerminalFailure = (
  raw: string,
): string | null => {
  if (/not inside a trusted directory|skip-git-repo-check/i.test(raw)) {
    return CODEX_TRUST_ERROR;
  }
  const trimmed = raw.trim();
  if (
    trimmed.startsWith("Reading additional input from stdin...") &&
    trimmed.length < 500
  ) {
    return STDIN_ERROR;
  }
  return null;
};

/** Writer reply stored on a revision when judgement parsing failed. */
export const readPromptSdlcStoredWriterReplyText = (
  promptText: string,
): string | null => {
  const trimmed = promptText.trim();
  if (trimmed.length === 0) {
    return null;
  }
  const terminal = describePromptSdlcWriterTerminalFailure(trimmed);
  if (terminal !== null) {
    return trimmed;
  }
  return (
    cliStatusLine(trimmed) ??
    (looksLikeCliStatusReply(trimmed) ? trimmed : null)
  );
};

export const buildPromptSdlcWriterArgs = (input: {
  readonly writerAgent: HarnessWriterAgentId;
  readonly baseArgs: readonly string[];
  readonly replyPath: string;
}): readonly string[] => {
  if (input.writerAgent !== "codex") {
    return input.baseArgs;
  }

  return [
    "exec",
    "--skip-git-repo-check",
    "--ephemeral",
    "--color",
    "never",
    "--json",
    "--output-last-message",
    input.replyPath,
    ...input.baseArgs.slice(1),
  ];
};

export const readPromptSdlcWriterOutput = (input: {
  readonly writerAgent: HarnessWriterAgentId;
  readonly stdout: string;
  readonly stderr: string;
  readonly replyFileText: string | null;
}): PromptSdlcWriterResult => {
  const replyFile = input.replyFileText?.trim() ?? "";
  const terminalFailure = describePromptSdlcWriterTerminalFailure(
    [replyFile, input.stdout, input.stderr].join("\n"),
  );
  if (terminalFailure !== null) {
    return { ok: false, errorMessage: terminalFailure };
  }
  const cliFailure = readWriterCliStatusFailure({
    replyFile,
    stdout: input.stdout,
    stderr: input.stderr,
  });
  if (cliFailure !== null) {
    const errorKind = classifyPromptSdlcWriterErrorKind({
      errorMessage: cliFailure,
    });
    return errorKind === undefined
      ? { ok: false, errorMessage: cliFailure }
      : { ok: false, errorMessage: cliFailure, errorKind };
  }

  const tokens = readPromptSdlcWriterTokens(
    [input.stdout, input.stderr, replyFile].join("\n"),
  );
  if (replyFile.length > 0) {
    return { ok: true, text: replyFile, tokens };
  }

  if (input.writerAgent === "claude-cli") {
    const parsed = parseClaudeCliPrintResult(input.stdout);
    if (parsed !== null && parsed.text.trim().length > 0) {
      return { ok: true, text: parsed.text, tokens: parsed.totalTokens };
    }
  }

  const text =
    input.stdout.trim().length > 0 ? input.stdout.trim() : input.stderr.trim();
  return text.length > 0
    ? { ok: true, text, tokens }
    : {
        ok: false,
        errorMessage: "The writer did not reply.",
        errorKind: "writer_no_reply",
      };
};
