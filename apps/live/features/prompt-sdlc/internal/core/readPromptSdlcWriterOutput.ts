import type { HarnessWriterAgentId } from "../../../../adapters/writerDispatch";
import { parseClaudeCliPrintResult } from "../../../../adapters/writerDispatch";

export type PromptSdlcWriterResult =
  | { readonly ok: true; readonly text: string }
  | { readonly ok: false; readonly errorMessage: string };

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
  return cliStatusLine(raw);
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
  const failure = describePromptSdlcWriterTerminalFailure(
    [replyFile, input.stdout, input.stderr].join("\n"),
  );
  if (failure !== null) {
    return { ok: false, errorMessage: failure };
  }

  if (replyFile.length > 0) {
    return { ok: true, text: replyFile };
  }

  if (input.writerAgent === "claude-cli") {
    const parsed = parseClaudeCliPrintResult(input.stdout);
    if (parsed !== null && parsed.text.trim().length > 0) {
      return { ok: true, text: parsed.text };
    }
  }

  const text =
    input.stdout.trim().length > 0 ? input.stdout.trim() : input.stderr.trim();
  return text.length > 0
    ? { ok: true, text }
    : { ok: false, errorMessage: "The writer did not reply." };
};
