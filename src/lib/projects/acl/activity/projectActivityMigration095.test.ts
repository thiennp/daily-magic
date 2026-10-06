import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { PROJECT_ACTIVITY_EVENT_TYPES } from "@/lib/projects/acl/activity/projectActivityEvent.constant";

const SQL = readFileSync(
  join(process.cwd(), "db/migrations/095-project-runs-without-approval.sql"),
  "utf8",
);

const checkListOf = (text: string): string[] => {
  const body = text.slice(text.indexOf("CHECK (event_type IN ("));
  return [...body.matchAll(/'([a-z_.]+)'/g)].map((m) => m[1] ?? "");
};

describe("migration 095 project runs without approval", () => {
  it("adds the owner flag, default OFF, re-runnable", () => {
    expect(SQL).toMatch(
      /ALTER TABLE user_projects\s+ADD COLUMN IF NOT EXISTS allow_runs_without_approval BOOLEAN NOT NULL DEFAULT FALSE/,
    );
  });

  it("re-creates the Access log CHECK with exactly the TS event types", () => {
    expect(SQL).toMatch(
      /DROP CONSTRAINT IF EXISTS project_activity_events_event_type_check/,
    );
    expect(checkListOf(SQL)).toEqual([...PROJECT_ACTIVITY_EVENT_TYPES]);
  });

  it("never touches rows or drops tables", () => {
    expect(SQL).not.toMatch(/DROP TABLE|DELETE FROM|UPDATE /);
  });
});
