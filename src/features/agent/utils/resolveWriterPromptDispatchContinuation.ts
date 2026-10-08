/**
 * FAIL1 (Testi long-run run 2, a76d46ac): a composer Start after a failed or
 * finished run in the same floater went out as `sessionContinuation` with the
 * old run's `sourceRunId`, so the host ran `agy` with that run's 429 in
 * `<prior_context>`. A fresh Start is a new session: no continuation and no
 * source-run seed. Only an explicit job-history Continue (`continueSession=1`)
 * or a follow-up in the live thread continues, and a follow-up only seeds
 * from the URL's source run while the panel still shows that run.
 */
export const resolveWriterPromptDispatchContinuation = (input: {
  readonly freshStart: boolean;
  readonly continueFromQuery: boolean;
  readonly isSessionContinuation: () => boolean;
  readonly urlSourceRunId: string;
  readonly liveRunId: string | null;
}): {
  readonly isFreshStart: boolean;
  readonly sessionContinuation: boolean;
  readonly sourceRunId: string | undefined;
} => {
  const isFreshStart = input.freshStart && !input.continueFromQuery;
  if (isFreshStart) {
    return {
      isFreshStart,
      sessionContinuation: false,
      sourceRunId: undefined,
    };
  }

  const sourceRunId = input.urlSourceRunId.trim();
  const liveRunId = input.liveRunId?.trim() ?? "";
  const panelShowsSourceRun =
    input.continueFromQuery ||
    liveRunId.length === 0 ||
    liveRunId === sourceRunId;
  return {
    isFreshStart,
    sessionContinuation: input.isSessionContinuation(),
    sourceRunId:
      sourceRunId.length > 0 && panelShowsSourceRun ? sourceRunId : undefined,
  };
};
