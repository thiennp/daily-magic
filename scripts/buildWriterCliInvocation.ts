import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import {
  LOCAL_CLI_CLAUDE_ALLOWED_TOOLS,
  LOCAL_CLI_RUN_LIMITS,
} from "./localCliRunLimits.constant";

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

/** Cursor ships a standalone `agent` binary; older installs use `cursor agent …`. */
export const cursorCommandUsesStandaloneAgentBinary = (
  cursorCommand: string,
): boolean => {
  const base = path.basename(cursorCommand.trim()).toLowerCase();
  return base === "agent" || base === "cursor-agent";
};

const defaultCursorCommand = (): string => {
  const home = os.homedir();
  const standaloneAgent = path.join(home, ".local", "bin", "agent");
  if (fs.existsSync(standaloneAgent)) {
    return standaloneAgent;
  }
  const cursorAgent = path.join(home, ".local", "bin", "cursor-agent");
  if (fs.existsSync(cursorAgent)) {
    return cursorAgent;
  }
  return DEFAULT_WRITER_CLI_COMMANDS.cursorCommand;
};

const resolveCursorCommand = (cursorCommand: string): string => {
  const trimmed = cursorCommand.trim();
  if (
    !isNonEmptyString(trimmed) ||
    trimmed === DEFAULT_WRITER_CLI_COMMANDS.cursorCommand
  ) {
    return defaultCursorCommand();
  }
  return trimmed;
};

const cursorAgentSubcommandArgs = (
  cursorCommand: string,
  tail: readonly string[],
): readonly string[] =>
  cursorCommandUsesStandaloneAgentBinary(cursorCommand)
    ? tail
    : ["agent", ...tail];

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
    cursorCommand: resolveCursorCommand(cursorCommand),
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
    return {
      command: commands.cursorCommand,
      args: cursorAgentSubcommandArgs(commands.cursorCommand, ["-v"]),
    };
  }

  return { command: commands.antigravityCommand, args: ["--version"] };
};

/**
 * S0-4 workspace-write profile (replaces the old fixed full bypass; there is
 * no "full" option). Limits come from localCliRunLimits.constant.ts.
 * Claude: no permission prompts, only the allowlist runs; turn + budget caps.
 */
export const CLAUDE_WORKSPACE_WRITE_ARGS: readonly string[] = [
  "--permission-mode",
  "dontAsk",
  "--allowedTools",
  LOCAL_CLI_CLAUDE_ALLOWED_TOOLS.join(","),
  "--max-turns",
  String(LOCAL_CLI_RUN_LIMITS.maxTurns),
  "--max-budget-usd",
  LOCAL_CLI_RUN_LIMITS.maxBudgetUsd.toFixed(2),
];

/**
 * Codex: writes only inside the workspace (no network). `codex exec` rejects
 * `-a`; it already runs with approval_policy=never, so the config override
 * states it explicitly and beats any ~/.codex/config.toml value.
 */
export const CODEX_WORKSPACE_WRITE_ARGS: readonly string[] = [
  "-s",
  "workspace-write",
  "-c",
  'approval_policy="never"',
];

/** Cursor: sandbox on, no --force (commands are not force-allowed). */
export const CURSOR_WORKSPACE_WRITE_ARGS: readonly string[] = [
  "--trust",
  "--sandbox",
  "enabled",
];

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

  const continueArgs =
    options?.sessionTurn === "continue" ? (["--continue"] as const) : [];

  if (writerAgent === "claude-cli") {
    return {
      command: commands.claudeCommand,
      args: [
        ...continueArgs,
        "-p",
        "--output-format",
        "json",
        ...CLAUDE_WORKSPACE_WRITE_ARGS,
        prompt,
      ],
    };
  }

  if (writerAgent === "codex") {
    return {
      command: commands.codexCommand,
      args: ["exec", ...CODEX_WORKSPACE_WRITE_ARGS, prompt],
    };
  }

  if (writerAgent === "cursor") {
    return {
      command: commands.cursorCommand,
      args: cursorAgentSubcommandArgs(commands.cursorCommand, [
        ...continueArgs,
        "-p",
        ...CURSOR_WORKSPACE_WRITE_ARGS,
        prompt,
      ]),
    };
  }

  // Antigravity: `--sandbox` + merged `permissions.allow` (see
  // mergeAntigravityCliHeadlessPermissions.ts). No argv permission bypass.
  return {
    command: commands.antigravityCommand,
    args: [...continueArgs, "--sandbox", "-p", prompt],
  };
};
