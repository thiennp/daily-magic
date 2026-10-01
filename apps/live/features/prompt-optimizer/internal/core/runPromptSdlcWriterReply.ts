import { spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import {
  buildWriterCliInvocation,
  resolveWriterCliCommands,
  type HarnessWriterAgentId,
} from "../../../../adapters/writerDispatch";
import {
  bindPromptSdlcWriterAbort,
  PROMPT_SDLC_WRITER_STOPPED,
  terminatePromptSdlcWriterChild,
} from "./bindPromptSdlcWriterAbort";
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

/** Default writer turn budget (evaluate / generalize / judge / improver). */
export const PROMPT_SDLC_WRITER_DEFAULT_TIMEOUT_MS = 180_000;

/**
 * Longer budget for optimize_modules module **run** (Step 4 executePrompt).
 * Override with AGENT_WITCH_WRITER_OPTIMIZE_TIMEOUT_MS.
 */
export const PROMPT_SDLC_WRITER_OPTIMIZE_MODULE_RUN_TIMEOUT_MS = 600_000;

/** Floor for recommended per-run writer budgets. */
export const PROMPT_SDLC_WRITER_TIMEOUT_FLOOR_MS = 120_000;

/** Hard ceiling for recommended per-run writer budgets. */
export const PROMPT_SDLC_WRITER_TIMEOUT_CEILING_MS = 900_000;

const DRY_RUN_ENV = "AGENT_WITCH_PROMPT_SDLC_WRITER_DRY_RUN";
const OPTIMIZE_TIMEOUT_ENV = "AGENT_WITCH_WRITER_OPTIMIZE_TIMEOUT_MS";
const CEILING_TIMEOUT_ENV = "AGENT_WITCH_WRITER_TIMEOUT_CEILING_MS";

const parsePositiveInt = (raw: string | undefined): number | null => {
  if (raw === undefined || raw.trim().length === 0) {
    return null;
  }
  const value = Number.parseInt(raw, 10);
  return Number.isFinite(value) && value > 0 ? value : null;
};

/**
 * Pure-ish banded timeout recommendation from prompt length.
 * Module runs stay at least the optimize default (or env override).
 */
export const recommendPromptSdlcWriterTimeoutMs = (input: {
  readonly promptText: string;
  readonly isModuleRun?: boolean;
  readonly ceilingMs?: number;
}): number => {
  const length = input.promptText.length;
  let recommended: number;
  if (length < 2_000) {
    recommended = 180_000;
  } else if (length < 6_000) {
    recommended = 300_000;
  } else if (length < 12_000) {
    recommended = 450_000;
  } else {
    recommended = 600_000;
  }

  if (input.isModuleRun === true) {
    const envOptimize = parsePositiveInt(process.env[OPTIMIZE_TIMEOUT_ENV]);
    recommended =
      envOptimize ??
      Math.max(recommended, PROMPT_SDLC_WRITER_OPTIMIZE_MODULE_RUN_TIMEOUT_MS);
  }

  const ceiling =
    input.ceilingMs !== undefined &&
    Number.isFinite(input.ceilingMs) &&
    input.ceilingMs > 0
      ? input.ceilingMs
      : (parsePositiveInt(process.env[CEILING_TIMEOUT_ENV]) ??
        PROMPT_SDLC_WRITER_TIMEOUT_CEILING_MS);

  return Math.min(
    ceiling,
    Math.max(PROMPT_SDLC_WRITER_TIMEOUT_FLOOR_MS, recommended),
  );
};

/** Writer timeout; optimize **module runs** (step 4 execute) get the longer budget. */
export const resolvePromptSdlcWriterTimeoutMs = (input?: {
  readonly isModuleRun?: boolean;
  readonly timeoutMs?: number;
}): number => {
  if (
    input?.timeoutMs !== undefined &&
    Number.isFinite(input.timeoutMs) &&
    input.timeoutMs > 0
  ) {
    return input.timeoutMs;
  }
  if (input?.isModuleRun === true) {
    return (
      parsePositiveInt(process.env[OPTIMIZE_TIMEOUT_ENV]) ??
      PROMPT_SDLC_WRITER_OPTIMIZE_MODULE_RUN_TIMEOUT_MS
    );
  }
  return PROMPT_SDLC_WRITER_DEFAULT_TIMEOUT_MS;
};

export const formatPromptSdlcWriterTimeoutMessage = (
  timeoutMs: number,
): string => `The writer timed out after ${timeoutMs}ms.`;

const isLocalWriter = (
  writerAgent: string,
): writerAgent is HarnessWriterAgentId =>
  (LOCAL_WRITERS as readonly string[]).includes(writerAgent);

const isWriterDryRun = (dryRun: boolean | undefined): boolean =>
  dryRun === true || process.env[DRY_RUN_ENV] === "1";

/** Runs one prompt-only writer turn in the folder the user chose. */
export const runPromptSdlcWriterReply = (input: {
  readonly writerAgent: string;
  readonly prompt: string;
  readonly workingDirectory: string;
  readonly timeoutMs?: number;
  readonly signal?: AbortSignal;
  /** Skip spawn; return a stub reply (catalog / validation). Also env AGENT_WITCH_PROMPT_SDLC_WRITER_DRY_RUN=1. */
  readonly dryRun?: boolean;
}): Promise<PromptSdlcWriterResult> =>
  new Promise((resolve) => {
    if (input.signal?.aborted) {
      resolve(PROMPT_SDLC_WRITER_STOPPED);
      return;
    }

    if (isWriterDryRun(input.dryRun)) {
      resolve({
        ok: true,
        text: "[dry-run] Writer spawn skipped.",
        tokens: null,
      });
      return;
    }

    if (!isLocalWriter(input.writerAgent)) {
      resolve({
        ok: false,
        errorMessage: "The writer is not supported on this Mac.",
      });
      return;
    }

    const writerAgent = input.writerAgent;
    const invocation = buildWriterCliInvocation(
      writerAgent,
      input.prompt,
      resolveWriterCliCommands({}),
    );
    if (invocation === null) {
      resolve({
        ok: false,
        errorMessage: "The writer CLI is not available.",
      });
      return;
    }

    if (!fs.existsSync(input.workingDirectory)) {
      resolve({
        ok: false,
        errorMessage: "Choose a folder that exists on this Mac.",
      });
      return;
    }

    const timeoutMs =
      input.timeoutMs !== undefined &&
      Number.isFinite(input.timeoutMs) &&
      input.timeoutMs > 0
        ? input.timeoutMs
        : PROMPT_SDLC_WRITER_DEFAULT_TIMEOUT_MS;

    const replyPath = path.join(
      fs.mkdtempSync(path.join(os.tmpdir(), "prompt-sdlc-")),
      "reply.txt",
    );
    const args = buildPromptSdlcWriterArgs({
      writerAgent,
      baseArgs: invocation.args,
      replyPath,
    });
    const stdoutChunks: Buffer[] = [];
    const stderrChunks: Buffer[] = [];
    const state = {
      settled: false,
      stopReason: null as "timeout" | "abort" | null,
      timer: undefined as NodeJS.Timeout | undefined,
    };
    const child = spawn(invocation.command, [...args], {
      cwd: input.workingDirectory,
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
    bindPromptSdlcWriterAbort(child, input.signal, finish, () => {
      state.stopReason = "abort";
    });
    state.timer = setTimeout(() => {
      state.stopReason = "timeout";
      void terminatePromptSdlcWriterChild(child).then((killSignal) => {
        finish({
          ok: false,
          errorMessage: formatPromptSdlcWriterTimeoutMessage(timeoutMs),
          errorKind: "writer_timeout",
          killSignal,
        });
      });
    }, timeoutMs);
    child.stdout.on("data", (chunk: Buffer | string) => {
      stdoutChunks.push(Buffer.from(chunk));
    });
    child.stderr.on("data", (chunk: Buffer | string) => {
      stderrChunks.push(Buffer.from(chunk));
    });
    child.on("error", () =>
      finish({
        ok: false,
        errorMessage: "The writer failed to start.",
      }),
    );
    child.on("close", () => {
      if (state.settled) {
        return;
      }
      const replyFileText = fs.existsSync(replyPath)
        ? fs.readFileSync(replyPath, "utf8")
        : null;
      const result = readPromptSdlcWriterOutput({
        writerAgent,
        stdout: Buffer.concat(stdoutChunks).toString("utf8"),
        stderr: Buffer.concat(stderrChunks).toString("utf8"),
        replyFileText,
      });
      if (result.ok && state.stopReason !== "abort") {
        finish(result);
        return;
      }
      if (state.stopReason !== null) {
        return;
      }
      finish(result);
    });
  });
