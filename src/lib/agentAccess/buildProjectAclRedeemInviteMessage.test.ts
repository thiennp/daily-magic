import { describe, expect, it } from "vitest";

import { buildAgentAccessUrls } from "@/lib/agentAccess/buildAgentAccessUrls";
import {
  REDEEM_PENDING_POLL_LEAD_IN,
  buildProjectAclRedeemInviteMessage as build,
} from "@/lib/agentAccess/buildProjectAclRedeemInviteMessage";

const GUIDANCE =
  "Check the inbox when your human asks. Soft limit: at most 1 check per minute.";
const SWITCH =
  "To switch to wake mode, register a wake link (the mode flips to webhook) or call set_my_project_delivery_mode.";

describe("redeem_project_invite message: wake vs poll", () => {
  it("wake (Grok / no joinType) keeps the wake-routine text", () => {
    const active = build({
      status: "active",
      poll: false,
      hasSuggestedName: true,
    });
    expect(active).toContain(
      "Immediately create your Grok webhook-triggered routine for this project if missing",
    );
    expect(active).toContain(
      `${buildAgentAccessUrls().origin}/projects/{projectId}#wake-link-{membershipId}. You cannot see the key.`,
    );
    for (const hasSuggestedName of [true, false]) {
      expect(
        build({ status: "pending", poll: false, hasSuggestedName }),
      ).toContain(
        "immediately create your Grok webhook-triggered routine if missing",
      );
    }
  });

  it("poll active: lead + locked guidance verbatim, no Grok routine", () => {
    const msg = build({ status: "active", poll: true, hasSuggestedName: true });
    expect(msg).toBe(
      "Invite redeemed and membership is active (the owner turned on auto-approve for this invite). Call get_my_project_access; continue join steps. " +
        `${GUIDANCE} ${SWITCH} Prefer rotate_project_api_key if you need a fresh awc_proj_ key.`,
    );
    expect(msg).not.toMatch(/Grok|routine|wake-link-/);
  });

  it.each([true, false])(
    "poll pending (suggested name %s): lead-in + locked guidance, no Grok routine",
    (hasSuggestedName) => {
      const msg = build({ status: "pending", poll: true, hasSuggestedName });
      expect(msg).toMatch(/^Invite redeemed\. Membership is pending/);
      expect(
        msg.endsWith(`${REDEEM_PENDING_POLL_LEAD_IN} ${GUIDANCE} ${SWITCH}`),
      ).toBe(true);
      expect(msg).not.toMatch(/Grok|routine/);
    },
  );
});
