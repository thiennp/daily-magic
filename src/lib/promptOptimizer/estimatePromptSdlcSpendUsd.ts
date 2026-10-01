/** USD estimate from token count and $/1k rate (Product recompute helper). */
export const estimatePromptSdlcSpendUsd = (input: {
  readonly tokens: number;
  readonly rateUsdPer1kTokens: number;
}): number => {
  if (
    !Number.isFinite(input.tokens) ||
    !Number.isFinite(input.rateUsdPer1kTokens) ||
    input.tokens < 0 ||
    input.rateUsdPer1kTokens < 0
  ) {
    return 0;
  }
  return Math.round((input.tokens / 1000) * input.rateUsdPer1kTokens * 10_000) /
    10_000;
};
