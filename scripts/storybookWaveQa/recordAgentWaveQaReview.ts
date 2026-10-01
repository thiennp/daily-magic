/**
 * Record agent reviewer A + B JSON for one page and role into progress.json.
 *
 * Usage:
 *   npx tsx scripts/storybookWaveQa/recordAgentWaveQaReview.ts \
 *     AWC home-marketing ux reviewer-a.json reviewer-b.json
 */
import fs from "node:fs";
import path from "node:path";

import {
  type AgentWaveQaReview,
  type StorybookWaveAgentRole,
  validateAgentWaveQaReview,
} from "./agentWaveQaReview.type";
const PROGRESS_PATH = path.join(
  process.cwd(),
  "docs/storybook/wave-qa/progress.json",
);

const PASS_THRESHOLD = 95;

const loadReview = (filePath: string): AgentWaveQaReview => {
  const parsed = JSON.parse(fs.readFileSync(filePath, "utf8")) as unknown;
  const result = validateAgentWaveQaReview(parsed);
  if (!result.ok) {
    const detail = result.errors
      .map((e) => `${e.field}: ${e.message}`)
      .join("; ");
    throw new Error(`Invalid agent review in ${filePath}: ${detail}`);
  }
  return result.review;
};

const formatNotes = (a: AgentWaveQaReview, b: AgentWaveQaReview): string => {
  const lines = [
    `Agent A=${a.scoreOverall} B=${b.scoreOverall} (round ${a.captureRound}).`,
    a.scoreOverall < 100
      ? `A deductions: ${a.scoreBreakdown.map((x) => `${x.area} -${x.pointsDeducted}: ${x.reason}`).join(" | ")}`
      : "A: no deductions.",
    b.scoreOverall < 100
      ? `B deductions: ${b.scoreBreakdown.map((x) => `${x.area} -${x.pointsDeducted}: ${x.reason}`).join(" | ")}`
      : "B: no deductions.",
  ];
  if (
    a.scoreOverall < PASS_THRESHOLD &&
    a.whyBelowThreshold.trim().length > 0
  ) {
    lines.push(`A why<95: ${a.whyBelowThreshold.trim()}`);
  }
  if (
    b.scoreOverall < PASS_THRESHOLD &&
    b.whyBelowThreshold.trim().length > 0
  ) {
    lines.push(`B why<95: ${b.whyBelowThreshold.trim()}`);
  }
  return lines.join("\n");
};

const main = (): void => {
  const deployable = process.argv[2]?.trim();
  const pageId = process.argv[3]?.trim();
  const role = process.argv[4]?.trim() as StorybookWaveAgentRole;
  const fileA = process.argv[5];
  const fileB = process.argv[6];

  if (
    (deployable !== "AWC" && deployable !== "AWL") ||
    pageId === undefined ||
    pageId.length === 0 ||
    (role !== "ux" && role !== "copy" && role !== "ui" && role !== "product") ||
    fileA === undefined ||
    fileB === undefined
  ) {
    throw new Error(
      "Usage: recordAgentWaveQaReview.ts AWC|AWL <pageId> <ux|copy|ui|product> <reviewer-a.json> <reviewer-b.json>",
    );
  }

  const reviewA = loadReview(fileA);
  const reviewB = loadReview(fileB);

  if (reviewA.reviewer !== "A" || reviewB.reviewer !== "B") {
    throw new Error(
      "reviewer A file must have reviewer:A and B file reviewer:B",
    );
  }
  if (
    reviewA.deployable !== deployable ||
    reviewB.deployable !== deployable ||
    reviewA.pageId !== pageId ||
    reviewB.pageId !== pageId ||
    reviewA.role !== role ||
    reviewB.role !== role
  ) {
    throw new Error("Review files must match CLI deployable, pageId, and role");
  }

  const progress = JSON.parse(fs.readFileSync(PROGRESS_PATH, "utf8")) as {
    pages: Array<{
      deployable: string;
      id: string;
      allRolesPassed: boolean;
      roles: Record<
        StorybookWaveAgentRole,
        {
          passed: boolean;
          score: number | null;
          round: number;
          reviewerA: number | null;
          reviewerB: number | null;
          notes: string;
          agentFeedback?: {
            reviewerA?: AgentWaveQaReview;
            reviewerB?: AgentWaveQaReview;
          };
        }
      >;
    }>;
  };

  const row = progress.pages.find(
    (p) => p.deployable === deployable && p.id === pageId,
  );
  if (row === undefined) {
    throw new Error(`Unknown page ${deployable}/${pageId}`);
  }

  const passed =
    reviewA.scoreOverall >= PASS_THRESHOLD &&
    reviewB.scoreOverall >= PASS_THRESHOLD &&
    reviewA.passed &&
    reviewB.passed;

  row.roles[role] = {
    passed,
    score: Math.min(reviewA.scoreOverall, reviewB.scoreOverall),
    round: Math.max(reviewA.captureRound, reviewB.captureRound),
    reviewerA: reviewA.scoreOverall,
    reviewerB: reviewB.scoreOverall,
    notes: formatNotes(reviewA, reviewB),
    agentFeedback: { reviewerA: reviewA, reviewerB: reviewB },
  };

  row.allRolesPassed = Object.values(row.roles).every((r) => r.passed);

  fs.writeFileSync(
    PROGRESS_PATH,
    `${JSON.stringify(progress, null, 2)}\n`,
    "utf8",
  );
  process.stdout.write(
    `Recorded ${deployable}/${pageId} role=${role} passed=${passed}\n`,
  );
  if (!passed) {
    process.exit(1);
  }
};

main();
