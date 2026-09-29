export interface PromptSdlcBestPrompt {
  readonly roundNumber: number;
  readonly promptText: string;
  readonly score: number;
  readonly reasons: string | null;
}

export const selectPromptSdlcBestPrompt = (
  revisions: readonly {
    readonly roundNumber: number;
    readonly promptText: string;
    readonly score: number | null;
    readonly reasons: string | null;
  }[],
): PromptSdlcBestPrompt | null => {
  const scored = revisions.flatMap((revision) =>
    revision.score === null
      ? []
      : [
          {
            roundNumber: revision.roundNumber,
            promptText: revision.promptText,
            score: revision.score,
            reasons: revision.reasons,
          },
        ],
  );
  const [first, ...rest] = scored;
  if (first === undefined) {
    return null;
  }

  return rest.reduce(
    (best, item) =>
      item.score > best.score ||
      (item.score === best.score && item.roundNumber > best.roundNumber)
        ? item
        : best,
    first,
  );
};
