import { describe, expect, it } from "vitest";

import {
  PROJECT_INVITE_JOIN_POLL_GUIDANCE_LINE,
  PROJECT_INVITE_JOIN_POLL_SWITCH_LINE,
  buildProjectInviteJoinPollTypeSteps,
  buildProjectInviteJoinRedeemTypeLine,
} from "@/features/projects/access/invites/joinPage/buildProjectInviteJoinPollTypeSteps";
import { buildProjectInviteJoinPage } from "@/features/projects/access/invites/joinPage/buildProjectInviteJoinPage";
import { renderProjectInviteJoinPageMarkdown } from "@/features/projects/access/invites/joinPage/renderProjectInviteJoinPageMarkdown";
import { PROJECT_INVITE_JOIN_TYPES } from "@/features/projects/access/invites/joinTypes/projectInviteJoinTypes.constant";
import { PROJECT_MEMBERSHIP_POLL_INBOX_GUIDANCE } from "@/lib/projects/acl/projectMembershipDeliveryModeGuidance.constant";
import { parseProjectInviteJoinPlatform } from "@/lib/projects/acl/invites/projectInviteJoinPlatform.constant";

const page = buildProjectInviteJoinPage({
  token: "a".repeat(22),
  projectId: "proj-1",
  projectName: "Demo",
  autoApprove: false,
});

describe("/join Checks on demand step for poll types", () => {
  it("uses only locked lines (COPY.md no_wake.bot_poll_guidance + S5 guidance)", () => {
    expect(PROJECT_INVITE_JOIN_POLL_GUIDANCE_LINE).toBe(
      "Check the inbox when your human asks. Soft limit: at most 1 check per minute.",
    );
    expect(PROJECT_MEMBERSHIP_POLL_INBOX_GUIDANCE).toContain(
      PROJECT_INVITE_JOIN_POLL_SWITCH_LINE,
    );
  });

  it("every poll type ends with its redeem joinType line + Checks on demand step", () => {
    for (const type of page.types.filter((t) => t.deliveryMode === "poll")) {
      const source = PROJECT_INVITE_JOIN_TYPES.find((t) => t.id === type.id);
      expect(type.steps.slice(0, -2), type.id).toEqual(source?.steps);
      expect(type.steps.slice(-2), type.id).toEqual([
        buildProjectInviteJoinRedeemTypeLine(type.id),
        `${PROJECT_INVITE_JOIN_POLL_GUIDANCE_LINE} ${PROJECT_INVITE_JOIN_POLL_SWITCH_LINE}`,
      ]);
      expect(parseProjectInviteJoinPlatform(type.id), type.id).not.toBeNull();
    }
  });

  it("Grok Bot (webhook) gets no extra step", () => {
    const grok = page.types.find((t) => t.id === "grok-bot");
    const source = PROJECT_INVITE_JOIN_TYPES.find((t) => t.id === "grok-bot");
    expect(grok?.steps).toEqual(source?.steps);
    expect(
      buildProjectInviteJoinPollTypeSteps({ id: "x", deliveryMode: "webhook" }),
    ).toEqual([]);
  });

  it("markdown renders the step under each poll type", () => {
    const md = renderProjectInviteJoinPageMarkdown(page);
    expect(md).toContain(`"joinType": "claude"`);
    expect(md).toContain(PROJECT_INVITE_JOIN_POLL_GUIDANCE_LINE);
    expect(md).not.toContain(`"joinType": "grok-bot"`);
  });
});
