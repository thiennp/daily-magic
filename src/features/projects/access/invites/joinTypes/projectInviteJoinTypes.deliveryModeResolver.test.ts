import fs from "node:fs";
import path from "node:path";

import { describe, expect, it } from "vitest";

import { PROJECT_INVITE_JOIN_TYPES } from "@/features/projects/access/invites/joinTypes/projectInviteJoinTypes.constant";
import {
  PROJECT_INVITE_JOIN_TYPE_IDS,
  parseProjectInviteJoinPlatform,
} from "@/lib/projects/acl/invites/projectInviteJoinPlatform.constant";
import { resolveInitialProjectMembershipDeliveryMode } from "@/lib/projects/acl/resolveInitialProjectMembershipDeliveryMode";

const resolveFor = (joinType: string, hasWakeLink: boolean) =>
  resolveInitialProjectMembershipDeliveryMode({
    platform: parseProjectInviteJoinPlatform(joinType),
    hasWakeLink,
  });

describe("redeem joinType → Wake S5 resolver, per /join type", () => {
  it("allowlists every /join type id", () => {
    for (const type of PROJECT_INVITE_JOIN_TYPES) {
      expect(PROJECT_INVITE_JOIN_TYPE_IDS, type.id).toContain(type.id);
    }
  });

  it.each(PROJECT_INVITE_JOIN_TYPES.map((t) => [t.id, t.deliveryMode]))(
    "%s with no wake link → %s (matches the page's deliveryMode)",
    (id, deliveryMode) => {
      expect(resolveFor(id, false)).toBe(deliveryMode);
    },
  );

  it.each(PROJECT_INVITE_JOIN_TYPES.map((t) => [t.id]))(
    "%s with a wake link → webhook",
    (id) => {
      expect(resolveFor(id, true)).toBe("webhook");
    },
  );

  it("Copilot Studio (copilot_studio / copilot-studio) → poll", () => {
    expect(parseProjectInviteJoinPlatform("copilot_studio")).toBe(
      "copilot_studio",
    );
    expect(parseProjectInviteJoinPlatform(" Copilot-Studio ")).toBe(
      "copilot_studio",
    );
    expect(resolveFor("copilot_studio", false)).toBe("poll");
  });

  it("Grok Bot keeps webhook (Waiting for wake link)", () => {
    expect(parseProjectInviteJoinPlatform("grok-bot")).toBe("grok");
    expect(resolveFor("grok-bot", false)).toBe("webhook");
  });

  it("unknown / missing joinType → null (invite platform applies)", () => {
    expect(parseProjectInviteJoinPlatform("toString")).toBeNull();
    expect(parseProjectInviteJoinPlatform("nope")).toBeNull();
    expect(parseProjectInviteJoinPlatform(undefined)).toBeNull();
    expect(parseProjectInviteJoinPlatform(42)).toBeNull();
  });

  it("076 adds the nullable join_platform column", () => {
    const sql = fs.readFileSync(
      path.join(
        process.cwd(),
        "db/migrations/076-project-access-request-join-platform.sql",
      ),
      "utf8",
    );
    expect(sql).toContain("ALTER TABLE project_access_requests");
    expect(sql).toContain("ADD COLUMN IF NOT EXISTS join_platform TEXT;");
  });
});
