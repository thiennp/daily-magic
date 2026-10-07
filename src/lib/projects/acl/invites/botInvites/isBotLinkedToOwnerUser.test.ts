import { beforeEach, describe, expect, it, vi } from "vitest";

import { isBotLinkedToOwnerUser } from "@/lib/projects/acl/invites/botInvites/isBotLinkedToOwnerUser";

const sqlMock = vi.fn();
vi.mock("@/lib/db", () => ({ getSql: () => sqlMock, asRowArray: (r: unknown) => (Array.isArray(r) ? r : []) }));
vi.mock("@/lib/agentAccess/ensureAgentAccessSchema", () => ({ ensureAgentAccessSchema: vi.fn() }));

describe("isBotLinkedToOwnerUser (server-side same-owner proof)", () => {
  beforeEach(() => sqlMock.mockReset());

  it("reads only live, owner-linked agent-access credentials", async () => {
    sqlMock.mockResolvedValue([{ linked: 1 }]);
    expect(await isBotLinkedToOwnerUser({ botUserId: "bot-1", ownerUserId: "owner-1" })).toBe(true);
    const [strings, ...values] = sqlMock.mock.calls[0] ?? [];
    const text = String(strings);
    expect(text).toContain("FROM agent_access_tokens");
    expect(text).toContain("owner_user_id =");
    expect(text).toContain("revoked_at IS NULL");
    expect(text).toContain("expires_at IS NULL OR expires_at > NOW()");
    expect(values).toEqual(["bot-1", "owner-1"]);
  });

  it("unclaimed, revoked, expired or other-owner credential → false", async () => {
    sqlMock.mockResolvedValue([]);
    expect(await isBotLinkedToOwnerUser({ botUserId: "bot-1", ownerUserId: "owner-1" })).toBe(false);
  });

  it("the owner is never their own bot", async () => {
    expect(await isBotLinkedToOwnerUser({ botUserId: "owner-1", ownerUserId: "owner-1" })).toBe(false);
    expect(sqlMock).not.toHaveBeenCalled();
  });
});
