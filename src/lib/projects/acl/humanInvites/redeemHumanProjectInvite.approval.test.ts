import { beforeEach, describe, expect, it, vi } from "vitest";

const peek = vi.hoisted(() => vi.fn());
const claimInsert = vi.hoisted(() => vi.fn());
const claimForApproval = vi.hoisted(() => vi.fn());
const classifyMiss = vi.hoisted(() => vi.fn());
const resolveName = vi.hoisted(() => vi.fn());
const getProject = vi.hoisted(() => vi.fn());
const getMembership = vi.hoisted(() => vi.fn());
const logAccepted = vi.hoisted(() => vi.fn());

vi.mock("@/lib/projects/acl/humanInvites/peekHumanInviteByToken", () => ({
  peekHumanInviteByToken: peek,
}));
vi.mock(
  "@/lib/projects/acl/humanInvites/claimAndInsertHumanMembership",
  () => ({
    claimAndInsertHumanMembership: claimInsert,
  }),
);
vi.mock("@/lib/projects/acl/humanInvites/claimHumanInviteForApproval", () => ({
  claimHumanInviteForApproval: claimForApproval,
}));
vi.mock("@/lib/projects/acl/humanInvites/classifyHumanInviteMiss", () => ({
  classifyHumanInviteMiss: classifyMiss,
}));
vi.mock(
  "@/lib/projects/acl/humanInvites/resolveHumanAcceptDisplayName",
  () => ({
    resolveHumanAcceptDisplayName: resolveName,
  }),
);
vi.mock("@/lib/projects/acl/humanInvites/loadUserAccountName", () => ({
  loadUserAccountName: vi.fn(async () => "Ada"),
}));
vi.mock("@/lib/projects/userProjectQueries", () => ({
  getUserProjectById: getProject,
}));
vi.mock("@/lib/projects/acl/getActiveProjectMembership", () => ({
  getActiveProjectMembership: getMembership,
}));
vi.mock("@/lib/projects/acl/humanInvites/logHumanInviteActivity", () => ({
  logHumanInviteAccepted: logAccepted,
}));

import { REDEEM_TEST_INVITE } from "@/lib/projects/acl/humanInvites/redeemHumanInviteTestFixtures";
import { redeemHumanProjectInvite } from "@/lib/projects/acl/humanInvites/redeemHumanProjectInvite";

const token = "t".repeat(22);
const approvalInvite = {
  ...REDEEM_TEST_INVITE,
  delivery: "email" as const,
  email: "ada@example.org",
  requiresApproval: true,
};

describe("redeemHumanProjectInvite approval path (108)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    peek.mockResolvedValue(approvalInvite);
    getProject.mockResolvedValue({ ownerUserId: "owner" });
    getMembership.mockResolvedValue(null);
    resolveName.mockResolvedValue({ ok: true, name: "Ada" });
  });

  it("parks the invite as accepted and never creates a membership (no auto-approve)", async () => {
    claimForApproval.mockResolvedValue({
      ok: true,
      invite: { ...approvalInvite, status: "accepted" },
    });
    const result = await redeemHumanProjectInvite({
      token,
      claimantUserId: "user-2",
    });
    expect(result).toMatchObject({
      ok: true,
      awaitingApproval: true,
      projectDisplayName: "Ada",
    });
    expect(claimInsert).not.toHaveBeenCalled();
    expect(logAccepted).not.toHaveBeenCalled();
    expect(claimForApproval).toHaveBeenCalledWith(
      expect.objectContaining({
        claimantUserId: "user-2",
        projectDisplayName: "Ada",
      }),
    );
  });

  it("a second pending request from the same person → already_requested", async () => {
    claimForApproval.mockResolvedValue({
      ok: false,
      code: "already_requested",
    });
    expect(
      await redeemHumanProjectInvite({ token, claimantUserId: "user-2" }),
    ).toEqual({
      ok: false,
      code: "already_requested",
      projectId: approvalInvite.projectId,
    });
  });
});
