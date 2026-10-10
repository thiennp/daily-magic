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
  join(process.cwd(), "db/migrations/098-project-messages-archive.sql"),
  "utf8",
);

const checkListAfter = (text: string, marker: string): string[] => {
  const start = text.indexOf(marker);
  const body = text.slice(start, text.indexOf("))", start));
  return [...body.matchAll(/'([a-z_.]+)'/g)].map((m) => m[1] ?? "");
};

describe("migration 098 project_messages archive + activity CHECK union", () => {
  it("widens the CHECK to exactly the TS event types (full main ∪ messages.*)", () => {
    // 133 adds project.member_permissions_changed; 098's own list is TS minus it.
    expect(checkListAfter(SQL, "CHECK (event_type IN (")).toEqual(
      PROJECT_ACTIVITY_EVENT_TYPES.filter(
        (type) => type !== "project.member_permissions_changed",
      ),
    );
    expect(SQL).toMatch(
      /DROP CONSTRAINT IF EXISTS project_activity_events_event_type_check/,
    );
    expect(SQL).toMatch(/messages\.archived/);
    expect(SQL).toMatch(/messages\.restored/);
    expect(SQL).toMatch(/rule\.dropped/);
    expect(SQL).toMatch(/project\.runs_without_approval_enabled/);
    expect(SQL).not.toMatch(/DROP TABLE|DELETE FROM|UPDATE /);
  });

  it("adds archive columns + index without deleting rows", () => {
    expect(SQL).toMatch(/ADD COLUMN IF NOT EXISTS archived_at TIMESTAMPTZ/);
    expect(SQL).toMatch(/ADD COLUMN IF NOT EXISTS archived_by TEXT/);
    expect(SQL).toMatch(/project_messages_project_archived_idx/);
  });

  it("runtime ensure CHECK list equals the same full TS union", async () => {
    sqlMock.mockClear();
    resetProjectActivityEventsSchemaForTests();
    await ensureProjectActivityEventsSchema();
    const ddl = sqlMock.mock.calls
      .map((c) => String((c as unknown[])[0]))
      .join("\n");
    expect(ddl).toMatch(
      /pg_get_constraintdef\(oid\) LIKE '%project\.member_permissions_changed%'/,
    );
    expect(checkListAfter(ddl, "ADD CONSTRAINT")).toEqual([
      ...PROJECT_ACTIVITY_EVENT_TYPES,
    ]);
  });
});
