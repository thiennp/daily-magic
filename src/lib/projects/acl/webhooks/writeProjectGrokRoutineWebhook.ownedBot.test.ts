import { beforeEach, describe, expect, it, vi } from "vitest";

import { resetProjectAclSchemaEnsureForTests } from "@/lib/projects/acl/ensureProjectAclSchema";
import {
  GUARDED_INSERT,
  grokWebhookSql,
} from "@/lib/projects/acl/webhooks/grokWebhookSql.fixtures";
import { writeProjectGrokRoutineWebhook } from "@/lib/projects/acl/webhooks/writeProjectGrokRoutineWebhook";

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

const inserts = () =>
  sqlMock.mock.calls.filter((c) => String(c[0]).includes(GUARDED_INSERT));

describe("writeProjectGrokRoutineWebhook owned_bot_row", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    resetProjectAclSchemaEnsureForTests();
  });

  it("includes EXISTS owner_user_id guard in the INSERT … SELECT", async () => {
    sqlMock.mockImplementation(
      grokWebhookSql({ writable: true, present: true, statusRow: null }),
    );
    const result = await writeProjectGrokRoutineWebhook({
      target: {
        projectId: "proj-1",
        by: "owned_bot_row",
        membershipId: "mem-1",
        ownerUserId: "human-1",
      },
      grokWebhookUrl: "https://example.com/wake",
      grokWebhookBearer: "key",
    });
    expect(result.ok).toBe(true);
    const query = String(inserts()[0]?.[0]);
    expect(query).toContain("owned_bot_row");
    expect(query).toContain("agent_access_tokens");
    expect(query).toContain("t.owner_user_id = ");
    expect(inserts()[0]).toContain("human-1");
  });

  it("refuses a non-owner: no SQL match → not_found", async () => {
    sqlMock.mockImplementation(
      grokWebhookSql({ writable: false, present: false, statusRow: null }),
    );
    const result = await writeProjectGrokRoutineWebhook({
      target: {
        projectId: "proj-1",
        by: "owned_bot_row",
        membershipId: "mem-1",
        ownerUserId: "stranger",
      },
      grokWebhookUrl: "https://example.com/wake",
      grokWebhookBearer: "key",
    });
    expect(result).toEqual({ ok: false, code: "not_found" });
  });
});
