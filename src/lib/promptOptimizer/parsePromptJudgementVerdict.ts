import { readJsonObjects } from "@/lib/promptOptimizer/readJsonObjects";

export interface PromptSdlcVerdict {
  readonly score: number;
  readonly passed: boolean;
  readonly reasons: string;
}

const isVerdict = (value: unknown): value is PromptSdlcVerdict => {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const record = value as {
    score?: unknown;
    passed?: unknown;
    reasons?: unknown;
  };
  if (typeof record.score !== "number" || !Number.isFinite(record.score)) {
    return false;
  }

  if (
    record.score < 0 ||
    record.score > 100 ||
    Math.round(record.score) !== record.score
  ) {
    return false;
  }

  return (
    typeof record.passed === "boolean" &&
    typeof record.reasons === "string" &&
    record.reasons.trim().length > 0
  );
};

/** Last JSON object that is a score, a boolean, and a reason. Null when the reply is not a verdict. */
export const parsePromptJudgementVerdict = (
  raw: string,
): PromptSdlcVerdict | null => {
  const matches = readJsonObjects(raw).filter(isVerdict);
  const verdict = matches[matches.length - 1];
  if (verdict === undefined) {
    return null;
  }

  return {
    score: verdict.score,
    passed: verdict.passed,
    reasons: verdict.reasons.trim(),
  };
};

/** Aligns `passed` with the configured pass score; the judge JSON can disagree. */
export const normalizePromptSdlcJudgeVerdict = (
  verdict: PromptSdlcVerdict,
  passScore: number,
): PromptSdlcVerdict => ({
  ...verdict,
  passed: verdict.score >= passScore,
});

export const parsePromptSdlcJudgeVerdict = (
  raw: string,
  passScore: number,
): PromptSdlcVerdict | null => {
  const verdict = parsePromptJudgementVerdict(raw);
  return verdict === null
    ? null
    : normalizePromptSdlcJudgeVerdict(verdict, passScore);
};
