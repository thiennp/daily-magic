import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { PROJECT_ACTIVITY_EVENT_TYPES } from "@/lib/projects/acl/activity/projectActivityEvent.constant";

const SQL = readFileSync(
  join(process.cwd(), "db/migrations/133-project-member-permissions.sql"),
  "utf8",
);

describe("migration 133 member permissions", () => {
  it("adds the JSONB column defaulting to {} (everything allowed)", () => {
    expect(SQL).toMatch(
      /ADD COLUMN IF NOT EXISTS member_permissions JSONB NOT NULL DEFAULT '\{\}'::jsonb/,
    );
    expect(SQL).not.toMatch(/DROP TABLE|DELETE FROM|UPDATE /);
  });

  it("widens the Access log CHECK to exactly the TS event types", () => {
    const start = SQL.indexOf("CHECK (event_type IN (");
    const body = SQL.slice(start, SQL.indexOf("))", start));
    const listed = [...body.matchAll(/'([a-z_.]+)'/g)].map((m) => m[1]);
    expect(listed).toEqual([...PROJECT_ACTIVITY_EVENT_TYPES]);
  });
});
