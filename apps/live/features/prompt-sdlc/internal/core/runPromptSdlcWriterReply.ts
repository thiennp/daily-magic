import { spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import {
  buildWriterCliInvocation,
  resolveWriterCliCommands,
  type HarnessWriterAgentId,
} from "../../../../../../scripts/buildWriterCliInvocation";
import { parseClaudeCliPrintResult } from "../../../../../../scripts/dispatch/parseClaudeCliPrintResult";

const LOCAL_WRITERS = [
  "claude-cli",
  "codex",
  "cursor",
  "antigravity",
] as const satisfies readonly HarnessWriterAgentId[];

const WRITER_REPLY_TIMEOUT_MS = 180_000;

const isLocalWriter = (
  writerAgent: string,
): writerAgent is HarnessWriterAgentId =>
  (LOCAL_WRITERS as readonly string[]).includes(writerAgent);

const readReplyText = (
  writerAgent: HarnessWriterAgentId,
  stdout: string,
  stderr: string,
): string | null => {
  if (writerAgent === "claude-cli") {
    const parsed = parseClaudeCliPrintResult(stdout);
    if (parsed !== null && parsed.text.trim().length > 0) {
      return parsed.text;
    }
  }

  const text = stdout.trim().length > 0 ? stdout.trim() : stderr.trim();
  return text.length > 0 ? text : null;
};

/** Runs one prompt-only writer turn in a temp folder so the CLI cannot edit this repo. */
export const runPromptSdlcWriterReply = (input: {
  readonly writerAgent: string;
  readonly prompt: string;
}): Promise<string | null> =>
  new Promise((resolve) => {
    if (!isLocalWriter(input.writerAgent)) {
      resolve(null);
      return;
    }

    const writerAgent = input.writerAgent;
    const invocation = buildWriterCliInvocation(
      writerAgent,
      input.prompt,
      resolveWriterCliCommands({}),
    );
    if (invocation === null) {
      resolve(null);
      return;
    }

    const cwd = fs.mkdtempSync(path.join(os.tmpdir(), "prompt-sdlc-"));
    const stdoutChunks: Buffer[] = [];
    const stderrChunks: Buffer[] = [];
    const state = {
      settled: false,
      timer: undefined as NodeJS.Timeout | undefined,
    };
    const child = spawn(invocation.command, [...invocation.args], {
      cwd,
      stdio: ["ignore", "pipe", "pipe"],
    });
    const finish = (value: string | null): void => {
      if (state.settled) {
        return;
      }
      state.settled = true;
      clearTimeout(state.timer);
      resolve(value);
    };
    state.timer = setTimeout(() => {
      child.kill("SIGTERM");
      finish(null);
    }, WRITER_REPLY_TIMEOUT_MS);
    child.stdout.on("data", (chunk: Buffer | string) => {
      stdoutChunks.push(Buffer.from(chunk));
    });
    child.stderr.on("data", (chunk: Buffer | string) => {
      stderrChunks.push(Buffer.from(chunk));
    });
    child.on("error", () => finish(null));
    child.on("close", () => {
      finish(
        readReplyText(
          writerAgent,
          Buffer.concat(stdoutChunks).toString("utf8"),
          Buffer.concat(stderrChunks).toString("utf8"),
        ),
      );
    });
  });
