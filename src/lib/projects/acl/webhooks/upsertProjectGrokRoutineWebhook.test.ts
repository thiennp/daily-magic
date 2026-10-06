import { beforeEach, describe, expect, it, vi } from "vitest";

import { resetProjectAclSchemaEnsureForTests } from "@/lib/projects/acl/ensureProjectAclSchema";
import {
  GUARDED_INSERT,
  grokWebhookSql,
  type GrokWebhookSqlState,
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

import { upsertProjectGrokRoutineWebhook } from "@/lib/projects/acl/webhooks/upsertProjectGrokRoutineWebhook";

const db: GrokWebhookSqlState = {
  writable: true,
  present: true,
  statusRow: null,
};
const call = () =>
  upsertProjectGrokRoutineWebhook({
    projectId: "proj-1",
    actorUserId: "user-1",
    grokWebhookUrl: "https://example.com/wake",
    grokWebhookBearer: "stored-bearer",
  });
const inserts = () =>
  sqlMock.mock.calls.filter((c) => String(c[0]).includes(GUARDED_INSERT));

describe("upsertProjectGrokRoutineWebhook (register_project_webhook path)", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    resetProjectAclSchemaEnsureForTests();
    Object.assign(db, { writable: true, present: true });
    sqlMock.mockImplementation(grokWebhookSql(db));
  });

  it("uses the shared guarded write on the caller's own membership; stores the bearer, never returns it", async () => {
    const result = await call();
    expect(result).toEqual({
      ok: true,
      grokWebhookUrl: "https://example.com/wake",
      deliveryModeFlipped: false,
    });
    expect(JSON.stringify(result)).not.toContain("stored-bearer");
    const [strings, ...values] = inserts()[0] ?? [];
    expect(values).toEqual(
      expect.arrayContaining([
        "stored-bearer",
        "proj-1",
        "own_membership",
        "user-1",
      ]),
    );
    expect(String(strings)).toContain("RETURNING webhook_url");
    expect(String(strings)).not.toContain("RETURNING bearer");
  });

  it("keeps the bot codes: no active membership → forbidden, no nickname → naming_required", async () => {
    Object.assign(db, { writable: false, present: false });
    expect(await call()).toEqual({ ok: false, code: "forbidden" });
    Object.assign(db, { writable: false, present: true });
    expect(await call()).toEqual({ ok: false, code: "naming_required" });
  });
});
