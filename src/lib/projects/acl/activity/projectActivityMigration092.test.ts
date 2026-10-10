import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it, vi } from "vitest";

import {
  ensureProjectActivityEventsSchema,
  resetProjectActivityEventsSchemaForTests,
} from "@/lib/projects/acl/activity/ensureProjectActivityEventsSchema";
import { PROJECT_ACTIVITY_EVENT_TYPES } from "@/lib/projects/acl/activity/projectActivityEvent.constant";
import { projectActivitySourceRefFor073 } from "@/lib/projects/acl/invites/dualWriteProjectInviteAutoApproveEvent";

const sqlMock = vi.fn(async () => []);
vi.mock("@/lib/db", () => ({ getSql: () => sqlMock }));

const SQL = readFileSync(
  join(process.cwd(), "db/migrations/092-project-activity-events.sql"),
  "utf8",
);

const TYPES_ADDED_IN_095: readonly string[] = [
  "project.runs_without_approval_enabled",
  "project.runs_without_approval_disabled",
];

const TYPES_ADDED_AFTER_092 = (type: string): boolean =>
  TYPES_ADDED_IN_095.includes(type) ||
  type.startsWith("rule.") ||
  type.startsWith("messages.");

const checkListOf = (text: string): string[] => {
  const body = text.slice(
    text.indexOf("event_type IN ("),
    text.indexOf("actor_kind"),
  );
  return [...body.matchAll(/'([a-z_.]+)'/g)].map((m) => m[1] ?? "");
};

describe("migration 092 project_activity_events", () => {
  it("CHECK list (092 = base types; ensure DDL = all TS event types)", async () => {
    // 095 + 097 + 098 extend the CHECK; 092's own list is the TS list minus those types.
    expect(checkListOf(SQL)).toEqual(
      PROJECT_ACTIVITY_EVENT_TYPES.filter(
        (type) =>
          !TYPES_ADDED_AFTER_092(type) &&
          type !== "project.member_permissions_changed",
      ),
    );
    resetProjectActivityEventsSchemaForTests();
    await ensureProjectActivityEventsSchema();
    const ddl = sqlMock.mock.calls
      .map((c) => String((c as unknown[])[0]))
      .join("\n");
    expect(checkListOf(ddl)).toEqual([...PROJECT_ACTIVITY_EVENT_TYPES]);
  });

  it("backfill is idempotent: linked by source_ref, ON CONFLICT DO NOTHING", () => {
    expect(SQL).toMatch(
      /CREATE UNIQUE INDEX IF NOT EXISTS project_activity_events_source_ref_uidx/,
    );
    expect(SQL).toMatch(/'073:' \|\| e\.id/);
    expect(SQL).toMatch(
      /ON CONFLICT \(source_ref\) WHERE source_ref IS NOT NULL DO NOTHING/,
    );
    expect(projectActivitySourceRefFor073("abc")).toBe("073:abc");
    expect(SQL).not.toMatch(
      /DROP TABLE|project_invite_auto_approve_events\s*\(/,
    );
  });

  it("maps 073 kinds the same way as the live dual-write", () => {
    expect(SQL).toMatch(/WHEN 'enabled' THEN 'invite\.auto_approve_enabled'/);
    expect(SQL).toMatch(/WHEN 'disabled' THEN 'invite\.auto_approve_disabled'/);
    expect(SQL).toMatch(/ELSE 'member\.auto_approved'/);
    expect(SQL).toMatch(
      /WHEN e\.event = 'member_auto_approved' THEN 'system' ELSE 'owner'/,
    );
    expect(SQL).toMatch(/'approvalSource', 'invite_auto_approve'/);
  });

  it("applies the same retention as the writer and never keeps email-like labels", () => {
    expect(SQL).toMatch(
      /r\.rn > 500 OR r\.created_at < NOW\(\) - interval '180 days'/,
    );
    expect(SQL).toMatch(
      /position\('@' IN e\.member_display_name\) > 0 THEN NULL/,
    );
  });
});
