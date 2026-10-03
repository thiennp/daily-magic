import { describe, expect, it } from "vitest";

import { AWC_GROK_BOT_WEBHOOK_REGISTER_STEPS } from "@/lib/agentAccess/awcGrokWebhookRegisterCopy.constant";
import { PROJECT_BRIEFING_HOW_TO_DISPATCH } from "@/lib/projects/acl/projectBriefingHowToDispatch.constant";

describe("PROJECT_BRIEFING_HOW_TO_DISPATCH", () => {
  it("states the thin project inbox caps", () => {
    expect(PROJECT_BRIEFING_HOW_TO_DISPATCH).toContain("summary ≤ 200 chars");
    expect(PROJECT_BRIEFING_HOW_TO_DISPATCH).toContain("refs ≤ 768 bytes");
    expect(PROJECT_BRIEFING_HOW_TO_DISPATCH).toContain("media_not_allowed");
    expect(PROJECT_BRIEFING_HOW_TO_DISPATCH).toContain("localPath / P2P refs");
    expect(PROJECT_BRIEFING_HOW_TO_DISPATCH).toContain("delete-on-ack");
    expect(PROJECT_BRIEFING_HOW_TO_DISPATCH).toContain(
      "unacked messages expire after 3 days",
    );
    expect(PROJECT_BRIEFING_HOW_TO_DISPATCH).toContain(
      "Rate limits: 300/hour (rolling) + max 300 unread (ack/clear frees slots)",
    );
    expect(PROJECT_BRIEFING_HOW_TO_DISPATCH).toContain(
      'toProjectDisplayName: "Owner"',
    );
    expect(PROJECT_BRIEFING_HOW_TO_DISPATCH).toContain("toMembershipId");
    expect(PROJECT_BRIEFING_HOW_TO_DISPATCH).toMatch(/~7 days|alias TTL/i);
    expect(PROJECT_BRIEFING_HOW_TO_DISPATCH).toContain("peer.joined");
    expect(PROJECT_BRIEFING_HOW_TO_DISPATCH).toContain(
      AWC_GROK_BOT_WEBHOOK_REGISTER_STEPS,
    );
    expect(PROJECT_BRIEFING_HOW_TO_DISPATCH).not.toMatch(/if you can host HTTPS/i);
    expect(PROJECT_BRIEFING_HOW_TO_DISPATCH).toMatch(/MUST on connect \(webhook-first\)/i);
    expect(PROJECT_BRIEFING_HOW_TO_DISPATCH).toMatch(/Inbox wake is webhook-only, via a Grok routine/i);
    expect(PROJECT_BRIEFING_HOW_TO_DISPATCH).toMatch(/do not poll list_project_inbox on a timer/i);
    expect(PROJECT_BRIEFING_HOW_TO_DISPATCH).toMatch(/Once a day, check the project webhook/i);
    expect(PROJECT_BRIEFING_HOW_TO_DISPATCH).toMatch(/re-registering register_project_webhook/i);
    expect(PROJECT_BRIEFING_HOW_TO_DISPATCH).toMatch(/MUST ack_project_message/i);
    expect(PROJECT_BRIEFING_HOW_TO_DISPATCH).not.toMatch(/MUST poll list_project_inbox|every 30 seconds while actively working|every 5 minutes when idle/i);
    expect(PROJECT_BRIEFING_HOW_TO_DISPATCH).toMatch(
      /On leave or owner Revoke MUST delete all project-scoped routines/i,
    );
    expect(PROJECT_BRIEFING_HOW_TO_DISPATCH).toMatch(/Softvale watches/i);
  });
});
