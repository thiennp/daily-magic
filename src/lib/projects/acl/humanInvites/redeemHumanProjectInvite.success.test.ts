import { beforeEach, describe, expect, it, vi } from "vitest";

const peek = vi.hoisted(() => vi.fn());
const claimInsert = vi.hoisted(() => vi.fn());
const resolveName = vi.hoisted(() => vi.fn());
const loadName = vi.hoisted(() => vi.fn());
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

describe("redeemHumanProjectInvite success / naming", () => {
  beforeEach(() => {
    for (const m of [peek, claimInsert, resolveName, loadName, getProject, getMembership]) {
      m.mockReset();
    }
    peek.mockResolvedValue(invite);
    getProject.mockResolvedValue({ ownerUserId: "owner" });
    getMembership.mockResolvedValue(null);
    loadName.mockResolvedValue("Ada Lovelace");
    resolveName.mockResolvedValue({ ok: true, name: "Ada Lovelace" });
  });

  it("accepts with a valid suggested name", async () => {
    resolveName.mockResolvedValue({ ok: true, name: "Soft Vale" });
    claimInsert.mockResolvedValue({ ok: true, invite, membership });
    const result = await redeemHumanProjectInvite({
      token,
      claimantUserId: "user-1",
      suggestedProjectDisplayName: "Soft Vale",
    });
    expect(result).toMatchObject({ ok: true, projectDisplayName: "Soft Vale" });
    expect(claimInsert).toHaveBeenCalledWith(
      expect.objectContaining({ projectDisplayName: "Soft Vale" }),
    );
  });

  it("derives from account name when suggestion omitted", async () => {
    claimInsert.mockResolvedValue({ ok: true, invite, membership });
    await redeemHumanProjectInvite({ token, claimantUserId: "user-1" });
    expect(loadName).toHaveBeenCalledWith("user-1");
    expect(claimInsert).toHaveBeenCalled();
  });

  it("already_owner skips naming and claim", async () => {
    getProject.mockResolvedValue({ ownerUserId: "user-1" });
    await expect(
      redeemHumanProjectInvite({ token, claimantUserId: "user-1" }),
    ).resolves.toEqual({ ok: false, code: "already_owner", projectId: "proj-1" });
    expect(resolveName).not.toHaveBeenCalled();
    expect(claimInsert).not.toHaveBeenCalled();
  });

  it("taken name does not claim (invite stays pending)", async () => {
    resolveName.mockResolvedValue({
      ok: false,
      code: "display_name_taken",
      suggestedProjectDisplayName: "Taken",
    });
    await expect(
      redeemHumanProjectInvite({
        token,
        claimantUserId: "user-1",
        suggestedProjectDisplayName: "Taken",
      }),
    ).resolves.toMatchObject({ ok: false, code: "display_name_taken" });
    expect(claimInsert).not.toHaveBeenCalled();
  });
});
