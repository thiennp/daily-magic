import type { KnowledgeTaskClass } from "../../../knowledge/internal/core/episode/episode.types";
import {
  resolveKnowledgePlan,
  type KnowledgePlan,
} from "../../../knowledge/internal/core/episode/knowledgePlan";

export type WriterDispatchSessionTurn = "continue" | "first";

export type WriterDispatchContinuationStrategy =
  "cli_continue" | "source_run_seed" | "transcript_seed" | "none";

export type WriterDispatchContextBudget = "minimal" | "standard" | "full";

export type WriterDispatchRoutePlan = {
  readonly sessionTurn: WriterDispatchSessionTurn;
  readonly continuationStrategy: WriterDispatchContinuationStrategy;
  readonly contextBudget: WriterDispatchContextBudget;
  readonly knowledgePlan: KnowledgePlan;
};

export type ResolveWriterDispatchRouteInput = {
  readonly sessionContinuation: boolean;
  readonly supportsWriterSessionContinuation: boolean;
  readonly isWriterConversationStarted: boolean;
  readonly hasSourceRunId: boolean;
  readonly hasCanonicalTurns: boolean;
  readonly userPromptCharacterCount: number;
  readonly taskClass: KnowledgeTaskClass;
};

const resolveContextBudget = (
  continuationStrategy: WriterDispatchContinuationStrategy,
  userPromptCharacterCount: number,
): WriterDispatchContextBudget => {
  if (continuationStrategy === "cli_continue") {
    return "minimal";
  }

  if (userPromptCharacterCount > 3_500) {
    return "full";
  }

  if (
    continuationStrategy === "source_run_seed" ||
    continuationStrategy === "transcript_seed"
  ) {
    return "standard";
  }

  return userPromptCharacterCount < 80 ? "standard" : "full";
};

export const resolveWriterSessionTurn = (
  input: Pick<
    ResolveWriterDispatchRouteInput,
    | "sessionContinuation"
    | "supportsWriterSessionContinuation"
    | "isWriterConversationStarted"
    | "hasSourceRunId"
  >,
): WriterDispatchSessionTurn =>
  input.sessionContinuation &&
  input.supportsWriterSessionContinuation &&
  input.isWriterConversationStarted &&
  !input.hasSourceRunId
    ? "continue"
    : "first";

export const resolveWriterDispatchRoute = (
  input: ResolveWriterDispatchRouteInput,
): WriterDispatchRoutePlan => {
  const sessionTurn = resolveWriterSessionTurn(input);

  const continuationStrategy: WriterDispatchContinuationStrategy =
    sessionTurn === "continue"
      ? "cli_continue"
      : input.sessionContinuation && input.hasSourceRunId
        ? "source_run_seed"
        : input.sessionContinuation && input.hasCanonicalTurns
          ? "transcript_seed"
          : "none";

  const contextBudget = resolveContextBudget(
    continuationStrategy,
    input.userPromptCharacterCount,
  );

  return {
    sessionTurn,
    continuationStrategy,
    contextBudget,
    knowledgePlan: resolveKnowledgePlan({
      contextBudget,
      continuationStrategy,
      taskClass: input.taskClass,
    }),
  };
};
