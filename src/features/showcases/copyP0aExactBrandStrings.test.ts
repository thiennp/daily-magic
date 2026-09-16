import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

const SCHEDULE_ARTICLE_PATH = join(
  process.cwd(),
  "src/features/showcases/articles/scheduleWorkflowOnYourMac.article.ts",
);
const AUTOMATE_ARTICLE_PATH = join(
  process.cwd(),
  "src/features/showcases/articles/automateForYourselfOrYourTeam.article.ts",
);
const AUTOMATIONS_COPY_PATH = join(
  process.cwd(),
  "src/features/automations/automationsPageCopy.constant.ts",
);

/** Magi COPY-P0a — exact public strings (regression lock). */
describe("COPY-P0a exact brand strings", () => {
  it("scheduleWorkflowOnYourMac uses Magi wording", () => {
    const source = readFileSync(SCHEDULE_ARTICLE_PATH, "utf8");

    expect(source).toContain(
      "Agent Witch stores the plan; your Mac runs it on time.",
    );
    expect(source).toContain(
      "Create an automation in Agent Witch, pick hourly/daily/weekday schedule, and your Mac runs Claude on time.",
    );
    expect(source).toContain(
      "Agent Witch syncs the job list to ~/.agent-witch on your Mac",
    );
  });

  it("automateForYourselfOrYourTeam uses Magi sync bullet", () => {
    const source = readFileSync(AUTOMATE_ARTICLE_PATH, "utf8");

    expect(source).toContain(
      "Agent Witch syncs the job to your Mac; the local scheduler runs it",
    );
  });

  it("automations syncFailed uses Agent Witch copy", () => {
    const source = readFileSync(AUTOMATIONS_COPY_PATH, "utf8");

    expect(source).toContain(
      "Saved in Agent Witch, but could not sync to this Mac. Re-run Agent Witch install or open Automations again.",
    );
  });
});
