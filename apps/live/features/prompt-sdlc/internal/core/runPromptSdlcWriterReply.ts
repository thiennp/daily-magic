import { spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import {
  buildWriterCliInvocation,
  resolveWriterCliCommands,
  type HarnessWriterAgentId,
} from "../../../../../../scripts/buildWriterCliInvocation";
import {
  buildPromptSdlcWriterArgs,
  readPromptSdlcWriterOutput,
  type PromptSdlcWriterResult,
} from "./readPromptSdlcWriterOutput";

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

/** Runs one prompt-only writer turn in a temp folder so the CLI cannot edit this repo. */
export const runPromptSdlcWriterReply = (input: {
  readonly writerAgent: string;
  readonly prompt: string;
}): Promise<PromptSdlcWriterResult> =>
  new Promise((resolve) => {
    if (!isLocalWriter(input.writerAgent)) {
      resolve({ ok: false, errorMessage: "The writer did not reply." });
      return;
    }

    const writerAgent = input.writerAgent;
    const invocation = buildWriterCliInvocation(
      writerAgent,
      input.prompt,
      resolveWriterCliCommands({}),
    );
    if (invocation === null) {
      resolve({ ok: false, errorMessage: "The writer did not reply." });
      return;
    }

    const cwd = fs.mkdtempSync(path.join(os.tmpdir(), "prompt-sdlc-"));
    const replyPath = path.join(cwd, "reply.txt");
    const args = buildPromptSdlcWriterArgs({
      writerAgent,
      baseArgs: invocation.args,
      replyPath,
    });
    const stdoutChunks: Buffer[] = [];
    const stderrChunks: Buffer[] = [];
    const state = {
      settled: false,
      timer: undefined as NodeJS.Timeout | undefined,
    };
    const child = spawn(invocation.command, [...args], {
      cwd,
      stdio: ["ignore", "pipe", "pipe"],
    });
    const finish = (value: PromptSdlcWriterResult): void => {
      if (state.settled) {
        return;
      }
      state.settled = true;
      clearTimeout(state.timer);
      resolve(value);
    };
    state.timer = setTimeout(() => {
      child.kill("SIGTERM");
      finish({ ok: false, errorMessage: "The writer did not reply." });
    }, WRITER_REPLY_TIMEOUT_MS);
    child.stdout.on("data", (chunk: Buffer | string) => {
      stdoutChunks.push(Buffer.from(chunk));
    });
    child.stderr.on("data", (chunk: Buffer | string) => {
      stderrChunks.push(Buffer.from(chunk));
    });
    child.on("error", () =>
      finish({ ok: false, errorMessage: "The writer did not reply." }),
    );
    child.on("close", () => {
      const replyFileText = fs.existsSync(replyPath)
        ? fs.readFileSync(replyPath, "utf8")
        : null;
      finish(
        readPromptSdlcWriterOutput({
          writerAgent,
          stdout: Buffer.concat(stdoutChunks).toString("utf8"),
          stderr: Buffer.concat(stderrChunks).toString("utf8"),
          replyFileText,
        }),
      );
    });
  });
