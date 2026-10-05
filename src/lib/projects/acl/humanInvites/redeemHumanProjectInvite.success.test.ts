import { beforeEach, describe, expect, it, vi } from "vitest";

const peek = vi.hoisted(() => vi.fn());
const claim = vi.hoisted(() => vi.fn());
const classify = vi.hoisted(() => vi.fn());
const insert = vi.hoisted(() => vi.fn());
const getProject = vi.hoisted(() => vi.fn());
const getMembership = vi.hoisted(() => vi.fn());

vi.mock("@/lib/projects/acl/humanInvites/peekHumanInviteByToken", () => ({
  peekHumanInviteByToken: peek,
}));
vi.mock("@/lib/projects/acl/humanInvites/claimHumanInviteToken", () => ({
  claimHumanInviteToken: claim,
}));
vi.mock("@/lib/projects/acl/humanInvites/classifyHumanInviteMiss", () => ({
  classifyHumanInviteMiss: classify,
}));
vi.mock("@/lib/projects/acl/humanInvites/insertHumanProjectMembership", () => ({
  insertHumanProjectMembership: insert,
}));
vi.mock("@/lib/projects/userProjectQueries", () => ({
  getUserProjectById: getProject,
}));
vi.mock("@/lib/projects/acl/getActiveProjectMembership", () => ({
  getActiveProjectMembership: getMembership,
}));

import {
  REDEEM_TEST_INVITE as invite,
  REDEEM_TEST_MEMBERSHIP as membership,
} from "@/lib/projects/acl/humanInvites/redeemHumanInviteTestFixtures";
import { redeemHumanProjectInvite } from "@/lib/projects/acl/humanInvites/redeemHumanProjectInvite";

describe("redeemHumanProjectInvite success / explicit states", () => {
  beforeEach(() => {
    for (const m of [peek, claim, classify, insert, getProject, getMembership]) {
      m.mockReset();
    }
    peek.mockResolvedValue(invite);
    getProject.mockResolvedValue({ ownerUserId: "owner" });
    getMembership.mockResolvedValue(null);
  });

  it("accepts and inserts one human membership", async () => {
    claim.mockResolvedValue({ ok: true, invite });
    insert.mockResolvedValue({ ok: true, membership });
    const result = await redeemHumanProjectInvite({
      token: "t".repeat(22),
      claimantUserId: "user-1",
    });
    expect(result.ok).toBe(true);
    expect(insert).toHaveBeenCalledWith({
      projectId: "proj-1",
      userId: "user-1",
      role: "member",
    });
  });

  it("returns already_owner without claiming", async () => {
    getProject.mockResolvedValue({ ownerUserId: "user-1" });
    await expect(
      redeemHumanProjectInvite({
        token: "t".repeat(22),
        claimantUserId: "user-1",
      }),
    ).resolves.toEqual({
      ok: false,
      code: "already_owner",
      projectId: "proj-1",
    });
    expect(claim).not.toHaveBeenCalled();
  });

  it("returns already_member without claiming", async () => {
    getMembership.mockResolvedValue(membership);
    await expect(
      redeemHumanProjectInvite({
        token: "t".repeat(22),
        claimantUserId: "user-1",
      }),
    ).resolves.toEqual({
      ok: false,
      code: "already_member",
      projectId: "proj-1",
    });
    expect(claim).not.toHaveBeenCalled();
  });
});
