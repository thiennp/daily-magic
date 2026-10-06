import { describe, expect, it } from "vitest";

import { ACCESS_LOG_COPY as C } from "@/features/projects/accessLog/accessLogCopy.constant";
import { formatAccessLogEvent } from "@/features/projects/accessLog/formatAccessLogEvent";
import type { ProjectActivityLogEvent } from "@/features/projects/activityLog/projectAccessLog.type";
import { PROJECT_DELIVERY_MODE_ACTIVITY_COPY } from "@/lib/projects/acl/projectMembershipDeliveryModeActivity.constant";

const base = (
  partial: Partial<ProjectActivityLogEvent> &
    Pick<ProjectActivityLogEvent, "type">,
): ProjectActivityLogEvent => ({
  id: "e1",
  category: "wake",
  at: "2026-10-06T11:00:00.000Z",
  actor: { kind: "owner", userId: "u1", displayName: null },
  target: null,
  detail: {},
  ...partial,
});

describe("formatAccessLogEvent delivery mode", () => {
  it("reuses locked mode.activity owner/member strings", () => {
    const ownerPoll = formatAccessLogEvent(
      base({
        type: "member.delivery_mode_changed",
        target: { membershipId: "m", userId: "u", displayName: "Buni" },
        detail: {
          deliveryMode: "poll",
          previousDeliveryMode: "webhook",
          trigger: "owner_switch",
        },
      }),
    );
    expect(ownerPoll?.line).toBe(
      PROJECT_DELIVERY_MODE_ACTIVITY_COPY.ownerToPoll.replace("{name}", "Buni"),
    );
    expect(ownerPoll?.detail).toBe("Was: Wakes up on its own");
    const memberWake = formatAccessLogEvent(
      base({
        type: "member.delivery_mode_changed",
        actor: { kind: "member", userId: "u", displayName: "Buni" },
        target: { membershipId: "m", userId: "u", displayName: "Buni" },
        detail: { deliveryMode: "webhook", trigger: "member_switch" },
      }),
    );
    expect(memberWake?.line).toBe(
      PROJECT_DELIVERY_MODE_ACTIVITY_COPY.memberToWebhook.replace(
        "{name}",
        "Buni",
      ),
    );
    expect(memberWake?.detail).toBeNull();
  });

  it("human invite role fallbacks", () => {
    expect(
      formatAccessLogEvent({
        ...base({ type: "human_invite.created" }),
        category: "access",
      })?.line,
    ).toBe(C.humanInviteCreatedNoRole);
    expect(
      formatAccessLogEvent({
        ...base({ type: "human_invite.revoked" }),
        category: "access",
      })?.line,
    ).toBe(C.humanInviteRevokedNoRole);
  });
});
