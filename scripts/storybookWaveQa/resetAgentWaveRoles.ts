/**
 * Reset ux | copy | ui | product on all catalog pages (invalidates rubric/automation passes).
 * Keeps tester + dx objective scores unchanged.
 */
import fs from "node:fs";
import path from "node:path";

import { STORYBOOK_WAVE_REVIEW_ROLES } from "./storybookWavePageCatalog";

const AGENT_ROLES = new Set(["ux", "copy", "ui", "product"]);

const PROGRESS_PATH = path.join(
  process.cwd(),
  "docs/storybook/wave-qa/progress.json",
);

const main = (): void => {
  const progress = JSON.parse(fs.readFileSync(PROGRESS_PATH, "utf8")) as {
    currentRole: string;
    currentPageIndex: number;
    pages: Array<{
      allRolesPassed: boolean;
      roles: Record<
        string,
        {
          passed: boolean;
          score: number | null;
          round: number;
          reviewerA: number | null;
          reviewerB: number | null;
          notes: string;
          agentFeedback?: unknown;
        }
      >;
    }>;
  };

  progress.currentRole = "ux";
  progress.currentPageIndex = 0;

  for (const page of progress.pages) {
    for (const role of STORYBOOK_WAVE_REVIEW_ROLES) {
      if (!AGENT_ROLES.has(role)) {
        continue;
      }
      page.roles[role] = {
        passed: false,
        score: null,
        round: 0,
        reviewerA: null,
        reviewerB: null,
        notes:
          "Pending agent reviewer A + B (see skill-storybook-page-wave-qa).",
      };
    }
    page.allRolesPassed = Object.values(page.roles).every((r) => r.passed);
  }

  fs.writeFileSync(
    PROGRESS_PATH,
    `${JSON.stringify(progress, null, 2)}\n`,
    "utf8",
  );
  process.stdout.write(
    `Reset agent roles (ux,copy,ui,product) on ${progress.pages.length} pages.\n`,
  );
};

main();
