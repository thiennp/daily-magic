import type { HarnessWriterAgentId } from "../../../../../../scripts/buildWriterCliInvocation";
import { parseClaudeCliPrintResult } from "../../../../../../scripts/dispatch/parseClaudeCliPrintResult";

export type PromptSdlcWriterResult =
  | { readonly ok: true; readonly text: string }
  | { readonly ok: false; readonly errorMessage: string };

const CODEX_TRUST_ERROR =
  "Codex stopped with a terminal error (not a trusted git directory) and did not return a prompt.";

const STDIN_ERROR =
  "The writer waited on terminal input and did not return a prompt.";

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
  if (replyFile.length > 0) {
    return { ok: true, text: replyFile };
  }

  const failure = describePromptSdlcWriterTerminalFailure(
    `${input.stdout}\n${input.stderr}`,
  );
  if (failure !== null) {
    return { ok: false, errorMessage: failure };
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
