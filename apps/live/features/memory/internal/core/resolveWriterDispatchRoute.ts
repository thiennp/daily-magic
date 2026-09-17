export type WriterDispatchSessionTurn = "continue" | "first";

export type WriterDispatchContinuationStrategy =
  "cli_continue" | "source_run_seed" | "transcript_seed" | "none";

export type WriterDispatchContextBudget = "minimal" | "standard" | "full";

export type WriterDispatchRoutePlan = {
  readonly sessionTurn: WriterDispatchSessionTurn;
  readonly continuationStrategy: WriterDispatchContinuationStrategy;
  readonly contextBudget: WriterDispatchContextBudget;
  readonly injectMemory: boolean;
  readonly memoryEntryLimit: number;
  readonly ragLimit: number;
  readonly ragMinScore: number;
};

export type ResolveWriterDispatchRouteInput = {
  readonly sessionContinuation: boolean;
  readonly supportsWriterSessionContinuation: boolean;
  readonly isWriterConversationStarted: boolean;
  readonly hasSourceRunId: boolean;
  readonly hasCanonicalTurns: boolean;
  readonly userPromptCharacterCount: number;
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

const resolveContextInjectionLimits = (input: {
  readonly contextBudget: WriterDispatchContextBudget;
  readonly continuationStrategy: WriterDispatchContinuationStrategy;
  readonly userPromptCharacterCount: number;
}): Pick<
  WriterDispatchRoutePlan,
  "injectMemory" | "memoryEntryLimit" | "ragLimit" | "ragMinScore"
> => {
  if (input.contextBudget === "minimal") {
    return {
      injectMemory: false,
      memoryEntryLimit: 0,
      ragLimit: 0,
      ragMinScore: 1,
    };
  }

  if (input.contextBudget === "standard") {
    const tightRag =
      input.continuationStrategy === "none" &&
      input.userPromptCharacterCount < 80;
    return {
      injectMemory: true,
      memoryEntryLimit: 3,
      ragLimit: tightRag ? 2 : 3,
      ragMinScore: tightRag ? 0.4 : 0.35,
    };
  }

  return {
    injectMemory: true,
    memoryEntryLimit: input.userPromptCharacterCount > 3_500 ? 8 : 5,
    ragLimit: 5,
    ragMinScore: 0.25,
  };
};

export const resolveWriterSessionTurn = (
  input: Pick<
    ResolveWriterDispatchRouteInput,
    | "sessionContinuation"
    | "supportsWriterSessionContinuation"
    | "isWriterConversationStarted"
  >,
): WriterDispatchSessionTurn =>
  input.sessionContinuation &&
  input.supportsWriterSessionContinuation &&
  input.isWriterConversationStarted
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

  const injection = resolveContextInjectionLimits({
    contextBudget,
    continuationStrategy,
    userPromptCharacterCount: input.userPromptCharacterCount,
  });

  return {
    sessionTurn,
    continuationStrategy,
    contextBudget,
    ...injection,
  };
};
