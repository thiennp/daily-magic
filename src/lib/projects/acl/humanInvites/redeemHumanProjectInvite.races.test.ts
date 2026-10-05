import { beforeEach, describe, expect, it, vi } from "vitest";

const peek = vi.hoisted(() => vi.fn());
const claimInsert = vi.hoisted(() => vi.fn());
const classify = vi.hoisted(() => vi.fn());
const resolveName = vi.hoisted(() => vi.fn());
const getProject = vi.hoisted(() => vi.fn());
const getMembership = vi.hoisted(() => vi.fn());

vi.mock("@/lib/projects/acl/humanInvites/peekHumanInviteByToken", () => ({
  peekHumanInviteByToken: peek,
}));
vi.mock("@/lib/projects/acl/humanInvites/claimAndInsertHumanMembership", () => ({
  claimAndInsertHumanMembership: claimInsert,
}));
vi.mock("@/lib/projects/acl/humanInvites/classifyHumanInviteMiss", () => ({
  classifyHumanInviteMiss: classify,
}));
vi.mock("@/lib/projects/acl/humanInvites/resolveHumanAcceptDisplayName", () => ({
  resolveHumanAcceptDisplayName: resolveName,
}));
vi.mock("@/lib/projects/acl/humanInvites/loadUserAccountName", () => ({
  loadUserAccountName: vi.fn(async () => null),
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

const token = "t".repeat(22);

describe("redeemHumanProjectInvite races", () => {
  beforeEach(() => {
    for (const m of [peek, claimInsert, classify, resolveName, getProject, getMembership]) {
      m.mockReset();
    }
    peek.mockResolvedValue(invite);
    getProject.mockResolvedValue({ ownerUserId: "owner" });
    getMembership.mockResolvedValue(null);
    resolveName.mockResolvedValue({ ok: true, name: "Soft Vale" });
  });

  it("classifies expired/revoked/used after claim miss", async () => {
    claimInsert.mockResolvedValue({ ok: false, code: "invalid_token" });
    for (const code of ["expired", "revoked", "already_redeemed"] as const) {
      classify.mockResolvedValueOnce(code);
      await expect(
        redeemHumanProjectInvite({
          token,
          claimantUserId: "user-1",
          suggestedProjectDisplayName: "Soft Vale",
        }),
      ).resolves.toEqual({ ok: false, code });
    }
  });

  it("double accept: one seat, second already_redeemed", async () => {
    claimInsert
      .mockResolvedValueOnce({ ok: true, invite, membership })
      .mockResolvedValueOnce({ ok: false, code: "invalid_token" });
    classify.mockResolvedValue("already_redeemed");
    const first = await redeemHumanProjectInvite({
      token,
      claimantUserId: "user-1",
      suggestedProjectDisplayName: "Soft Vale",
    });
    const second = await redeemHumanProjectInvite({
      token,
      claimantUserId: "user-2",
      suggestedProjectDisplayName: "Other Name",
    });
    expect(first.ok).toBe(true);
    expect(second).toEqual({ ok: false, code: "already_redeemed" });
  });

  it("same-name race: loser display_name_taken, invite unconsumed", async () => {
    resolveName.mockResolvedValue({ ok: true, name: "Same Name" });
    claimInsert
      .mockResolvedValueOnce({ ok: true, invite, membership })
      .mockResolvedValueOnce({ ok: false, code: "display_name_taken" });
    const first = await redeemHumanProjectInvite({
      token,
      claimantUserId: "user-1",
      suggestedProjectDisplayName: "Same Name",
    });
    peek.mockResolvedValue({ ...invite, id: "inv-2" });
    const second = await redeemHumanProjectInvite({
      token: "u".repeat(22),
      claimantUserId: "user-2",
      suggestedProjectDisplayName: "Same Name",
    });
    expect(first.ok).toBe(true);
    expect(second).toMatchObject({
      ok: false,
      code: "display_name_taken",
      suggestedProjectDisplayName: "Same Name",
    });
  });
});
