import { describe, expect, it } from "vitest";

import { ACCESS_LOG_COPY as C } from "@/features/projects/accessLog/accessLogCopy.constant";
import { formatAccessLogEvent } from "@/features/projects/accessLog/formatAccessLogEvent";
import type { ProjectActivityLogEvent } from "@/features/projects/activityLog/projectAccessLog.type";
import { sanitizeProjectActivityEventDetail } from "@/lib/projects/acl/activity/sanitizeProjectActivityEventDetail";

const NOW = Date.parse("2026-10-08T00:30:00.000Z");
const botActor = { kind: "member" as const, userId: "bot-inviter", displayName: "Quiet Fox" };

const event = (partial: Partial<ProjectActivityLogEvent> & Pick<ProjectActivityLogEvent, "type">): ProjectActivityLogEvent => ({
  id: "e1",
  category: "access",
  at: "2026-10-08T00:30:00.000Z",
  actor: botActor,
  target: null,
  detail: { approvalSource: "bot_invite", label: "inv-bot-", inviteId: "inv-bot-1" },
  ...partial,
});

describe("Access log: DF-038 bot-made invites", () => {
  it("create reads 'Invited by {bot}'", () => {
    const rendered = formatAccessLogEvent(event({ type: "invite.created" }), NOW);
    expect(rendered?.line).toBe("Invited by Quiet Fox: an assistant invite was created");
    expect(rendered?.detail).toContain("Invite inv-bot-");
  });

  it("redeem reads '{name} joined. Invited by {bot}'", () => {
    const rendered = formatAccessLogEvent(
      event({ type: "member.auto_approved", target: { membershipId: "m2", userId: "bot-sibling", displayName: "Bright Owl" } }),
      NOW,
    );
    expect(rendered?.line).toBe("Bright Owl joined. Invited by Quiet Fox");
  });

  it("falls back to a neutral bot name when the inviter label is gone", () => {
    const rendered = formatAccessLogEvent(event({ type: "invite.created", actor: { ...botActor, displayName: null } }), NOW);
    expect(rendered?.line).toBe(`Invited by ${C.nameFallbackAssistant}: an assistant invite was created`);
  });

  it("owner invite and checkbox auto-approve rows render exactly as before", () => {
    const owner = { kind: "owner" as const, userId: "owner-1", displayName: null };
    expect(formatAccessLogEvent(event({ type: "invite.created", actor: owner, detail: {} }), NOW)?.line).toBe(C.inviteCreated);
    const checkbox = event({
      type: "member.auto_approved",
      actor: owner,
      target: { membershipId: "m", userId: "u", displayName: "Sam" },
      detail: { approvalSource: "invite_auto_approve", label: "abcd1234" },
    });
    expect(formatAccessLogEvent(checkbox, NOW)?.line).toBe(C.joinedAuto.replace("{name}", "Sam"));
  });

  it("the Access log detail allowlist keeps approvalSource bot_invite", () => {
    expect(sanitizeProjectActivityEventDetail({ approvalSource: "bot_invite" })).toEqual({ approvalSource: "bot_invite" });
    expect(sanitizeProjectActivityEventDetail({ approvalSource: "sneaky" })).toEqual({});
  });
});
