import { describe, expect, it } from "vitest";

import { HUMAN_INVITE_UI_COPY } from "@/features/projects/access/humanInvites/public-api/types";
import { ACCESS_LOG_COPY as C } from "@/features/projects/accessLog/accessLogCopy.constant";
import { formatAccessLogEvent } from "@/features/projects/accessLog/formatAccessLogEvent";
import type { ProjectActivityLogEvent } from "@/features/projects/activityLog/public-api/types";

const base = (
  partial: Partial<ProjectActivityLogEvent> &
    Pick<ProjectActivityLogEvent, "type">,
): ProjectActivityLogEvent => ({
  id: "e1",
  category: "access",
  at: "2026-10-06T11:00:00.000Z",
  actor: { kind: "owner", userId: "u1", displayName: null },
  target: null,
  detail: {},
  ...partial,
});

describe("formatAccessLogEvent", () => {
  it("skips unknown event types entirely", () => {
    expect(
      formatAccessLogEvent({
        ...base({ type: "invite.created" }),
        type: "msg.deleted" as ProjectActivityLogEvent["type"],
      }),
    ).toBeNull();
  });

  it("owner actions always say You", () => {
    expect(formatAccessLogEvent(base({ type: "invite.created" }))?.line).toBe(
      C.inviteCreated,
    );
    expect(
      formatAccessLogEvent(
        base({
          type: "request.approved",
          target: { membershipId: "m", userId: "u", displayName: "Sam" },
        }),
      )?.line,
    ).toBe("You approved Sam");
  });

  it("never puts an email on human invite rows", () => {
    const created = formatAccessLogEvent(
      base({
        type: "human_invite.created",
        detail: { role: "member", label: "ab12cd34" },
        target: {
          membershipId: null,
          userId: null,
          displayName: "friend@example.com",
        },
      }),
    );
    expect(created?.line).toBe(
      C.humanInviteCreated.replace(
        "{roleLabel}",
        HUMAN_INVITE_UI_COPY.roleMember,
      ),
    );
    expect(created?.line).not.toMatch(/@/);
    expect(created?.detail ?? "").not.toMatch(/@/);
  });

  it("omits detail when field absent; shows when present", () => {
    expect(
      formatAccessLogEvent(base({ type: "invite.revoked" }))?.detail,
    ).toBeNull();
    expect(
      formatAccessLogEvent(
        base({ type: "invite.revoked", detail: { label: "deadbeef" } }),
      )?.detail,
    ).toBe("Invite deadbeef");
    expect(
      formatAccessLogEvent(
        base({
          type: "member.removed",
          target: { membershipId: "m", userId: "u", displayName: "Bot" },
          detail: { memberKind: "bot" },
        }),
      )?.detail,
    ).toBe(C.detailKindBot);
  });

  it("maps locked auto keys and denied noName", () => {
    expect(
      formatAccessLogEvent(base({ type: "invite.auto_approve_enabled" }))?.line,
    ).toBe(C.autoOn);
    expect(
      formatAccessLogEvent(base({ type: "invite.auto_approve_disabled" }))
        ?.line,
    ).toBe(C.autoOff);
    expect(formatAccessLogEvent(base({ type: "request.denied" }))?.line).toBe(
      C.requestDeniedNoName,
    );
  });
});
