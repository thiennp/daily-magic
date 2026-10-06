import { beforeEach, describe, expect, it, vi } from "vitest";

import { applyInitialProjectMembershipDeliveryMode } from "@/lib/projects/acl/applyInitialProjectMembershipDeliveryMode";
import { parseProjectInviteJoinPlatform } from "@/lib/projects/acl/invites/projectInviteJoinPlatform.constant";
import { loadProjectMemberWakeLinkSet } from "@/lib/projects/acl/webhooks/loadProjectMemberWakeLinkSet";
import { PROJECT_INVITE_JOIN_TYPES } from "@/features/projects/access/invites/joinTypes/projectInviteJoinTypes.constant";

/** Universal S0c invite row: platform NULL (no type chosen at create). */
vi.mock("@/lib/db", () => ({
  getSql: () => async () => [{ platform: null }],
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
  beforeEach(() => wakeLinks.mockResolvedValue(new Map()));

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
    "%s joinType → webhook (legacy default: no type on invite or redeem)",
    async (_, joinType) => {
      expect(await joinAs(joinType)).toBe("webhook");
    },
  );
});
