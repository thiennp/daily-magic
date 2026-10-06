import { beforeEach, describe, expect, it, vi } from "vitest";

const peek = vi.hoisted(() => vi.fn());
const claimInsert = vi.hoisted(() => vi.fn());
const writer = vi.hoisted(() => vi.fn(async () => undefined));

vi.mock("@/lib/projects/acl/humanInvites/peekHumanInviteByToken", () => ({
  peekHumanInviteByToken: peek,
}));
vi.mock("@/lib/projects/acl/humanInvites/claimAndInsertHumanMembership", () => ({
  claimAndInsertHumanMembership: claimInsert,
}));
vi.mock("@/lib/projects/acl/humanInvites/classifyHumanInviteMiss", () => ({
  classifyHumanInviteMiss: vi.fn(async () => "invalid_token"),
}));
vi.mock("@/lib/projects/acl/humanInvites/resolveHumanAcceptDisplayName", () => ({
  resolveHumanAcceptDisplayName: vi.fn(async () => ({ ok: true, name: "Ada" })),
}));
vi.mock("@/lib/projects/acl/humanInvites/loadUserAccountName", () => ({
  loadUserAccountName: vi.fn(async () => "Ada"),
}));
vi.mock("@/lib/projects/userProjectQueries", () => ({
  getUserProjectById: vi.fn(async () => ({ ownerUserId: "owner" })),
}));
vi.mock("@/lib/projects/acl/getActiveProjectMembership", () => ({
  getActiveProjectMembership: vi.fn(async () => null),
}));
vi.mock("@/lib/projects/acl/activity/writeProjectActivityEvent", () => ({
  writeProjectActivityEvent: writer,
}));

import {
  REDEEM_TEST_INVITE as invite,
  REDEEM_TEST_MEMBERSHIP as membership,
} from "@/lib/projects/acl/humanInvites/redeemHumanInviteTestFixtures";
import { redeemHumanProjectInvite } from "@/lib/projects/acl/humanInvites/redeemHumanProjectInvite";

const redeem = () =>
  redeemHumanProjectInvite({
    token: "t".repeat(22),
    claimantUserId: "user-1",
    claimantEmail: "ada@example.com",
  });

describe("redeemHumanProjectInvite Access log hook", () => {
  beforeEach(() => {
    peek.mockReset().mockResolvedValue({ ...invite, email: "ada@example.com" });
    claimInsert.mockReset();
    writer.mockClear();
  });

  it("logs human_invite.accepted with role and the joined name, no email", async () => {
    claimInsert.mockResolvedValue({
      ok: true,
      invite: { ...invite, email: "ada@example.com" },
      membership: { ...membership, projectDisplayName: "Ada" },
    });
    expect((await redeem()).ok).toBe(true);
    expect(writer).toHaveBeenCalledWith({
      projectId: "proj-1",
      type: "human_invite.accepted",
      actor: { kind: "member", userId: "user-1", label: "Ada" },
      target: { membershipId: "mem-1", userId: "user-1", label: "Ada" },
      detail: {
        inviteId: "inv-1",
        label: "inv-1",
        role: "member",
        membershipId: "mem-1",
        memberKind: "human",
      },
    });
    expect(JSON.stringify(writer.mock.calls)).not.toMatch(/@/);
  });

  it("logs nothing when the claim loses a race", async () => {
    claimInsert.mockResolvedValue({ ok: false, code: "already_member" });
    expect((await redeem()).ok).toBe(false);
    expect(writer).not.toHaveBeenCalled();
  });
});
