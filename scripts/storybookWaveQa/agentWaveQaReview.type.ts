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
  /** Required when role is `ui` — which blocks were zoom-inspected. */
  readonly zoomedSections?: readonly string[];
  /** Required when role is `ui` — `present` blocks pass until fixed. */
  readonly obviousVisualDefects?: "none" | "present";
}

export interface AgentWaveQaReviewValidationError {
  readonly field: string;
  readonly message: string;
}

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

const AGENT_ROLES: readonly StorybookWaveAgentRole[] = [
  "ux",
  "copy",
  "ui",
  "product",
];

const isAgentRole = (value: unknown): value is StorybookWaveAgentRole =>
  typeof value === "string" &&
  (AGENT_ROLES as readonly string[]).includes(value);

const isScore = (value: unknown): value is number =>
  typeof value === "number" &&
  Number.isFinite(value) &&
  value >= 0 &&
  value <= 100;

const expectedAwcOverall = (
  scoreDesktop: number,
  scoreMobile: number,
): number => Math.round((scoreDesktop + scoreMobile) / 2);

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

  if (o.reviewer !== "A" && o.reviewer !== "B") {
    errors.push({ field: "reviewer", message: 'Must be "A" or "B"' });
  }

  const deployable = o.deployable;
  if (deployable !== "AWC" && deployable !== "AWL") {
    errors.push({ field: "deployable", message: 'Must be "AWC" or "AWL"' });
  }

  if (!isAgentRole(o.role)) {
    errors.push({
      field: "role",
      message: "Must be ux, copy, ui, or product",
    });
  }

  if (!isNonEmptyString(o.pageId)) {
    errors.push({ field: "pageId", message: "Required non-empty string" });
  }

  const captureRound = o.captureRound;
  if (
    typeof captureRound !== "number" ||
    !Number.isInteger(captureRound) ||
    captureRound < 1
  ) {
    errors.push({
      field: "captureRound",
      message: "Must be an integer ≥ 1",
    });
  }

  if (!isNonEmptyString(o.captureRef)) {
    errors.push({ field: "captureRef", message: "Required non-empty string" });
  }

  const scoreDesktop = o.scoreDesktop;
  if (!isScore(scoreDesktop)) {
    errors.push({ field: "scoreDesktop", message: "Must be a number 0–100" });
  }

  const scoreMobile = o.scoreMobile;
  if (deployable === "AWL") {
    if (scoreMobile !== null) {
      errors.push({
        field: "scoreMobile",
        message: "AWL reviews must set scoreMobile to null",
      });
    }
  } else if (deployable === "AWC" && !isScore(scoreMobile)) {
    errors.push({
      field: "scoreMobile",
      message: "AWC reviews require scoreMobile 0–100",
    });
  }

  const scoreOverall = o.scoreOverall;
  if (!isScore(scoreOverall)) {
    errors.push({ field: "scoreOverall", message: "Must be a number 0–100" });
  }

  if (
    deployable === "AWC" &&
    isScore(scoreDesktop) &&
    isScore(scoreMobile) &&
    isScore(scoreOverall) &&
    expectedAwcOverall(scoreDesktop, scoreMobile) !== scoreOverall
  ) {
    errors.push({
      field: "scoreOverall",
      message:
        "AWC scoreOverall must equal Math.round((scoreDesktop + scoreMobile) / 2)",
    });
  }

  if (
    deployable === "AWL" &&
    isScore(scoreDesktop) &&
    isScore(scoreOverall) &&
    scoreDesktop !== scoreOverall
  ) {
    errors.push({
      field: "scoreOverall",
      message: "AWL scoreOverall must equal scoreDesktop",
    });
  }

  if (typeof o.passed !== "boolean") {
    errors.push({ field: "passed", message: "Must be a boolean" });
  } else if (isScore(scoreOverall)) {
    const shouldPass = scoreOverall >= 95;
    if (o.passed !== shouldPass) {
      errors.push({
        field: "passed",
        message: `Must be ${shouldPass} when scoreOverall is ${scoreOverall}`,
      });
    }
  }

  const breakdown = o.scoreBreakdown;
  if (
    isScore(scoreOverall) &&
    scoreOverall < 100 &&
    (!Array.isArray(breakdown) || breakdown.length === 0)
  ) {
    errors.push({
      field: "scoreBreakdown",
      message: "Required when scoreOverall < 100 — explain each pointsDeducted",
    });
  }

  if (
    isScore(scoreOverall) &&
    Array.isArray(breakdown) &&
    breakdown.length > 0
  ) {
    let deducted = 0;
    for (const [index, item] of breakdown.entries()) {
      if (typeof item !== "object" || item === null) {
        errors.push({
          field: `scoreBreakdown[${index}]`,
          message: "Must be an object",
        });
        continue;
      }
      const row = item as Record<string, unknown>;
      if (!isNonEmptyString(row.area)) {
        errors.push({
          field: `scoreBreakdown[${index}].area`,
          message: "Required non-empty string",
        });
      }
      const points = row.pointsDeducted;
      if (
        typeof points !== "number" ||
        !Number.isFinite(points) ||
        points <= 0
      ) {
        errors.push({
          field: `scoreBreakdown[${index}].pointsDeducted`,
          message: "Must be a positive number",
        });
      } else {
        deducted += points;
      }
      if (!isNonEmptyString(row.reason)) {
        errors.push({
          field: `scoreBreakdown[${index}].reason`,
          message: "Required non-empty string",
        });
      }
    }
    const expectedDeduction = 100 - scoreOverall;
    if (scoreOverall < 100 && Math.abs(deducted - expectedDeduction) > 0.01) {
      errors.push({
        field: "scoreBreakdown",
        message: `pointsDeducted must sum to ${expectedDeduction} (100 − scoreOverall)`,
      });
    }
  }

  const role = o.role;
  if (role === "ui") {
    const zoomed = o.zoomedSections;
    if (
      !Array.isArray(zoomed) ||
      zoomed.length < 3 ||
      !zoomed.every((s) => isNonEmptyString(s))
    ) {
      errors.push({
        field: "zoomedSections",
        message:
          "ui reviews require zoomedSections (≥3 non-empty strings) per ui-deep-inspection.md",
      });
    }
    const defects = o.obviousVisualDefects;
    if (defects !== "none" && defects !== "present") {
      errors.push({
        field: "obviousVisualDefects",
        message: 'ui reviews require obviousVisualDefects "none" or "present"',
      });
    }
    if (
      defects === "present" &&
      typeof o.passed === "boolean" &&
      o.passed === true
    ) {
      errors.push({
        field: "passed",
        message:
          "ui cannot pass while obviousVisualDefects is present — fix or score < 95",
      });
    }
    if (defects === "present") {
      const mustFix = o.mustFix;
      if (!Array.isArray(mustFix) || mustFix.length === 0) {
        errors.push({
          field: "mustFix",
          message:
            "ui with obviousVisualDefects present requires at least one mustFix",
        });
      }
    }
  }

  if (isScore(scoreOverall) && scoreOverall < 95) {
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
