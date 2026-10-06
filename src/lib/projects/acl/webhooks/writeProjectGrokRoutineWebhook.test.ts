import { beforeEach, describe, expect, it, vi } from "vitest";

import { resetProjectAclSchemaEnsureForTests } from "@/lib/projects/acl/ensureProjectAclSchema";
import {
  GUARDED_INSERT,
  grokWebhookSql,
} from "@/lib/projects/acl/webhooks/grokWebhookSql.fixtures";

const sqlMock = vi.fn();
vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (value: unknown) => (Array.isArray(value) ? value : []),
}));
vi.mock("@/lib/projects/acl/webhooks/assertSafeProjectWebhookUrl", () => ({
  assertSafeProjectWebhookUrl: vi.fn(async (raw: unknown) => ({
    ok: true,
    url: new URL(String(raw)),
  })),
}));

import { writeProjectGrokRoutineWebhook } from "@/lib/projects/acl/webhooks/writeProjectGrokRoutineWebhook";

const inserts = () =>
  sqlMock.mock.calls.filter((c) => String(c[0]).includes(GUARDED_INSERT));

describe("writeProjectGrokRoutineWebhook (shared save step)", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    resetProjectAclSchemaEnsureForTests();
  });

  it("applies the condition inside ONE INSERT … SELECT and does not mutate its frozen input", async () => {
    sqlMock.mockImplementation(
      grokWebhookSql({ writable: true, present: true, statusRow: null }),
    );
    const target = Object.freeze({
      projectId: "proj-1",
      by: "member_row" as const,
      membershipId: "mem-1",
    });
    const input = Object.freeze({
      target,
      grokWebhookUrl: "https://example.com/wake",
      grokWebhookBearer: "  key  ",
    });
    const snapshot = JSON.stringify(input);
    const result = await writeProjectGrokRoutineWebhook(input);
    expect(result).toEqual({
      ok: true,
      grokWebhookUrl: "https://example.com/wake",
      deliveryModeFlipped: false,
    });
    expect(JSON.stringify(input)).toBe(snapshot);
    expect(inserts()).toHaveLength(1);
    const query = String(inserts()[0]?.[0]);
    expect(query).toMatch(
      /INSERT INTO project_membership_grok_routine_webhooks[\s\S]*SELECT[\s\S]*FROM project_memberships m[\s\S]*WHERE m\.project_id = /,
    );
    expect(query).not.toMatch(/\bUPDATE project_memberships\b/);
    expect(inserts()[0]).toContain("key");
  });

  it("never writes an inactive or removed row: no match → not_found, nothing returned", async () => {
    sqlMock.mockImplementation(
      grokWebhookSql({ writable: false, present: false, statusRow: null }),
    );
    const result = await writeProjectGrokRoutineWebhook({
      target: {
        projectId: "proj-1",
        by: "member_row",
        membershipId: "revoked-mem",
      },
      grokWebhookUrl: "https://example.com/wake",
      grokWebhookBearer: "key",
    });
    expect(result).toEqual({ ok: false, code: "not_found" });
    expect(String(inserts()[0]?.[0])).toContain("m.status = 'active'");
  });

  it("rejects a bad key before touching the database", async () => {
    const result = await writeProjectGrokRoutineWebhook({
      target: { projectId: "proj-1", by: "own_membership", userId: "u" },
      grokWebhookUrl: "https://example.com/wake",
      grokWebhookBearer: "x".repeat(2001),
    });
    expect(result).toEqual({ ok: false, code: "invalid_bearer" });
    expect(sqlMock).not.toHaveBeenCalled();
  });
});
