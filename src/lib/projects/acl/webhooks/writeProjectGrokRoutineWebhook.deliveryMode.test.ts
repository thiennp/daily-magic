import { beforeEach, describe, expect, it, vi } from "vitest";

import { resetProjectAclSchemaEnsureForTests } from "@/lib/projects/acl/ensureProjectAclSchema";
import { GUARDED_INSERT } from "@/lib/projects/acl/webhooks/grokWebhookSql.fixtures";

const db = vi.hoisted(() => ({ mode: "poll" }));
const sqlMock = vi.fn(
  async (strings: TemplateStringsArray, ...values: unknown[]) => {
    const text = strings.join("?");
    if (text.includes(GUARDED_INSERT)) {
      return [{ webhook_url: values[0], membership_id: "mem-1" }];
    }
    if (text.includes("SET delivery_mode")) {
      if (db.mode === values[0]) return [];
      db.mode = String(values[0]);
      return [{ id: "mem-1" }];
    }
    return [];
  },
);
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

const save = () =>
  writeProjectGrokRoutineWebhook({
    target: { projectId: "proj-1", by: "member_row", membershipId: "mem-1" },
    grokWebhookUrl: "https://grok.example/wake",
    grokWebhookBearer: "k",
  });

describe("writeProjectGrokRoutineWebhook flips delivery_mode", () => {
  beforeEach(() => {
    sqlMock.mockClear();
    resetProjectAclSchemaEnsureForTests();
    db.mode = "poll";
  });

  it("a saved wake link moves poll → webhook once", async () => {
    expect(await save()).toMatchObject({ ok: true, deliveryModeFlipped: true });
    expect(db.mode).toBe("webhook");
    expect(await save()).toMatchObject({
      ok: true,
      deliveryModeFlipped: false,
    });
  });

  it("a failed flip never fails the save", async () => {
    const original = sqlMock.getMockImplementation();
    sqlMock.mockImplementation(async (strings, ...values) => {
      if (strings.join("?").includes("SET delivery_mode")) {
        throw new Error("db down");
      }
      return original!(strings, ...values);
    });
    expect(await save()).toMatchObject({
      ok: true,
      deliveryModeFlipped: false,
    });
  });
});
