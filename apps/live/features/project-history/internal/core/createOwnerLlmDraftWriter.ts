import { spawn } from "node:child_process";
import os from "node:os";

import {
  buildWriterCliInvocation,
  resolveWriterCliCommands,
  type HarnessWriterAgentId,
} from "../../../../adapters/writerDispatch";
import { PROJECT_HISTORY_SKILLGEN_OWNER_LLM_DRY_RUN_ENV } from "./projectHistory.constants";
import {
  buildOwnerLlmSkillReflectPrompt,
  buildOwnerLlmSkillWritePrompt,
} from "./buildOwnerLlmSkillDraftPrompt";
import { extractOwnerLlmSkillMarkdown } from "./extractOwnerLlmSkillMarkdown";
import type {
  OwnerLlmDraftWriter,
  OwnerLlmDraftWriterInput,
  OwnerLlmDraftWriterResult,
} from "./ownerLlmDraftWriter.port";

const PRIMARY: HarnessWriterAgentId = "cursor";
const FALLBACK: HarnessWriterAgentId = "codex";
const DEFAULT_TIMEOUT_MS = 180_000;

export type OwnerLlmCliRunner = (input: {
  readonly writerAgent: HarnessWriterAgentId;
  readonly prompt: string;
  readonly timeoutMs: number;
}) => Promise<
  | { readonly ok: true; readonly text: string; readonly tokensUsed: number }
  | {
      readonly ok: false;
      readonly reason: string;
      readonly tokensUsed: number;
    }
>;

const estimateTokens = (text: string): number => Math.ceil(text.length / 4);

/** Default spawn runner: Cursor/Codex via shared writerDispatch. */
export const runOwnerLlmCliTurn: OwnerLlmCliRunner = (input) =>
  new Promise((resolve) => {
    const invocation = buildWriterCliInvocation(
      input.writerAgent,
      input.prompt,
      resolveWriterCliCommands({}),
    );
    if (invocation === null) {
      resolve({
        ok: false,
        reason: "writer_cli_unavailable",
        tokensUsed: 0,
      });
      return;
    }
    const stdout: Buffer[] = [];
    const stderr: Buffer[] = [];
    const child = spawn(invocation.command, [...invocation.args], {
      cwd: os.homedir(),
      stdio: ["ignore", "pipe", "pipe"],
    });
    let settled = false;
    const finish = (value: Awaited<ReturnType<OwnerLlmCliRunner>>): void => {
      if (settled) {
        return;
      }
      settled = true;
      clearTimeout(timer);
      resolve(value);
    };
    const timer = setTimeout(() => {
      child.kill("SIGTERM");
      finish({
        ok: false,
        reason: "writer_timeout",
        tokensUsed: 0,
      });
    }, input.timeoutMs);
    child.stdout.on("data", (chunk: Buffer | string) => {
      stdout.push(Buffer.from(chunk));
    });
    child.stderr.on("data", (chunk: Buffer | string) => {
      stderr.push(Buffer.from(chunk));
    });
    child.on("error", () =>
      finish({
        ok: false,
        reason: "writer_start_failed",
        tokensUsed: 0,
      }),
    );
    child.on("close", (code) => {
      if (code !== 0) {
        // A signed-out / failing CLI prints an error and exits non-zero; treating
        // that as success skipped the Codex fallback and yielded unparseable text.
        finish({ ok: false, reason: `writer_exit_${code}`, tokensUsed: 0 });
        return;
      }
      const text = `${Buffer.concat(stdout).toString("utf8")}\n${Buffer.concat(stderr).toString("utf8")}`;
      finish({
        ok: true,
        text,
        tokensUsed: estimateTokens(input.prompt) + estimateTokens(text),
      });
    });
  });

const DRY_RUN_SKILL = `---
name: history-skill-dry-run
description: Stub skill from owner-LLM dry-run (no CLI spawn).
version: 0.1.0
source_message_ids: []
status: draft
---
## When to use
Dry-run only.

## Inputs
- None

## Steps
1. Replace this stub with a real draft
2. Verify frontmatter and sections

## Pitfalls
- Dry-run never calls Cursor or Codex

## Verification
- Confirm SKILL.md validates locally
`;

const tryAgents = async (
  runner: OwnerLlmCliRunner,
  prompt: string,
  timeoutMs: number,
): Promise<Awaited<ReturnType<OwnerLlmCliRunner>>> => {
  const primary = await runner({
    writerAgent: PRIMARY,
    prompt,
    timeoutMs,
  });
  if (primary.ok) {
    return primary;
  }
  const fallback = await runner({
    writerAgent: FALLBACK,
    prompt,
    timeoutMs,
  });
  if (fallback.ok) {
    return fallback;
  }
  return {
    ok: false,
    reason: `cursor:${primary.reason};codex:${fallback.reason}`,
    tokensUsed: primary.tokensUsed + fallback.tokensUsed,
  };
};

/**
 * Step 10 — production OwnerLlmDraftWriter: Cursor first, Codex fallback
 * (same writerDispatch path as Prompt Optimizer). Dry-run via env for tests.
 */
export const createOwnerLlmDraftWriter = (
  deps: {
    readonly runCli?: OwnerLlmCliRunner;
    readonly timeoutMs?: number;
    readonly dryRun?: boolean;
  } = {},
): OwnerLlmDraftWriter => {
  const runner = deps.runCli ?? runOwnerLlmCliTurn;
  const timeoutMs = deps.timeoutMs ?? DEFAULT_TIMEOUT_MS;
  const dryRun =
    deps.dryRun === true ||
    process.env[PROJECT_HISTORY_SKILLGEN_OWNER_LLM_DRY_RUN_ENV] === "1";

  return async (
    input: OwnerLlmDraftWriterInput,
  ): Promise<OwnerLlmDraftWriterResult> => {
    if (dryRun) {
      return {
        ok: true,
        skillMarkdown: DRY_RUN_SKILL,
        tokensUsed: 1,
      };
    }

    let reflection: string | undefined;
    let tokensUsed = 0;
    if (input.mode === "reflect_then_write") {
      const reflected = await tryAgents(
        runner,
        buildOwnerLlmSkillReflectPrompt({
          scrubbedTranscript: input.scrubbedTranscript,
          similarDraftHints: input.similarDraftHints,
        }),
        timeoutMs,
      );
      tokensUsed += reflected.tokensUsed;
      if (!reflected.ok) {
        return {
          ok: false,
          reason: reflected.reason,
          tokensUsed,
        };
      }
      reflection = reflected.text;
    }

    const written = await tryAgents(
      runner,
      buildOwnerLlmSkillWritePrompt({
        scrubbedTranscript: input.scrubbedTranscript,
        similarDraftHints: input.similarDraftHints,
        mode: input.mode,
        reflection,
      }),
      timeoutMs,
    );
    tokensUsed += written.tokensUsed;
    if (!written.ok) {
      return { ok: false, reason: written.reason, tokensUsed };
    }
    const skillMarkdown = extractOwnerLlmSkillMarkdown(written.text);
    if (skillMarkdown === null) {
      return {
        ok: false,
        reason: "empty_or_unparseable_skill_markdown",
        tokensUsed,
      };
    }
    return { ok: true, skillMarkdown, tokensUsed };
  };
};
