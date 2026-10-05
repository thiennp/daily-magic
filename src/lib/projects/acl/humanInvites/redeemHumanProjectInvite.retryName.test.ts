import { beforeEach, describe, expect, it, vi } from "vitest";

const peek = vi.hoisted(() => vi.fn());
const claimInsert = vi.hoisted(() => vi.fn());
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
  classifyHumanInviteMiss: vi.fn(),
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

describe("redeemHumanProjectInvite taken then retry", () => {
  beforeEach(() => {
    for (const m of [peek, claimInsert, resolveName, getProject, getMembership]) {
      m.mockReset();
    }
    peek.mockResolvedValue(invite);
    getProject.mockResolvedValue({ ownerUserId: "owner" });
    getMembership.mockResolvedValue(null);
  });

  it("Taken fails without claim; Free Name retries and claimInsert once", async () => {
    resolveName.mockResolvedValueOnce({
      ok: false,
      code: "display_name_taken",
      suggestedProjectDisplayName: "Taken",
    });
    const first = await redeemHumanProjectInvite({
      token,
      claimantUserId: "user-1",
      suggestedProjectDisplayName: "Taken",
    });
    expect(first).toMatchObject({ ok: false, code: "display_name_taken" });
    expect(claimInsert).not.toHaveBeenCalled();

    resolveName.mockResolvedValueOnce({ ok: true, name: "Free Name" });
    claimInsert.mockResolvedValueOnce({ ok: true, invite, membership });
    const second = await redeemHumanProjectInvite({
      token,
      claimantUserId: "user-1",
      suggestedProjectDisplayName: "Free Name",
    });
    expect(second).toMatchObject({ ok: true, projectDisplayName: "Free Name" });
    expect(claimInsert).toHaveBeenCalledTimes(1);
    expect(claimInsert).toHaveBeenCalledWith(
      expect.objectContaining({
        projectDisplayName: "Free Name",
        claimantUserId: "user-1",
      }),
    );
  });
});
