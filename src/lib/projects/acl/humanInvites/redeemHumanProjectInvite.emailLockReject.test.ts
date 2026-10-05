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

import { REDEEM_TEST_INVITE as inviteBase } from "@/lib/projects/acl/humanInvites/redeemHumanInviteTestFixtures";
import { redeemHumanProjectInvite } from "@/lib/projects/acl/humanInvites/redeemHumanProjectInvite";

const token = "t".repeat(22);
const locked = {
  ...inviteBase,
  email: "ada@example.com",
  requireEmailMatch: true,
};

describe("redeemHumanProjectInvite email lock reject", () => {
  beforeEach(() => {
    for (const m of [
      peek, claimInsert, resolveName, loadName, loadVerified, getProject, getMembership,
    ]) {
      m.mockReset();
    }
    peek.mockResolvedValue(locked);
    getProject.mockResolvedValue({ ownerUserId: "owner" });
    getMembership.mockResolvedValue(null);
    loadName.mockResolvedValue("Ada");
    resolveName.mockResolvedValue({ ok: true, name: "Soft Vale" });
    loadVerified.mockResolvedValue(true);
  });

  it("mode B mismatch skips naming/claim (invite pending)", async () => {
    const result = await redeemHumanProjectInvite({
      token,
      claimantUserId: "user-1",
      claimantEmail: "other@gmail.com",
      suggestedProjectDisplayName: "Soft Vale",
    });
    expect(result).toEqual({
      ok: false,
      code: "invite_email_mismatch",
      projectId: "proj-1",
      invitedEmailMasked: "a***@e***.com",
    });
    expect(resolveName).not.toHaveBeenCalled();
    expect(claimInsert).not.toHaveBeenCalled();
  });

  it("mode B unverified email is blocked before claim", async () => {
    loadVerified.mockResolvedValue(false);
    const result = await redeemHumanProjectInvite({
      token,
      claimantUserId: "user-1",
      claimantEmail: "ada@example.com",
      suggestedProjectDisplayName: "Soft Vale",
    });
    expect(result).toMatchObject({
      ok: false,
      code: "invite_email_unverified",
      invitedEmailMasked: "a***@e***.com",
    });
    expect(claimInsert).not.toHaveBeenCalled();
  });

  it("mode B missing session email is mismatch", async () => {
    const result = await redeemHumanProjectInvite({
      token,
      claimantUserId: "user-1",
      claimantEmail: "",
      suggestedProjectDisplayName: "Soft Vale",
    });
    expect(result).toMatchObject({ ok: false, code: "invite_email_mismatch" });
    expect(claimInsert).not.toHaveBeenCalled();
  });
});
