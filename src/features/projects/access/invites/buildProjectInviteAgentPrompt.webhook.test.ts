import { describe, expect, it } from "vitest";

import { buildProjectInviteAgentPrompt } from "@/features/projects/access/invites/buildProjectInviteAgentPrompt";
import {
  AWC_GROK_BOT_WEBHOOK_REGISTER_STEPS,
  AWC_GROK_WEBHOOK_DAILY_REPAIR,
  AWC_GROK_WEBHOOK_FORM_SCREEN,
  AWC_GROK_WEBHOOK_KEY_NOTE,
} from "@/lib/agentAccess/awcGrokWebhookRegisterCopy.constant";
import {
  PROJECT_DISPATCH_PROCESSING_REPLY_CLAUSE,
  PROJECT_UPDATED_WAKE_REPLY_CLAUSE,
} from "@/lib/projects/acl/projectBriefingHowToDispatch.constant";

describe("buildProjectInviteAgentPrompt webhook-first inbox", () => {
  it("MUST register_project_webhook first, then use webhook wake + ack", () => {
    const prompt = buildProjectInviteAgentPrompt({
      inviteUrl: "https://example.com/invite/p/tok-xyz",
      projectId: "proj-1",
      projectName: "Demo",
    });
    expect(prompt).toContain("register_project_webhook");
    expect(prompt).toContain("ack_project_message");
    expect(prompt).toMatch(/Inbox delivery|webhook-first/i);
    expect(prompt).toContain(AWC_GROK_BOT_WEBHOOK_REGISTER_STEPS);
    expect(prompt).toContain(AWC_GROK_WEBHOOK_DAILY_REPAIR);
    expect(prompt).toContain(AWC_GROK_WEBHOOK_KEY_NOTE);
    expect(prompt).toContain("create one yourself");
    expect(prompt).toContain("Webhook URL and Webhook key links");
    expect(prompt).toContain(AWC_GROK_WEBHOOK_FORM_SCREEN);
    expect(prompt).toContain("Add wake link");
    expect(prompt).toMatch(/you cannot see your own wake link or key/i);
    expect(prompt).toMatch(/never ask anyone to paste them into chat/);
    expect(prompt).not.toMatch(/Reports pills/i);
    expect(prompt).not.toMatch(/find its wake link in Routines/);
    expect(prompt).toContain("get_my_project_webhook_status");
    expect(prompt).not.toMatch(/routine status/);
    expect(prompt).not.toMatch(/The pasted key/);
    expect(prompt).not.toMatch(/re-registering register_project_webhook/);
    expect(prompt).not.toMatch(/if you can host a public HTTPS endpoint/i);
    expect(prompt).not.toMatch(/grokbot:\/\/|https?:\/\/[^\s]*webhook|sidebar|Slack|Discord/i);
    expect(prompt).toMatch(
      /Prefer agent-access Bearer for register_project_webhook and ack_project_message/i,
    );
    expect(prompt).toMatch(/awc_proj_ (is )?also allowed/i);
    expect(prompt).not.toMatch(/not on awc_proj_ allowlist/i);
    expect(prompt).toContain("list_project_inbox");
    expect(prompt).toMatch(/thin protocol metadata|no media\/blobs/i);
    expect(prompt).toMatch(/P2P|localPath/i);
    expect(prompt).toContain("summary ≤ 200 chars");
    expect(prompt).toContain("refs ≤ 768 bytes");
    expect(prompt).toContain("media_not_allowed");
    expect(prompt).toContain("Delete-on-ack");
    expect(prompt).toContain("unacked messages expire after 3 days");
    expect(prompt).toContain("Rate limits: 300/hour (rolling) + max 300 unread (ack/clear frees slots)");
    expect(prompt).toContain("On code rate_limited (reason hourly|unread_cap), tell your user the message was rate-limited");
    expect(prompt).toContain('"toProjectDisplayName": "Owner"');
    expect(prompt).toContain("peer.joined");
    expect(prompt).toContain("project.updated");
    expect(prompt).toContain('fromProjectDisplayName === "Owner"');
    expect(prompt).toMatch(/MUST on connect \(webhook-first\)/i);
    expect(prompt).toMatch(/Inbox wake is webhook-only, via a Grok routine/i);
    expect(prompt).toMatch(/do not poll list_project_inbox on a timer/i);
    expect(prompt).toMatch(/Once a day, check the project webhook/i);
    expect(prompt).toContain(PROJECT_DISPATCH_PROCESSING_REPLY_CLAUSE);
    expect(prompt).toContain(PROJECT_UPDATED_WAKE_REPLY_CLAUSE);
    expect(prompt).toMatch(/MUST ack_project_message/i);
    expect(prompt).not.toMatch(/Else MUST poll list_project_inbox|every 30 seconds while actively working|every 5 minutes when idle/i);
    expect(prompt).toMatch(/MUST on leave or owner Revoke/i);
    expect(prompt).toMatch(/delete all project-scoped routines/i);
    expect(prompt).toMatch(/Website relaunch watches/i);
  });
});
