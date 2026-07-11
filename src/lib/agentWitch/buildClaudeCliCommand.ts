import isNonEmptyString from "./isNonEmptyString";

export interface ClaudeCliInvocation {
  readonly command: string;
  readonly args: readonly string[];
}

const DEFAULT_CLAUDE_COMMAND = "claude";

const buildClaudeCliCommand = (
  prompt: string,
  claudeCommand: string = DEFAULT_CLAUDE_COMMAND,
): ClaudeCliInvocation | null => {
  if (!isNonEmptyString(prompt)) {
    return null;
  }

  const command = isNonEmptyString(claudeCommand)
    ? claudeCommand.trim()
    : DEFAULT_CLAUDE_COMMAND;

  return {
    command,
    args: ["-p", prompt.trim()],
  };
};

export default buildClaudeCliCommand;
