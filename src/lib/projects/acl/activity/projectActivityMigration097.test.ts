import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it, vi } from "vitest";

import {
  ensureProjectActivityEventsSchema,
  resetProjectActivityEventsSchemaForTests,
} from "@/lib/projects/acl/activity/ensureProjectActivityEventsSchema";
import { PROJECT_ACTIVITY_EVENT_TYPES } from "@/lib/projects/acl/activity/projectActivityEvent.constant";

const sqlMock = vi.fn(async () => []);
vi.mock("@/lib/db", () => ({ getSql: () => sqlMock }));

const SQL = readFileSync(
  join(process.cwd(), "db/migrations/097-project-activity-rule-events.sql"),
  "utf8",
);

const checkListAfter = (text: string, marker: string): string[] => {
  const start = text.indexOf(marker);
  const body = text.slice(start, text.indexOf("))", start));
  return [...body.matchAll(/'([a-z_.]+)'/g)].map((m) => m[1] ?? "");
};

describe("migration 097 project_activity_events rule.* types", () => {
  it("widens the CHECK to exactly the TS event types", () => {
    expect(checkListAfter(SQL, "CHECK (event_type IN (")).toEqual([
      ...PROJECT_ACTIVITY_EVENT_TYPES,
    ]);
    expect(SQL).toMatch(
      /DROP CONSTRAINT IF EXISTS project_activity_events_event_type_check/,
    );
    expect(SQL).not.toMatch(/DROP TABLE|DELETE FROM|UPDATE /);
  });

  it("runtime ensure widens a 092-era CHECK with the same list", async () => {
    sqlMock.mockClear();
    resetProjectActivityEventsSchemaForTests();
    await ensureProjectActivityEventsSchema();
    const ddl = sqlMock.mock.calls.map((c) => String((c as unknown[])[0])).join("\n");
    expect(ddl).toMatch(/pg_get_constraintdef\(oid\) LIKE '%rule\.restored%'/);
    expect(checkListAfter(ddl, "ADD CONSTRAINT")).toEqual([
      ...PROJECT_ACTIVITY_EVENT_TYPES,
    ]);
  });
});
