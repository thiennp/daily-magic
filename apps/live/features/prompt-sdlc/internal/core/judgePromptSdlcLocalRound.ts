import {
  buildPromptSdlcJudgePrompt,
  buildPromptSdlcRunPrompt,
  buildPromptSdlcTokenReviewPrompt,
  PROMPT_SDLC_STOP_USER,
} from "../../../../adapters/promptSdlcAwcCore";
import { applyPromptSdlcLocalJudgeReply } from "./applyPromptSdlcLocalReply";
import { appendPromptSdlcLocalTokenReview } from "./appendPromptSdlcLocalTokenReview";
import {
  describePromptSdlcRunEvidence,
  readPromptSdlcWorkspaceSnapshot,
} from "./collectPromptSdlcRunEvidence";
import {
  capturePromptSdlcRestorePoint,
  revertPromptSdlcRunChanges,
} from "./revertPromptSdlcRunChanges";
import { PROMPT_SDLC_MANUAL_ACTOR } from "./choosePromptSdlcLocalModels";
import type {
  PromptSdlcLocalCycle,
  PromptSdlcLocalRevision,
  PromptSdlcLocalRun,
} from "./promptSdlcLocalCycle.type";
import { promptSdlcLocalWorkingDirectory } from "./promptSdlcLocalFolder";
import { runPromptSdlcWriterReply } from "./runPromptSdlcWriterReply";

const failCycle = (
  cycle: PromptSdlcLocalCycle,
  errorMessage: string,
): PromptSdlcLocalCycle => ({
  ...cycle,
  status: "failed",
  errorMessage,
  judgePhase: undefined,
  updatedAt: new Date().toISOString(),
});

const stoppedCycle = (cycle: PromptSdlcLocalCycle): PromptSdlcLocalCycle => ({
  ...cycle,
  status: "stopped",
  errorMessage: PROMPT_SDLC_STOP_USER,
  judgePhase: undefined,
  updatedAt: new Date().toISOString(),
});

const withRun = (
  cycle: PromptSdlcLocalCycle,
  run: PromptSdlcLocalRun,
): PromptSdlcLocalCycle => ({
  ...cycle,
  judgePhase: "scoring",
  updatedAt: new Date().toISOString(),
  revisions: cycle.revisions.map((item) =>
    item.roundNumber === cycle.currentRound ? { ...item, run } : item,
  ),
});

const runnerFor = (cycle: PromptSdlcLocalCycle): string | null => {
  if (cycle.judgeModel !== PROMPT_SDLC_MANUAL_ACTOR) {
    return cycle.judgeModel;
  }
  if (cycle.improverModel !== PROMPT_SDLC_MANUAL_ACTOR) {
    return cycle.improverModel;
  }
  return null;
};

const executePrompt = async (input: {
  readonly cycle: PromptSdlcLocalCycle;
  readonly revision: PromptSdlcLocalRevision;
  readonly runner: string;
  readonly signal?: AbortSignal;
  readonly onWriterFailure?: (writer: string) => void;
}): Promise<
  | { readonly ok: true; readonly run: PromptSdlcLocalRun }
  | { readonly ok: false; readonly cycle: PromptSdlcLocalCycle }
> => {
  const workingDirectory = promptSdlcLocalWorkingDirectory(input.cycle);
  const before = readPromptSdlcWorkspaceSnapshot({
    workingDirectory,
    promptText: input.revision.promptText,
    instructions: input.cycle.judgeInstructions,
  });
  const restorePoint = capturePromptSdlcRestorePoint({
    workingDirectory,
    git: before.git,
    namedPaths: before.paths,
  });
  const startedMs = Date.now();
  const reply = await runPromptSdlcWriterReply({
    writerAgent: input.runner,
    workingDirectory,
    prompt: buildPromptSdlcRunPrompt({
      promptText: input.revision.promptText,
      instructions: input.cycle.judgeInstructions,
    }),
    signal: input.signal,
  });
  const evidence = reply.ok
    ? describePromptSdlcRunEvidence({
        workingDirectory,
        before,
        writerReply: reply.text,
      })
    : null;
  const reverted = revertPromptSdlcRunChanges(restorePoint);
  if (!reply.ok) {
    if (reply.stopped === true || input.signal?.aborted === true) {
      return { ok: false, cycle: stoppedCycle(input.cycle) };
    }
    input.onWriterFailure?.(input.runner);
    return { ok: false, cycle: failCycle(input.cycle, reply.errorMessage) };
  }
  if (!reverted.ok || evidence === null) {
    return {
      ok: false,
      cycle: failCycle(
        input.cycle,
        reverted.ok
          ? "Could not put the folder back after the run."
          : reverted.errorMessage,
      ),
    };
  }
  return {
    ok: true,
    run: {
      output: reply.text.trim(),
      tokens: reply.tokens,
      delayMs: Date.now() - startedMs,
      lookedAt: evidence.lookedAt,
      evidence: evidence.evidence,
    },
  };
};

const resolvePromptRun = async (input: {
  readonly cycle: PromptSdlcLocalCycle;
  readonly revision: PromptSdlcLocalRevision;
  readonly runner: string | null;
  readonly signal?: AbortSignal;
  readonly onWriterFailure?: (writer: string) => void;
}): Promise<
  | { readonly ok: true; readonly run: PromptSdlcLocalRun }
  | { readonly ok: false; readonly cycle: PromptSdlcLocalCycle }
  | null
