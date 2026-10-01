/**
 * Record reviewer A/B scores from evaluateSubjectiveWaveQa JSON files into progress.json.
 * Usage:
 *   npx tsx scripts/storybookWaveQa/recordSubjectiveWaveQa.ts /tmp/wave-qa-a.json /tmp/wave-qa-b.json
 */
import fs from "node:fs";
import path from "node:path";

const PROGRESS_PATH = path.join(
  process.cwd(),
  "docs/storybook/wave-qa/progress.json",
);

type Role = "ux" | "copy" | "ui" | "product";

type EvalFile = {
  reports: Array<{
    deployable: string;
    pageId: string;
    roles: Record<
      Role,
      { scoreOverall: number; passed: boolean; deductions: string[] }
    >;
  }>;
};

const main = (): void => {
  const fileA = process.argv[2];
  const fileB = process.argv[3];
  if (fileA === undefined || fileB === undefined) {
    throw new Error(
      "Usage: recordSubjectiveWaveQa.ts <reviewer-a.json> <reviewer-b.json>",
    );
  }

  const evalA = JSON.parse(fs.readFileSync(fileA, "utf8")) as EvalFile;
  const evalB = JSON.parse(fs.readFileSync(fileB, "utf8")) as EvalFile;
  const progress = JSON.parse(fs.readFileSync(PROGRESS_PATH, "utf8")) as {
    pages: Array<{
      id: string;
      deployable: string;
      roles: Record<
        Role,
        {
          passed: boolean;
          score: number | null;
          round: number;
          reviewerA: number | null;
          reviewerB: number | null;
          notes: string;
        }
      >;
      allRolesPassed: boolean;
    }>;
  };

  for (const reportA of evalA.reports) {
    const reportB = evalB.reports.find(
      (r) => r.deployable === reportA.deployable && r.pageId === reportA.pageId,
    );
    if (reportB === undefined) {
      throw new Error(
        `Missing B report for ${reportA.deployable}/${reportA.pageId}`,
      );
    }
    const row = progress.pages.find(
      (p) => p.deployable === reportA.deployable && p.id === reportA.pageId,
    );
    if (row === undefined) {
      throw new Error(
        `Missing progress row ${reportA.deployable}/${reportA.pageId}`,
      );
    }

    for (const role of ["ux", "copy", "ui", "product"] as Role[]) {
      const a = reportA.roles[role];
      const b = reportB.roles[role];
      const passed =
        a.passed && b.passed && a.scoreOverall >= 95 && b.scoreOverall >= 95;
      row.roles[role] = {
        passed,
        score: Math.min(a.scoreOverall, b.scoreOverall),
        round: 1,
        reviewerA: a.scoreOverall,
        reviewerB: b.scoreOverall,
        notes: passed
          ? `Rubric A=${a.scoreOverall} B=${b.scoreOverall}.`
          : `Pending: A=${a.scoreOverall} (${a.deductions.join(",")}) B=${b.scoreOverall} (${b.deductions.join(",")})`,
      };
    }
    row.allRolesPassed = Object.values(row.roles).every((r) => r.passed);
  }

  fs.writeFileSync(
    PROGRESS_PATH,
    `${JSON.stringify(progress, null, 2)}\n`,
    "utf8",
  );
  const allDone = progress.pages.every((p) => p.allRolesPassed);
  process.stdout.write(
    `Recorded subjective scores. allPagesPassed=${allDone}\n`,
  );
  if (!allDone) {
    process.exit(1);
  }
};

main();
