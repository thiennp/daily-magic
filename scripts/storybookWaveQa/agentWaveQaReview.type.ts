export type StorybookWaveAgentRole = "ux" | "copy" | "ui" | "product";

export type StorybookWaveAgentReviewer = "A" | "B";

/** One subagent review for a single page wave + role. */
export interface AgentWaveQaReview {
  readonly reviewMethod: "agent";
  readonly reviewer: StorybookWaveAgentReviewer;
  readonly deployable: "AWC" | "AWL";
  readonly pageId: string;
  readonly role: StorybookWaveAgentRole;
  readonly captureRound: number;
  /** Path to round manifest.json or artifact dir (audit trail). */
  readonly captureRef: string;
  readonly scoreDesktop: number;
  /** AWL: repeat desktop score or null when not applicable. */
  readonly scoreMobile: number | null;
  readonly scoreOverall: number;
  readonly passed: boolean;
  /** Each deduction from 100 — required when scoreOverall < 100. */
  readonly scoreBreakdown: readonly {
    readonly area: string;
    readonly pointsDeducted: number;
    readonly reason: string;
  }[];
  /** Required when scoreOverall < 95 — guides next fix round. */
  readonly whyBelowThreshold: string;
  readonly topIssues: readonly string[];
  readonly mustFix: readonly string[];
  readonly quickWins: readonly string[];
}

export interface AgentWaveQaReviewValidationError {
  readonly field: string;
  readonly message: string;
}

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

export const validateAgentWaveQaReview = (
  raw: unknown,
):
  | { ok: true; review: AgentWaveQaReview }
  | { ok: false; errors: AgentWaveQaReviewValidationError[] } => {
  const errors: AgentWaveQaReviewValidationError[] = [];
  if (typeof raw !== "object" || raw === null) {
    return {
      ok: false,
      errors: [{ field: "root", message: "Expected JSON object" }],
    };
  }
  const o = raw as Record<string, unknown>;

  if (o.reviewMethod !== "agent") {
    errors.push({
      field: "reviewMethod",
      message: 'Must be "agent". Automated rubric scores are not allowed.',
    });
  }

  const scores = ["scoreDesktop", "scoreOverall"] as const;
  for (const key of scores) {
    const n = o[key];
    if (typeof n !== "number" || n < 0 || n > 100) {
      errors.push({ field: key, message: "Must be a number 0–100" });
    }
  }

  const scoreOverall = o.scoreOverall;
  const breakdown = o.scoreBreakdown;
  if (
    typeof scoreOverall === "number" &&
    scoreOverall < 100 &&
    (!Array.isArray(breakdown) || breakdown.length === 0)
  ) {
    errors.push({
      field: "scoreBreakdown",
      message: "Required when scoreOverall < 100 — explain each pointsDeducted",
    });
  }

  if (typeof scoreOverall === "number" && scoreOverall < 95) {
    const why = o.whyBelowThreshold;
    if (!isNonEmptyString(why) || why.trim().length < 40) {
      errors.push({
        field: "whyBelowThreshold",
        message:
          "Required (≥40 chars) when scoreOverall < 95 for the next improve round",
      });
    }
    const mustFix = o.mustFix;
    if (!Array.isArray(mustFix) || mustFix.length === 0) {
      errors.push({
        field: "mustFix",
        message: "At least one mustFix item when scoreOverall < 95",
      });
    }
  }

  if (errors.length > 0) {
    return { ok: false, errors };
  }

  return { ok: true, review: raw as AgentWaveQaReview };
};
