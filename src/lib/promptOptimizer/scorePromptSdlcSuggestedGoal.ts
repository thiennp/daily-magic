/** Heuristic: a goal is useful when a judge could verify it without guessing. */
export const isMeasurablePromptSdlcGoal = (goal: string): boolean => {
  const text = goal.trim();
  if (text.length < 12) {
    return false;
  }

  const vague =
    /\b(be helpful|do (?:it )?well|make (?:it )?better|improve (?:the )?prompt|good quality|as needed)\b/i;
  if (vague.test(text)) {
    return false;
  }

  const signals = [
    /\b(?:file|path|folder|repo|directory)\b/i,
    /\b[\w./-]+\.(?:ts|tsx|js|jsx|md|json|sql|py|go|rs)\b/,
    /\b(?:git diff|commit|branch|PR|pull request)\b/i,
    /\b(?:npm run|pnpm|yarn|vitest|jest|eslint|tsc|psql)\b/i,
    /\b(?:exit(?:s)? (?:code )?0|pass(?:es)?|fails?)\b/i,
    /\b(?:must (?:not )?include|must (?:not )?contain|should (?:not )?mention)\b/i,
    /\b(?:tests?|spec\.|\.test\.)\b/i,
    /\b(?:reply|response|output|answer)\b.*\b(?:only|must|without)\b/i,
    /\b(?:chỉ|phải|không được|file|lệnh|test)\b/u,
  ];

  return signals.some((pattern) => pattern.test(text));
};

export const scorePromptSdlcSuggestedGoals = (
  options: readonly string[],
): {
  readonly measurableCount: number;
  readonly averageLength: number;
  readonly passes: boolean;
} => {
  const measurable = options.filter(isMeasurablePromptSdlcGoal);
  const totalLength = options.reduce(
    (sum, item) => sum + item.trim().length,
    0,
  );
  const averageLength =
    options.length === 0 ? 0 : Math.round(totalLength / options.length);
  const passes =
    options.length >= 1 &&
    measurable.length === options.length &&
    averageLength >= 20 &&
    averageLength <= 400;

  return {
    measurableCount: measurable.length,
    averageLength,
    passes,
  };
};
