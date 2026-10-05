import { beforeEach, describe, expect, it, vi } from "vitest";

const peek = vi.hoisted(() => vi.fn());
const claimInsert = vi.hoisted(() => vi.fn());
const resolveName = vi.hoisted(() => vi.fn());
const loadName = vi.hoisted(() => vi.fn());
const loadVerified = vi.hoisted(() => vi.fn());
const getProject = vi.hoisted(() => vi.fn());
const getMembership = vi.hoisted(() => vi.fn());

vi.mock("@/lib/projects/acl/humanInvites/peekHumanInviteByToken", () => ({
  peekHumanInviteByToken: peek,
}));
vi.mock("@/lib/projects/acl/humanInvites/claimAndInsertHumanMembership", () => ({
  claimAndInsertHumanMembership: claimInsert,
}));
vi.mock("@/lib/projects/acl/humanInvites/classifyHumanInviteMiss", () => ({
  classifyHumanInviteMiss: vi.fn(),
}));
vi.mock("@/lib/projects/acl/humanInvites/resolveHumanAcceptDisplayName", () => ({
  resolveHumanAcceptDisplayName: resolveName,
}));
vi.mock("@/lib/projects/acl/humanInvites/loadUserAccountName", () => ({
  loadUserAccountName: loadName,
}));
vi.mock("@/lib/projects/acl/humanInvites/loadUserEmailVerified", () => ({
  loadUserEmailVerified: loadVerified,
}));
vi.mock("@/lib/projects/userProjectQueries", () => ({
  getUserProjectById: getProject,
}));
vi.mock("@/lib/projects/acl/getActiveProjectMembership", () => ({
  getActiveProjectMembership: getMembership,
}));

import {
  REDEEM_TEST_INVITE as inviteBase,
  REDEEM_TEST_MEMBERSHIP as membership,
} from "@/lib/projects/acl/humanInvites/redeemHumanInviteTestFixtures";
import { redeemHumanProjectInvite } from "@/lib/projects/acl/humanInvites/redeemHumanProjectInvite";

const token = "t".repeat(22);

describe("redeemHumanProjectInvite email lock case", () => {
  beforeEach(() => {
    for (const m of [
      peek, claimInsert, resolveName, loadName, loadVerified, getProject, getMembership,
    ]) {
      m.mockReset();
    }
    getProject.mockResolvedValue({ ownerUserId: "owner" });
    getMembership.mockResolvedValue(null);
    loadName.mockResolvedValue("Ada");
    resolveName.mockResolvedValue({ ok: true, name: "Soft Vale" });
    loadVerified.mockResolvedValue(true);
    claimInsert.mockResolvedValue({ ok: true, invite: inviteBase, membership });
  });

  it("mode B matches legacy mixed-case invite email to session", async () => {
    peek.mockResolvedValue({
      ...inviteBase,
      email: "Tom@Gmail.com ",
      requireEmailMatch: true,
    });
    const result = await redeemHumanProjectInvite({
      token,
      claimantUserId: "user-1",
      claimantEmail: "tom@gmail.com",
      suggestedProjectDisplayName: "Soft Vale",
    });
    expect(result.ok).toBe(true);
    expect(claimInsert).toHaveBeenCalledWith(
      expect.objectContaining({ claimantEmailNormalized: "tom@gmail.com" }),
    );
  });

  it("mode B mismatch then matching account succeeds", async () => {
    const locked = {
      ...inviteBase,
      email: "ada@example.com",
      requireEmailMatch: true,
    };
    peek.mockResolvedValue(locked);
    await redeemHumanProjectInvite({
      token,
      claimantUserId: "wrong",
      claimantEmail: "wrong@x.com",
      suggestedProjectDisplayName: "Soft Vale",
    });
    expect(claimInsert).not.toHaveBeenCalled();
    claimInsert.mockResolvedValue({ ok: true, invite: locked, membership });
    const ok = await redeemHumanProjectInvite({
      token,
      claimantUserId: "user-1",
      claimantEmail: "ada@example.com",
      suggestedProjectDisplayName: "Soft Vale",
    });
    expect(ok.ok).toBe(true);
    expect(claimInsert).toHaveBeenCalledTimes(1);
  });
});
