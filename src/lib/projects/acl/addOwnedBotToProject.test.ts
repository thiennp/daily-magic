import { beforeEach, describe, expect, it, vi } from "vitest";

const m = vi.hoisted(() => ({
  actor: vi.fn(),
  agent: vi.fn(),
  owned: vi.fn(),
  status: vi.fn(),
  name: vi.fn(),
  insert: vi.fn(),
  approve: vi.fn(),
  sql: vi.fn(),
}));
vi.mock("@/lib/projects/acl/resolveFolderRefActor", () => ({
  resolveFolderRefActor: m.actor,
}));
vi.mock("@/lib/projects/acl/isAgentUser", () => ({ isAgentUserId: m.agent }));
vi.mock("@/lib/projects/acl/isBotOwnedBy", () => ({ isBotOwnedBy: m.owned }));
vi.mock("@/lib/projects/acl/checkProjectMembershipStatus", () => ({
  checkProjectMembershipStatus: m.status,
}));
vi.mock("@/lib/projects/acl/invites/resolveRedeemSuggestedDisplayName", () => ({
  resolveRedeemSuggestedDisplayName: m.name,
}));
vi.mock("@/lib/projects/acl/insertOpenPendingAccessRequest", () => ({
  insertOpenPendingAccessRequest: m.insert,
}));
vi.mock("@/lib/projects/acl/approveProjectAccessRequest", () => ({
  approveProjectAccessRequest: m.approve,
}));
vi.mock("@/lib/projects/userProjectQueries", () => ({
  getUserProjectById: async () => ({ ownerUserId: "owner" }),
}));
vi.mock("@/lib/db", () => ({ getSql: () => m.sql }));

import { addOwnedBotToProject } from "@/lib/projects/acl/addOwnedBotToProject";

const input = {
  projectId: "p1",
  actorUserId: "me",
  botUserId: "bot",
  projectDisplayName: "Cursor",
};

describe("addOwnedBotToProject", () => {
  beforeEach(() => {
    for (const fn of Object.values(m)) fn.mockReset();
    m.actor.mockResolvedValue({ ok: true, isOwner: false });
    m.agent.mockResolvedValue(true);
    m.owned.mockResolvedValue(true);
    m.status.mockResolvedValue("none");
    m.name.mockResolvedValue({ ok: true, name: "Cursor" });
    m.insert.mockResolvedValue({ ok: true, request: { id: "r1" } });
    m.approve.mockResolvedValue({ ok: true, membership: { id: "mem1" } });
    m.sql.mockResolvedValue([]);
  });

  it("joins the bot active at once, with the actor as its inviter, approving as the project owner", async () => {
    expect(await addOwnedBotToProject(input)).toEqual({
      ok: true,
      membershipId: "mem1",
    });
    expect(m.approve).toHaveBeenCalledWith(
      expect.objectContaining({ ownerUserId: "owner", requestId: "r1" }),
    );
    expect(m.sql).toHaveBeenCalled();
  });

  it("refuses a bot that is not yours or is already in the project", async () => {
    m.owned.mockResolvedValue(false);
    expect(await addOwnedBotToProject(input)).toEqual({
      ok: false,
      code: "not_your_bot",
    });
    m.owned.mockResolvedValue(true);
    m.status.mockResolvedValue("active");
    expect(await addOwnedBotToProject(input)).toEqual({
      ok: false,
      code: "already_in_project",
    });
    expect(m.approve).not.toHaveBeenCalled();
  });

  it("refuses viewers and surfaces a taken name", async () => {
    m.actor.mockResolvedValue({ ok: false, code: "forbidden" });
    expect(await addOwnedBotToProject(input)).toEqual({
      ok: false,
      code: "forbidden",
    });
    m.actor.mockResolvedValue({ ok: true, isOwner: false });
    m.name.mockResolvedValue({ ok: false, code: "display_name_taken" });
    expect(await addOwnedBotToProject(input)).toEqual({
      ok: false,
      code: "display_name_taken",
    });
  });
});
