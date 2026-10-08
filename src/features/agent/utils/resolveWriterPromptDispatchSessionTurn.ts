/**
 * 9c8a811d (Testi run 3 @292): a job-history Continue showed
 * `agy --continue …` while the host ran a fresh `agy -p` seeded from the
 * source run. The host seeds (no `--continue`) whenever a source run is sent,
 * so the terminal line only says continue for a live-thread follow-up.
 */
export const resolveWriterPromptDispatchSessionTurn = (input: {
  readonly sessionContinuation: boolean;
  readonly sourceRunId: string | undefined;
}): "continue" | "first" =>
  input.sessionContinuation &&
  (input.sourceRunId === undefined || input.sourceRunId.trim().length === 0)
    ? "continue"
    : "first";
