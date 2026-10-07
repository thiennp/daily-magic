import { beforeEach, describe, expect, it, vi } from "vitest";

const peek = vi.hoisted(() => vi.fn());
const claimInsert = vi.hoisted(() => vi.fn());
const claimForApproval = vi.hoisted(() => vi.fn());
const classifyMiss = vi.hoisted(() => vi.fn());
const resolveName = vi.hoisted(() => vi.fn());
const getProject = vi.hoisted(() => vi.fn());
const getMembership = vi.hoisted(() => vi.fn());
const logAccepted = vi.hoisted(() => vi.fn());
const emailVerified = vi.hoisted(() => vi.fn());

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
vi.mock("@/lib/projects/acl/humanInvites/loadUserEmailVerified", () => ({
  loadUserEmailVerified: emailVerified,
}));
vi.mock("@/lib/projects/acl/humanInvites/logHumanInviteActivity", () => ({
  logHumanInviteAccepted: logAccepted,
}));

import { REDEEM_TEST_INVITE } from "@/lib/projects/acl/humanInvites/redeemHumanInviteTestFixtures";
import { redeemHumanProjectInvite } from "@/lib/projects/acl/humanInvites/redeemHumanProjectInvite";

const token = "t".repeat(22);
const lockedApprovalInvite = {
  ...REDEEM_TEST_INVITE,
  delivery: "email" as const,
  email: "ada@example.org",
  requireEmailMatch: true,
  requiresApproval: true,
};

describe("redeemHumanProjectInvite approval path + email lock (108)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    peek.mockResolvedValue(lockedApprovalInvite);
    getProject.mockResolvedValue({ ownerUserId: "owner" });
    getMembership.mockResolvedValue(null);
    resolveName.mockResolvedValue({ ok: true, name: "Ada" });
    emailVerified.mockResolvedValue(true);
  });

  it("lock ON + different account email: rejected before any claim", async () => {
    const result = await redeemHumanProjectInvite({
      token,
      claimantUserId: "user-2",
      claimantEmail: "mallory@example.org",
    });
    expect(result).toMatchObject({
      ok: false,
      code: "invite_email_mismatch",
    });
    expect(JSON.stringify(result)).not.toContain("ada@example.org");
    expect(claimForApproval).not.toHaveBeenCalled();
    expect(claimInsert).not.toHaveBeenCalled();
  });

  it("lock ON + verified match: parks for Approve with the normalized email", async () => {
    claimForApproval.mockResolvedValue({
      ok: true,
      invite: { ...lockedApprovalInvite, status: "accepted" },
    });
    const result = await redeemHumanProjectInvite({
      token,
      claimantUserId: "user-2",
      claimantEmail: "Ada@Example.org",
    });
    expect(result).toMatchObject({ ok: true, awaitingApproval: true });
    expect(claimForApproval).toHaveBeenCalledWith(
      expect.objectContaining({ claimantEmailNormalized: "ada@example.org" }),
    );
    expect(claimInsert).not.toHaveBeenCalled();
  });
});
