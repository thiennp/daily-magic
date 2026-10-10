import { spawn } from "node:child_process";
import os from "node:os";

import {
  buildWriterCliInvocation,
  resolveWriterCliCommands,
  type HarnessWriterAgentId,
} from "../../../../adapters/writerDispatch";

import type { AutoSkillCompleter } from "./autoSkill.types";

export type AutoSkillExec = (
  command: string,
  args: readonly string[],
  opts: { readonly timeoutMs: number; readonly cwd?: string },
) => Promise<{ readonly code: number | null; readonly stdout: string }>;

/** Real spawn: resolves with exit code + stdout (never rejects). */
export const execAutoSkillCommand: AutoSkillExec = (command, args, opts) =>
  new Promise((resolve) => {
    const chunks: Buffer[] = [];
    const child = spawn(command, [...args], {
      cwd: opts.cwd ?? os.homedir(),
      stdio: ["ignore", "pipe", "pipe"],
    });
    const timer = setTimeout(() => {
      child.kill("SIGTERM");
      resolve({ code: null, stdout: "" });
    }, opts.timeoutMs);
    child.stdout.on("data", (c: Buffer) => chunks.push(Buffer.from(c)));
    child.on("error", () => {
      clearTimeout(timer);
      resolve({ code: null, stdout: "" });
    });
    child.on("close", (code) => {
      clearTimeout(timer);
      resolve({ code, stdout: Buffer.concat(chunks).toString("utf8") });
    });
  });

const commands = resolveWriterCliCommands({});
const CANDIDATES: readonly HarnessWriterAgentId[] = [
  "codex",
  "claude-cli",
  "cursor",
];

const statusArgs = (
  writer: HarnessWriterAgentId,
): { command: string; args: readonly string[] } | null => {
  if (writer === "codex") {
    return { command: commands.codexCommand, args: ["login", "status"] };
  }
  if (writer === "claude-cli") {
    return { command: commands.claudeCommand, args: ["auth", "status"] };
  }
  if (writer === "cursor") {
    return { command: commands.cursorCommand, args: ["status"] };
  }
  return null;
};

const looksSignedIn = (
  writer: string,
  code: number | null,
  out: string,
): boolean =>
  code === 0 &&
  !/not logged in|"loggedIn":\s*false|not authenticated/i.test(out) &&
  (writer !== "claude-cli" || /"loggedIn":\s*true/.test(out));

/**
 * First signed-in writer CLI; `preferred` (writer of the runs) goes first.
 * `only` is the owner's pick: no other tool is tried.
 */
export const probeSignedInAutoSkillAgent = async (
  preferred: string | null,
  exec: AutoSkillExec = execAutoSkillCommand,
  only: string | null = null,
): Promise<HarnessWriterAgentId | null> => {
  const order =
    only !== null
      ? CANDIDATES.filter((w) => w === only)
      : [
          ...CANDIDATES.filter((w) => w === preferred),
          ...CANDIDATES.filter((w) => w !== preferred),
        ];
  for (const writer of order) {
    const probe = statusArgs(writer);
    if (probe === null) {
      continue;
    }
    const result = await exec(probe.command, probe.args, { timeoutMs: 5_000 });
    if (looksSignedIn(writer, result.code, result.stdout)) {
      return writer;
    }
  }
  return null;
};

const buildReadOnlyInvocation = (
  writer: HarnessWriterAgentId,
  prompt: string,
  scoped: boolean,
): { command: string; args: readonly string[] } | null => {
  if (scoped && writer === "cursor") {
    // Ask mode: answers from the prompt alone, no tools to wander through files.
    return {
      command: commands.cursorCommand,
      args: [
        "-p",
        "--trust",
        "--mode",
        "ask",
        "--sandbox",
        "enabled",
        "--output-format",
        "text",
        prompt,
      ],
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

/** Owner-agent completer: read-only, headless, fails on non-zero exit. */
export const createAgentAutoSkillCompleter =
  (
    writer: HarnessWriterAgentId,
    folderPath: string | undefined,
    exec: AutoSkillExec = execAutoSkillCommand,
    /** Judge from the prompt alone: read-only ask mode and no project folder. */
    scoped = false,
  ): AutoSkillCompleter =>
  async ({ prompt, timeoutMs }) => {
    const invocation = buildReadOnlyInvocation(writer, prompt, scoped);
    if (invocation === null) {
      return { ok: false, reason: "agent_unavailable" };
    }
    const result = await exec(invocation.command, invocation.args, {
      timeoutMs,
      ...(folderPath !== undefined && !scoped ? { cwd: folderPath } : {}),
    });
    if (result.code === null) {
      return { ok: false, reason: "agent_timeout_or_missing" };
    }
    if (result.code !== 0 || result.stdout.trim().length === 0) {
      return { ok: false, reason: `agent_exit_${result.code}` };
    }
    return { ok: true, text: result.stdout };
  };