> => {
  if (input.revision.run !== undefined) {
    return { ok: true, run: input.revision.run };
  }
  if (input.runner === null) {
    return null;
  }
  return executePrompt({
    cycle: input.cycle,
    revision: input.revision,
    runner: input.runner,
    signal: input.signal,
    onWriterFailure: input.onWriterFailure,
  });
};

const withTokenReview = (
  cycle: PromptSdlcLocalCycle,
  tokenReview: string,
): PromptSdlcLocalCycle => ({
  ...cycle,
  revisions: cycle.revisions.map((item) =>
    item.roundNumber !== cycle.currentRound || item.run === undefined
      ? item
      : { ...item, run: { ...item.run, tokenReview } },
  ),
});

const reviewTokenSpend = async (input: {
  readonly cycle: PromptSdlcLocalCycle;
  readonly run: PromptSdlcLocalRun;
  readonly promptText: string;
  readonly reviewer: string | null;
  readonly signal?: AbortSignal;
  readonly onProgress?: (cycle: PromptSdlcLocalCycle) => void;
}): Promise<
  | {
      readonly kind: "suggestion";
      readonly text: string;
      readonly tokens: number | null;
    }
  | { readonly kind: "stopped"; readonly cycle: PromptSdlcLocalCycle }
> => {
  const existing = input.run.tokenReview?.trim() ?? "";
  if (existing.length > 0 || input.reviewer === null) {
    return { kind: "suggestion", text: existing, tokens: null };
  }
  const reviewing = { ...input.cycle, judgePhase: "reviewing" as const };
  input.onProgress?.(reviewing);
  const reply = await runPromptSdlcWriterReply({
    writerAgent: input.reviewer,
    workingDirectory: promptSdlcLocalWorkingDirectory(input.cycle),
    prompt: buildPromptSdlcTokenReviewPrompt({
      tokens: input.run.tokens,
      delayMs: input.run.delayMs,
      promptText: input.promptText,
      evidence: input.run.evidence ?? input.run.output,
    }),
    signal: input.signal,
  });
  if (!reply.ok) {
    if (reply.stopped === true || input.signal?.aborted === true) {
      return { kind: "stopped", cycle: stoppedCycle(input.cycle) };
    }
    return { kind: "suggestion", text: "", tokens: null };
  }
  return {
    kind: "suggestion",
    text: reply.text.trim(),
    tokens: reply.tokens,
  };
};

export const judgePromptSdlcLocalRound = async (input: {
  readonly cycle: PromptSdlcLocalCycle;
  readonly revision: PromptSdlcLocalRevision;
  readonly onWriterFailure?: (writer: string) => void;
  readonly signal?: AbortSignal;
  readonly onProgress?: (cycle: PromptSdlcLocalCycle) => void;
}): Promise<PromptSdlcLocalCycle> => {
  const { cycle, revision } = input;
  const runner = runnerFor(cycle);
  const executed = await resolvePromptRun({
    cycle,
    revision,
    runner,
    signal: input.signal,
    onWriterFailure: input.onWriterFailure,
  });
  if (executed === null) {
    return cycle;
  }
  if (!executed.ok) {
    return executed.cycle;
  }

  const scoring =
    revision.run === undefined ? withRun(cycle, executed.run) : cycle;
  if (revision.run === undefined) {
    input.onProgress?.(scoring);
  }
  if (cycle.judgeModel === PROMPT_SDLC_MANUAL_ACTOR) {
    const review = await reviewTokenSpend({
      cycle: scoring,
      run: executed.run,
      promptText: revision.promptText,
      reviewer: runner,
      signal: input.signal,
      onProgress: input.onProgress,
    });
    return review.kind === "stopped"
      ? review.cycle
      : { ...withTokenReview(scoring, review.text), judgePhase: undefined };
  }

  const reply = await runPromptSdlcWriterReply({
    writerAgent: cycle.judgeModel,
    workingDirectory: promptSdlcLocalWorkingDirectory(cycle),
    prompt: buildPromptSdlcJudgePrompt({
      goal: cycle.goal,
      lookedAt: executed.run.lookedAt ?? "the writer reply",
      evidence: executed.run.evidence ?? executed.run.output,
      tokens: executed.run.tokens,
      delayMs: executed.run.delayMs,
      passScore: cycle.passScore,
      instructions: cycle.judgeInstructions,
    }),
    signal: input.signal,
  });
  if (!reply.ok) {
    if (reply.stopped === true || input.signal?.aborted === true) {
      return stoppedCycle(scoring);
    }
    input.onWriterFailure?.(cycle.judgeModel);
    return failCycle(scoring, reply.errorMessage);
  }

  const review = await reviewTokenSpend({
    cycle: scoring,
    run: executed.run,
    promptText: revision.promptText,
    reviewer: cycle.judgeModel,
    signal: input.signal,
    onProgress: input.onProgress,
  });
  if (review.kind === "stopped") {
    return review.cycle;
  }
  const spent =
    reply.tokens === null && review.tokens === null
      ? null
      : (reply.tokens ?? 0) + (review.tokens ?? 0);
  const scored = applyPromptSdlcLocalJudgeReply(scoring, reply.text, spent);
  return appendPromptSdlcLocalTokenReview(scored, review.text);
};
