import { beforeEach, describe, expect, it, vi } from "vitest";

import { resolveDispatchRecipients } from "@/lib/projects/acl/messaging/resolveDispatchRecipients";

const sqlMock = vi.fn();
const loadDeviceId = vi.fn();

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));
vi.mock("@/lib/projects/userProjectQueries", () => ({
  getUserProjectById: vi.fn(async () => null),
}));
vi.mock("@/lib/projects/acl/messaging/loadComputerMembershipDeviceId", () => ({
  loadComputerMembershipDeviceId: (id: string) => loadDeviceId(id),
}));

describe("resolveDispatchRecipients computer seat", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    loadDeviceId.mockReset();
  });

  it("resolves owner→own computer via toMembershipId (user_id === actor)", async () => {
    sqlMock.mockImplementation(async (strings: TemplateStringsArray) => {
      const q = String(strings);
      if (q.includes("AND id =") && q.includes("member_kind")) {
        return [
          {
            id: "mem-mac",
            user_id: "user-owner",
            member_kind: "computer",
          },
        ];
      }
      return [];
    });
    loadDeviceId.mockResolvedValue("dev-1");
    const result = await resolveDispatchRecipients({
      projectId: "proj-1",
      actorUserId: "user-owner",
      toMembershipId: "mem-mac",
      toProjectDisplayName: null,
    });
    expect(result).toEqual({
      ok: true,
      recipients: [
        {
          id: "mem-mac",
          user_id: "user-owner",
          memberKind: "computer",
          deviceId: "dev-1",
        },
      ],
    });
    expect(loadDeviceId).toHaveBeenCalledWith("mem-mac");
  });

  it("recipient_not_found when computer has no device_id (pre-Mac mig)", async () => {
    sqlMock.mockResolvedValue([
      { id: "mem-mac", user_id: "user-owner", member_kind: "computer" },
    ]);
    loadDeviceId.mockResolvedValue(null);
    const result = await resolveDispatchRecipients({
      projectId: "proj-1",
      actorUserId: "user-owner",
      toMembershipId: "mem-mac",
      toProjectDisplayName: null,
    });
    expect(result).toEqual({ ok: false, code: "recipient_not_found" });
  });
});
