export interface WriterCliInvocation {
  readonly command: string;
  readonly args: readonly string[];
}

export interface WriterCliCommands {
  readonly claudeCommand: string;
  readonly codexCommand: string;
  readonly cursorCommand: string;
  readonly antigravityCommand: string;
}

export type HarnessWriterAgentId =
  "claude-cli" | "codex" | "cursor" | "antigravity";

const DEFAULT_WRITER_CLI_COMMANDS: WriterCliCommands = {
  claudeCommand: "claude",
  codexCommand: "codex",
  cursorCommand: "cursor",
  antigravityCommand: "agy",
};

const isNonEmptyString = (value: string): boolean => value.trim().length > 0;

export const isHarnessWriterAgentId = (
  value: string,
): value is HarnessWriterAgentId =>
  value === "claude-cli" ||
  value === "codex" ||
  value === "cursor" ||
  value === "antigravity";

export const resolveWriterCliCommands = (
  input: Partial<WriterCliCommands>,
): WriterCliCommands => {
  const claudeCommand = input.claudeCommand ?? "";
  const codexCommand = input.codexCommand ?? "";
  const cursorCommand = input.cursorCommand ?? "";
  const antigravityCommand = input.antigravityCommand ?? "";

  return {
    claudeCommand: isNonEmptyString(claudeCommand)
      ? claudeCommand.trim()
      : DEFAULT_WRITER_CLI_COMMANDS.claudeCommand,
    codexCommand: isNonEmptyString(codexCommand)
      ? codexCommand.trim()
      : DEFAULT_WRITER_CLI_COMMANDS.codexCommand,
    cursorCommand: isNonEmptyString(cursorCommand)
      ? cursorCommand.trim()
      : DEFAULT_WRITER_CLI_COMMANDS.cursorCommand,
    antigravityCommand: isNonEmptyString(antigravityCommand)
      ? antigravityCommand.trim()
      : DEFAULT_WRITER_CLI_COMMANDS.antigravityCommand,
  };
};

export type WriterCliSessionTurn = "first" | "continue";

export interface BuildWriterCliInvocationOptions {
  readonly sessionTurn?: WriterCliSessionTurn;
}

export const buildWriterSessionStartInvocation = (
  writerAgent: HarnessWriterAgentId,
  commands: WriterCliCommands,
): WriterCliInvocation => {
  if (writerAgent === "claude-cli") {
    return { command: commands.claudeCommand, args: ["-v"] };
  }

  if (writerAgent === "codex") {
    return { command: commands.codexCommand, args: ["--version"] };
  }

  if (writerAgent === "cursor") {
    return { command: commands.cursorCommand, args: ["agent", "-v"] };
  }

  return { command: commands.antigravityCommand, args: ["--version"] };
};

export const buildWriterCliInvocation = (
  writerAgent: HarnessWriterAgentId,
  instruction: string,
  commands: WriterCliCommands,
  options?: BuildWriterCliInvocationOptions,
): WriterCliInvocation | null => {
  const prompt = instruction.trim();
  if (!isNonEmptyString(prompt)) {
    return null;
  }

  if (writerAgent === "claude-cli") {
    return {
      command: commands.claudeCommand,
      args: ["-p", "--dangerously-skip-permissions", prompt],
    };
  }

  if (writerAgent === "codex") {
    return {
      command: commands.codexCommand,
      args: ["exec", "-s", "danger-full-access", prompt],
    };
  }

  if (writerAgent === "cursor") {
    const sessionArgs =
      options?.sessionTurn === "continue" ? (["--continue"] as const) : [];

    return {
      command: commands.cursorCommand,
      args: [
        "agent",
        ...sessionArgs,
        "-p",
        "--force",
        "--trust",
        "--sandbox",
        "disabled",
        prompt,
      ],
    };
  }

  return {
    command: commands.antigravityCommand,
    args: ["-p", "--dangerously-skip-permissions", prompt],
  };
};
