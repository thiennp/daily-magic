export type PromptSdlcScoreBand = "bad" | "weak" | "close" | "passes";

const weakFrom = (passScore: number): number => Math.floor(passScore / 2);

const closeFrom = (passScore: number): number =>
  Math.max(weakFrom(passScore) + 1, passScore - 20);

export const describePromptSdlcScoreBand = (
  score: number,
  passScore: number,
): PromptSdlcScoreBand => {
  if (score >= passScore) {
    return "passes";
  }
  if (score >= closeFrom(passScore)) {
    return "close";
  }
  if (score >= weakFrom(passScore)) {
    return "weak";
  }
  return "bad";
};

export const buildPromptSdlcScoreScale = (
  passScore: number,
): readonly {
  readonly band: PromptSdlcScoreBand;
  readonly label: string;
}[] => [
  { band: "bad", label: `0–${weakFrom(passScore) - 1} bad` },
  {
    band: "weak",
    label: `${weakFrom(passScore)}–${closeFrom(passScore) - 1} weak`,
  },
  { band: "close", label: `${closeFrom(passScore)}–${passScore - 1} close` },
  { band: "passes", label: `${passScore}–100 passes` },
];
