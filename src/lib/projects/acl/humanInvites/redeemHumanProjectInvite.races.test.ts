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

describe("redeemHumanProjectInvite races / miss codes", () => {
  beforeEach(() => {
    for (const m of [peek, claim, classify, insert, getProject, getMembership]) {
      m.mockReset();
    }
    peek.mockResolvedValue(invite);
    getProject.mockResolvedValue({ ownerUserId: "owner" });
    getMembership.mockResolvedValue(null);
  });

  it("classifies expired, revoked, and already_redeemed", async () => {
    claim.mockResolvedValue({ ok: false, code: "invalid_token" });
    for (const code of ["expired", "revoked", "already_redeemed"] as const) {
      classify.mockResolvedValueOnce(code);
      await expect(
        redeemHumanProjectInvite({
          token: "t".repeat(22),
          claimantUserId: "user-1",
        }),
      ).resolves.toEqual({ ok: false, code });
    }
  });

  it("double accept leaves exactly one membership insert", async () => {
    claim
      .mockResolvedValueOnce({ ok: true, invite })
      .mockResolvedValueOnce({ ok: false, code: "invalid_token" });
    classify.mockResolvedValue("already_redeemed");
    insert.mockResolvedValue({ ok: true, membership });
    const first = await redeemHumanProjectInvite({
      token: "t".repeat(22),
      claimantUserId: "user-1",
    });
    const second = await redeemHumanProjectInvite({
      token: "t".repeat(22),
      claimantUserId: "user-2",
    });
    expect(first.ok).toBe(true);
    expect(second).toEqual({ ok: false, code: "already_redeemed" });
    expect(insert).toHaveBeenCalledTimes(1);
  });
});
