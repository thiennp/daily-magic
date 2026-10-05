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
const locked = {
  ...inviteBase,
  email: "ada@example.com",
  requireEmailMatch: true,
};

describe("redeemHumanProjectInvite email lock match", () => {
  beforeEach(() => {
    for (const m of [
      peek, claimInsert, resolveName, loadName, loadVerified, getProject, getMembership,
    ]) {
      m.mockReset();
    }
    peek.mockResolvedValue(inviteBase);
    getProject.mockResolvedValue({ ownerUserId: "owner" });
    getMembership.mockResolvedValue(null);
    loadName.mockResolvedValue("Ada");
    resolveName.mockResolvedValue({ ok: true, name: "Soft Vale" });
    loadVerified.mockResolvedValue(true);
    claimInsert.mockResolvedValue({ ok: true, invite: inviteBase, membership });
  });

  it("mode A accepts any account email", async () => {
    const result = await redeemHumanProjectInvite({
      token,
      claimantUserId: "user-1",
      claimantEmail: "other@x.com",
      suggestedProjectDisplayName: "Soft Vale",
    });
    expect(result.ok).toBe(true);
    expect(loadVerified).not.toHaveBeenCalled();
    expect(claimInsert).toHaveBeenCalledWith(
      expect.objectContaining({ claimantEmailNormalized: "other@x.com" }),
    );
  });

  it("mode B matching email (case-insensitive) claims once", async () => {
    peek.mockResolvedValue(locked);
    const result = await redeemHumanProjectInvite({
      token,
      claimantUserId: "user-1",
      claimantEmail: "Ada@Example.COM",
      suggestedProjectDisplayName: "Soft Vale",
    });
    expect(result.ok).toBe(true);
    expect(claimInsert).toHaveBeenCalledWith(
      expect.objectContaining({ claimantEmailNormalized: "ada@example.com" }),
    );
  });

  it("mode B mismatch then matching account succeeds", async () => {
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
