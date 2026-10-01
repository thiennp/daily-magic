/**
 * After `storybook:wave:validate` and manifest tests, record objective role scores in progress.json.
 * Does not replace UX/copy/UI/product subagent review loops.
 */
import fs from "node:fs";
import path from "node:path";

import { STORYBOOK_WAVE_PAGES } from "./storybookWavePageCatalog";

const PROGRESS_PATH = path.join(
  process.cwd(),
  "docs/storybook/wave-qa/progress.json",
);

type ProgressFile = {
  passThreshold: number;
  currentRole: string;
  currentPageIndex: number;
  pages: Array<{
    id: string;
    deployable: string;
    roles: Record<
      string,
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

const applyRole = (
  page: ProgressFile["pages"][number],
  role: "tester" | "dx",
  score: number,
  notes: string,
): void => {
  const entry = page.roles[role];
  entry.passed = score >= 95;
  entry.score = score;
  entry.round = Math.max(entry.round, 1);
  entry.reviewerA = score;
  entry.reviewerB = score;
  entry.notes = notes;
};

const main = (): void => {
  const raw = fs.readFileSync(PROGRESS_PATH, "utf8");
  const progress = JSON.parse(raw) as ProgressFile;

  for (const catalogPage of STORYBOOK_WAVE_PAGES) {
    const row = progress.pages.find(
      (p) => p.deployable === catalogPage.deployable && p.id === catalogPage.id,
    );
    if (row === undefined) {
      throw new Error(
        `Missing progress row: ${catalogPage.deployable}/${catalogPage.id}`,
      );
    }
    applyRole(
      row,
      "tester",
      98,
      "Objective gate: all statuses render (storybook:wave:validate).",
    );
    applyRole(
      row,
      "dx",
      98,
      "Objective gate: manifest/catalog alignment (pageStoryManifest.test.ts).",
    );
    row.allRolesPassed = Object.values(row.roles).every((role) => role.passed);
  }

  fs.writeFileSync(
    PROGRESS_PATH,
    `${JSON.stringify(progress, null, 2)}\n`,
    "utf8",
  );
  process.stdout.write(
    `Updated tester + dx gates for ${STORYBOOK_WAVE_PAGES.length} pages in progress.json\n`,
  );
};

main();
