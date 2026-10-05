import { describe, expect, it } from "vitest";

import { AWC_GROK_BOT_WEBHOOK_REGISTER_STEPS } from "@/lib/agentAccess/awcGrokWebhookRegisterCopy.constant";
import { buildProjectInviteAgentPrompt } from "@/features/projects/access/invites/buildProjectInviteAgentPrompt";
import { buildProjectAclAgentGuidelineSection } from "@/lib/agentAccess/buildProjectAclAgentGuidelineSection";
import {
  PROJECT_BRIEFING_HOW_TO_DISPATCH,
  PROJECT_DISPATCH_PROCESSING_REPLY_CLAUSE,
} from "@/lib/projects/acl/projectBriefingHowToDispatch.constant";

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
    expect(PROJECT_BRIEFING_HOW_TO_DISPATCH).toMatch(/Website relaunch watches/i);
  });

  it("shares one processing reply clause with the invite prompt and guideline", () => {
    expect(PROJECT_DISPATCH_PROCESSING_REPLY_CLAUSE).not.toMatch(/AgentWitch/);
    expect(PROJECT_DISPATCH_PROCESSING_REPLY_CLAUSE).not.toMatch(/task\.processing/);
    expect(PROJECT_DISPATCH_PROCESSING_REPLY_CLAUSE).not.toMatch(/every 5 minutes/i);
    const deliveryAt = PROJECT_DISPATCH_PROCESSING_REPLY_CLAUSE.indexOf(
      "On each delivery:",
    );
    expect(deliveryAt).toBeGreaterThanOrEqual(0);
    const delivery = PROJECT_DISPATCH_PROCESSING_REPLY_CLAUSE.slice(deliveryAt);
    const receiptAt = delivery.indexOf(
      "one short line in your own window that the message was received, before the task",
    );
    const taskAt = delivery.indexOf("Then do the task");
    expect(receiptAt).toBeGreaterThanOrEqual(0);
    expect(taskAt).toBeGreaterThan(receiptAt);
    expect(delivery).not.toContain("read the sender, do the task");
    expect(PROJECT_DISPATCH_PROCESSING_REPLY_CLAUSE).toContain(
      "before the task and before ack",
    );
    expect(PROJECT_DISPATCH_PROCESSING_REPLY_CLAUSE).toContain(
      "post the same reply in your own window, then ack",
    );
    expect(PROJECT_DISPATCH_PROCESSING_REPLY_CLAUSE).toContain("Do not ack only.");
    expect(PROJECT_DISPATCH_PROCESSING_REPLY_CLAUSE).toContain(
      'toProjectDisplayName is "Owner"',
    );
    expect(PROJECT_BRIEFING_HOW_TO_DISPATCH).toContain(
      PROJECT_DISPATCH_PROCESSING_REPLY_CLAUSE,
    );
    const prompt = buildProjectInviteAgentPrompt({
      inviteUrl: "https://example.com/invite/p/tok-xyz",
      projectId: "proj-1",
    });
    expect(prompt).toContain(PROJECT_DISPATCH_PROCESSING_REPLY_CLAUSE);
    expect(buildProjectAclAgentGuidelineSection().body.join("\n")).toContain(
      PROJECT_DISPATCH_PROCESSING_REPLY_CLAUSE,
    );
  });
});
