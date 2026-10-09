import { beforeEach, describe, expect, it, vi } from "vitest";

import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";

const getActiveProjectMembership = vi.hoisted(() => vi.fn());
vi.mock("@/lib/projects/acl/getActiveProjectMembership", () => ({
  getActiveProjectMembership,
}));

import { resolveProjectInviteCreator } from "@/lib/projects/acl/invites/resolveProjectInviteCreator";

const project = { id: "p1", ownerUserId: "owner" } as UserProjectRecord;
const seat = (over: Record<string, unknown>) => ({
  role: "member",
  memberKind: "human",
  scopes: ["msg:dispatch"],
  ...over,
});

describe("resolveProjectInviteCreator", () => {
  beforeEach(() => getActiveProjectMembership.mockReset());

  it("lets the owner through without a seat lookup", async () => {
    expect(await resolveProjectInviteCreator(project, "owner")).toEqual({
      ok: true,
      isOwner: true,
    });
    expect(getActiveProjectMembership).not.toHaveBeenCalled();
  });

  it("lets an active human member in, capped to their own scopes", async () => {
    getActiveProjectMembership.mockResolvedValue(seat({}));
    const result = await resolveProjectInviteCreator(project, "u2");
    expect(result).toMatchObject({ ok: true, isOwner: false });
    if (result.ok && !result.isOwner) {
      expect(result.grantableScopes).toEqual(["msg:dispatch"]);
    }
  });

  it.each([
    ["viewer", seat({ role: "viewer" })],
    ["bot", seat({ memberKind: "bot" })],
    ["non-member", null],
  ])("rejects a %s", async (_name, membership) => {
    getActiveProjectMembership.mockResolvedValue(membership);
    expect(await resolveProjectInviteCreator(project, "u2")).toEqual({
      ok: false,
    });
  });
});
