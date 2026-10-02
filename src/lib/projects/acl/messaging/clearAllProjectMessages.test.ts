import { beforeEach, describe, expect, it, vi } from "vitest";

import { clearAllProjectMessages } from "@/lib/projects/acl/messaging/clearAllProjectMessages";
import { resetProjectAclSchemaEnsureForTests } from "@/lib/projects/acl/ensureProjectAclSchema";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";
import { writeProjectAccessAudit } from "@/lib/projects/acl/writeProjectAccessAudit";

const sqlMock = vi.fn();

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));

vi.mock("@/lib/projects/userProjectQueries", () => ({
  getUserProjectById: vi.fn(async () => ({
    id: "proj-1",
    ownerUserId: "owner-1",
  })),
}));

vi.mock("@/lib/projects/acl/writeProjectAccessAudit", () => ({
  writeProjectAccessAudit: vi.fn(async () => undefined),
}));

const schemaStub = async (strings: TemplateStringsArray) => {
  const q = String(strings);
  if (q.includes("CREATE TABLE") || q.includes("ALTER TABLE")) return [];
  if (q.includes("UPDATE project_memberships")) return [];
  if (q.includes("DELETE FROM project_messages") && q.includes("make_interval")) {
    return [];
  }
  return null;
};

describe("clearAllProjectMessages happy path", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    vi.mocked(writeProjectAccessAudit).mockClear();
    vi.mocked(getUserProjectById).mockResolvedValue({
      id: "proj-1",
      ownerUserId: "owner-1",
    } as never);
    resetProjectAclSchemaEnsureForTests();
  });

  it("wipes messages+deliveries, audits msg.clear, idempotent at 0", async () => {
    sqlMock.mockImplementation(async (strings: TemplateStringsArray) => {
      const stub = await schemaStub(strings);
      if (stub !== null) return stub;
      const q = String(strings);
      if (q.includes("DELETE FROM project_message_deliveries")) {
        return [{ id: "d1" }, { id: "d2" }];
      }
      if (q.includes("DELETE FROM project_messages")) {
        return [{ id: "m1" }];
      }
      return [];
    });

    const result = await clearAllProjectMessages({
      projectId: "proj-1",
      actorUserId: "owner-1",
      confirm: true,
    });
    expect(result).toEqual({
      ok: true,
      deletedMessages: 1,
      deletedDeliveries: 2,
    });
    expect(writeProjectAccessAudit).toHaveBeenCalledWith(
      expect.objectContaining({
        action: "msg.clear",
        detail: expect.objectContaining({
          deletedMessages: 1,
          deletedDeliveries: 2,
        }),
      }),
    );
    expect(
      sqlMock.mock.calls.some((call) =>
        String(call[0]).includes("DELETE FROM project_membership_webhooks"),
      ),
    ).toBe(false);

    sqlMock.mockReset();
    vi.mocked(writeProjectAccessAudit).mockClear();
    resetProjectAclSchemaEnsureForTests();
    sqlMock.mockImplementation(async (strings: TemplateStringsArray) => {
      const stub = await schemaStub(strings);
      if (stub !== null) return stub;
      if (String(strings).includes("DELETE FROM")) return [];
      return [];
    });
    const second = await clearAllProjectMessages({
      projectId: "proj-1",
      actorUserId: "owner-1",
      confirm: true,
    });
    expect(second).toEqual({
      ok: true,
      deletedMessages: 0,
      deletedDeliveries: 0,
    });
  });
});
