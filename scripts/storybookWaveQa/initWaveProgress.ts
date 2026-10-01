import fs from "node:fs";
import path from "node:path";

import {
  STORYBOOK_WAVE_PAGES,
  STORYBOOK_WAVE_PASS_THRESHOLD,
  STORYBOOK_WAVE_REVIEW_ROLES,
  type StorybookWaveReviewRole,
} from "./storybookWavePageCatalog";

const emptyRoleState = (): Record<
  StorybookWaveReviewRole,
  {
    passed: boolean;
    score: number | null;
    round: number;
    reviewerA: number | null;
    reviewerB: number | null;
    notes: string;
  }
> => {
  const roles = {} as Record<
    StorybookWaveReviewRole,
    {
      passed: boolean;
      score: number | null;
      round: number;
      reviewerA: number | null;
      reviewerB: number | null;
      notes: string;
    }
  >;
  for (const role of STORYBOOK_WAVE_REVIEW_ROLES) {
    roles[role] = {
      passed: false,
      score: null,
      round: 0,
      reviewerA: null,
      reviewerB: null,
      notes: "",
    };
  }
  return roles;
};

const main = (): void => {
  const outPath = path.join(
    process.cwd(),
    "docs/storybook/wave-qa/progress.json",
  );
  const payload = {
    passThreshold: STORYBOOK_WAVE_PASS_THRESHOLD,
    currentRole: "ux" as const,
    currentPageIndex: 0,
    pages: STORYBOOK_WAVE_PAGES.map((page, index) => ({
      order: index,
      deployable: page.deployable,
      id: page.id,
      title: page.title,
      path: page.path,
      statuses: page.statuses,
      roles: emptyRoleState(),
      allRolesPassed: false,
    })),
  };
  fs.writeFileSync(outPath, `${JSON.stringify(payload, null, 2)}\n`);
  process.stdout.write(
    `Initialized ${payload.pages.length} pages -> ${outPath}\n`,
  );
};

main();
