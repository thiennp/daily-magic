import { cursorCommandUsesStandaloneAgentBinary } from "../../../../../../scripts/buildWriterCliInvocation";
import {
  buildWriterCliInvocation,
  resolveWriterCliCommands,
  type HarnessWriterAgentId,
} from "../../../../adapters/writerDispatch";

const commands = resolveWriterCliCommands({});

/**
 * Command line for a text-only judging or drafting call: the answer comes from
 * the prompt alone, so the agent runs read-only (Cursor in ask mode on its
 * auto model, Codex read-only, Claude one turn) and never needs a project folder.
 */
export const buildReadOnlyAgentInvocation = (
  writer: HarnessWriterAgentId,
  rawPrompt: string,
  scoped = true,
): { command: string; args: readonly string[] } | null => {
  const trimmed = rawPrompt.trim();
  if (trimmed.length === 0) {
    return null;
  }
  // The prompt is the last argument: one starting with "-" would be read as a flag.
  const prompt = trimmed.startsWith("-") ? ` ${trimmed}` : trimmed;
  if (scoped && writer === "cursor") {
    // Ask mode: answers from the prompt alone, no tools to wander through files.
    const tail = [
      "-p",
      "--trust",
      "--mode",
      "ask",
      "--sandbox",
      "enabled",
      "--model",
      "auto",
      "--output-format",
      "text",
      prompt,
    ];
    return {
      command: commands.cursorCommand,
      args: cursorCommandUsesStandaloneAgentBinary(commands.cursorCommand)
        ? tail
        : ["agent", ...tail],
    };
  }
  if (writer === "codex") {
    return {
      command: commands.codexCommand,
      args: [
        "exec",
        "-s",
        "read-only",
        "-c",
        'approval_policy="never"',
        prompt,
      ],
    };
  }
  if (writer === "claude-cli") {
    return {
      command: commands.claudeCommand,
      args: ["-p", prompt, "--output-format", "text", "--max-turns", "1"],
    };
  }
  return buildWriterCliInvocation(writer, prompt, commands);
};

/** ": <first line>" of what the tool said when it failed, so "out of usage" is visible. */
export const describeAgentFailure = (result: {
  readonly stdout: string;
  readonly stderr?: string;
}): string => {
  const line = `${result.stderr ?? ""}\n${result.stdout}`
    .split("\n")
    .map((l) => l.trim())
    .find((l) => l.length > 0);
  return line === undefined ? "" : `: ${line.slice(0, 160)}`;
};
