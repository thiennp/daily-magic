import { describe, expect, it } from "vitest";

import { buildPendingApprovalCardMeta } from "@/lib/projects/acl/approvalCard/buildPendingApprovalCardMeta";
import { parseProjectInviteJoinPlatform } from "@/lib/projects/acl/invites/projectInviteJoinPlatform.constant";

const NOW = Date.parse("2026-10-06T10:00:00.000Z");

describe("buildPendingApprovalCardMeta", () => {
  it("claimed device-code assistant: kind, owner name, live", () => {
    const meta = buildPendingApprovalCardMeta({
      origin: {
        ownerUserId: "u-owner",
        assistantKind: "Claude",
        connectVia: "device_code",
      },
      ownerPersonName: "Thien",
      joinPlatform: null,
      invitePlatform: null,
      expiresAt: "2026-10-06T10:05:00.000Z",
      nowMs: NOW,
    });
    expect(meta).toEqual({
      assistantKind: "Claude",
      ownerClaimed: true,
      ownerPersonName: "Thien",
      connectVia: "device_code",
      expectedDeliveryMode: "webhook",
      modeKnown: false,
      isExpired: false,
    });
  });

  it("unclaimed assistant never shows a person name", () => {
    const meta = buildPendingApprovalCardMeta({
      origin: { ownerUserId: null, assistantKind: null, connectVia: null },
      ownerPersonName: "Leaked",
      joinPlatform: null,
      invitePlatform: "grok",
      expiresAt: "2026-10-06T10:05:00.000Z",
      nowMs: NOW,
    });
    expect(meta.ownerClaimed).toBe(false);
    expect(meta.ownerPersonName).toBeNull();
    expect(meta.expectedDeliveryMode).toBe("webhook");
  });

  it("non-wake invite platform expects Checks on demand (poll)", () => {
    const meta = buildPendingApprovalCardMeta({
      origin: undefined,
      ownerPersonName: null,
      joinPlatform: null,
      invitePlatform: "muse",
      expiresAt: null,
      nowMs: NOW,
    });
    expect(meta.expectedDeliveryMode).toBe("poll");
    expect(meta.modeKnown).toBe(true);
    expect(meta.isExpired).toBe(false);
  });

  it("marks expired at or after expires_at", () => {
    const meta = buildPendingApprovalCardMeta({
      origin: undefined,
      ownerPersonName: null,
      joinPlatform: null,
      invitePlatform: null,
      expiresAt: "2026-10-06T10:00:00.000Z",
      nowMs: NOW,
    });
    expect(meta.isExpired).toBe(true);
  });

  describe("mode from join_platform (093) then invite platform", () => {
    const mode = (joinPlatform: string | null, invitePlatform: string | null) =>
      buildPendingApprovalCardMeta({
        origin: undefined,
        ownerPersonName: null,
        joinPlatform,
        invitePlatform,
        expiresAt: null,
        nowMs: NOW,
      });

    it("join_platform claude, no wake link → Checks on demand (poll)", () => {
      const meta = mode(parseProjectInviteJoinPlatform("claude"), null);
      expect(meta.expectedDeliveryMode).toBe("poll");
      expect(meta.modeKnown).toBe(true);
    });

    it("join type grok-bot → wakes up on its own (webhook)", () => {
      const meta = mode(parseProjectInviteJoinPlatform("grok-bot"), null);
      expect(meta.expectedDeliveryMode).toBe("webhook");
      expect(meta.modeKnown).toBe(true);
    });

    it("join_platform beats the invite platform", () => {
      expect(mode("claude", "grok").expectedDeliveryMode).toBe("poll");
      expect(mode("grok", "muse").expectedDeliveryMode).toBe("webhook");
    });

    it("neither present → mode unknown", () => {
      expect(mode(null, null).modeKnown).toBe(false);
    });
  });
});
