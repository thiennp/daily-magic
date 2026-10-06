import { beforeEach, describe, expect, it, vi } from "vitest";

import { applyInitialProjectMembershipDeliveryMode } from "@/lib/projects/acl/applyInitialProjectMembershipDeliveryMode";
import { parseProjectInviteJoinPlatform } from "@/lib/projects/acl/invites/projectInviteJoinPlatform.constant";
import { loadProjectMemberWakeLinkSet } from "@/lib/projects/acl/webhooks/loadProjectMemberWakeLinkSet";
import { PROJECT_INVITE_JOIN_TYPES } from "@/features/projects/access/invites/joinTypes/projectInviteJoinTypes.constant";

/** Invite row platform: NULL = universal S0c invite (no type chosen at create). */
const invite: { platform: string | null } = { platform: null };
vi.mock("@/lib/db", () => ({
  getSql: () => async () => [{ platform: invite.platform }],
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));
vi.mock("@/lib/projects/acl/ensureProjectMembershipDeliveryModeSchema", () => ({
  ensureProjectMembershipDeliveryModeSchema: vi.fn(async () => undefined),
}));
vi.mock("@/lib/projects/acl/setProjectMembershipDeliveryMode", () => ({
  setProjectMembershipDeliveryMode: vi.fn(async () => true),
}));
vi.mock("@/lib/projects/acl/webhooks/loadProjectMemberWakeLinkSet", () => ({
  loadProjectMemberWakeLinkSet: vi.fn(async () => new Map()),
}));
const wakeLinks = vi.mocked(loadProjectMemberWakeLinkSet);

const joinAs = (joinType: string | undefined) =>
  applyInitialProjectMembershipDeliveryMode({
    projectId: "proj-1",
    membershipId: "mem-1",
    inviteId: "inv-1",
    joinPlatform: parseProjectInviteJoinPlatform(joinType),
  });

describe("no-type invite → join-time delivery_mode, per /join types[] id", () => {
  beforeEach(() => {
    invite.platform = null;
    wakeLinks.mockResolvedValue(new Map());
  });

  it.each(PROJECT_INVITE_JOIN_TYPES.map((t) => [t.id, t.deliveryMode]))(
    "%s, no wake link → %s (grok-bot wake, every other type poll)",
    async (id, mode) => {
      expect(mode).toBe(id === "grok-bot" ? "webhook" : "poll");
      expect(await joinAs(id)).toBe(mode);
    },
  );

  it.each(PROJECT_INVITE_JOIN_TYPES.map((t) => [t.id]))(
    "%s with a wake link already saved → webhook",
    async (id) => {
      wakeLinks.mockResolvedValue(new Map([["mem-1", true]]));
      expect(await joinAs(id)).toBe("webhook");
    },
  );

  it.each([
    ["(omitted)", undefined],
    ["(unknown)", "made-up"],
  ])(
    "%s joinType → poll (Lead (a): no type on invite or redeem → Checks on demand)",
    async (_, joinType) => {
      expect(await joinAs(joinType)).toBe("poll");
      wakeLinks.mockResolvedValue(new Map([["mem-1", true]]));
      expect(await joinAs(joinType)).toBe("webhook");
    },
  );

  it.each([
    ["grok", "webhook"],
    ["muse", "poll"],
  ])(
    "typed invite %s + no joinType → %s (unchanged)",
    async (platform, mode) => {
      invite.platform = platform;
      expect(await joinAs(undefined)).toBe(mode);
      expect(await joinAs("made-up")).toBe(mode);
    },
  );
});
