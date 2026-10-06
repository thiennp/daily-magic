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
      "AgentWitch stores the plan; your computer runs it on time.",
    );
    expect(source).toContain(
      "Create an automation in AgentWitch, pick hourly/daily/weekday schedule, and your computer runs Claude on time.",
    );
    expect(source).toContain(
      "AgentWitch syncs the job list to ~/.agent-witch on your computer",
    );
  });

  it("automateForYourselfOrYourTeam uses Magi sync bullet", () => {
    const source = readFileSync(AUTOMATE_ARTICLE_PATH, "utf8");

    expect(source).toContain(
      "AgentWitch syncs the job to your computer; the local scheduler runs it",
    );
  });

  it("automations syncFailed uses AgentWitch copy", () => {
    const source = readFileSync(AUTOMATIONS_COPY_PATH, "utf8");

    expect(source).toContain(
      "Saved in AgentWitch, but could not sync to this computer. Re-run AgentWitch install or open Automations again.",
    );
  });
});
