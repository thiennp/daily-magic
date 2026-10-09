import { describe, expect, it } from "vitest";

import { AWC_GROK_BOT_WEBHOOK_REGISTER_STEPS } from "@/lib/agentAccess/awcGrokWebhookRegisterCopy.constant";
import { buildProjectAclAgentGuidelineSection } from "@/lib/agentAccess/buildProjectAclAgentGuidelineSection";
import {
  PROJECT_BRIEFING_HOW_TO_DISPATCH,
  PROJECT_DISPATCH_PROCESSING_REPLY_CLAUSE,
  PROJECT_UPDATED_WAKE_REPLY_CLAUSE,
} from "@/lib/projects/acl/projectBriefingHowToDispatch.constant";
import {
  PROJECT_B2B_SILENCE_BLOCK_MS,
  PROJECT_B2B_SILENCE_NOTIFY_MS,
  PROJECT_MESSAGE_KIND_PROJECT_UPDATED,
  PROJECT_MESSAGE_KIND_TASK_BLOCKED,
  PROJECT_MESSAGE_KIND_TASK_DONE,
  PROJECT_MESSAGE_KIND_TASK_PROCESSING,
  PROJECT_MESSAGE_KIND_TASK_STATUS,
} from "@/lib/projects/acl/messaging/projectMessage.constants";

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
      "On code rate_limited (reason hourly|unread_cap), tell your user the message was rate-limited",
    );
    expect(PROJECT_BRIEFING_HOW_TO_DISPATCH).toContain(
      "use retryAfterSeconds / retryAfterAt when present",
    );
    expect(PROJECT_BRIEFING_HOW_TO_DISPATCH).toContain(
      'toProjectDisplayName: "Owner"',
    );
    expect(PROJECT_BRIEFING_HOW_TO_DISPATCH).toContain("toMembershipId");
    expect(PROJECT_BRIEFING_HOW_TO_DISPATCH).toMatch(/~7 days|alias TTL/i);
    expect(PROJECT_BRIEFING_HOW_TO_DISPATCH).toContain("peer.joined");
    expect(PROJECT_BRIEFING_HOW_TO_DISPATCH).toContain("project.updated");
    expect(PROJECT_BRIEFING_HOW_TO_DISPATCH).toContain(
      PROJECT_UPDATED_WAKE_REPLY_CLAUSE,
    );
    expect(PROJECT_BRIEFING_HOW_TO_DISPATCH).toContain(
      AWC_GROK_BOT_WEBHOOK_REGISTER_STEPS,
    );
    expect(PROJECT_BRIEFING_HOW_TO_DISPATCH).not.toMatch(
      /if you can host HTTPS/i,
    );
    expect(PROJECT_BRIEFING_HOW_TO_DISPATCH).toMatch(
      /MUST on connect \(webhook-first\)/i,
    );
    expect(PROJECT_BRIEFING_HOW_TO_DISPATCH).toMatch(
      /Inbox wake is webhook-only, via a Grok routine/i,
    );
    expect(PROJECT_BRIEFING_HOW_TO_DISPATCH).toMatch(
      /do not poll list_project_inbox on a timer/i,
    );
    expect(PROJECT_BRIEFING_HOW_TO_DISPATCH).toMatch(/delivery_mode poll/i);
    expect(PROJECT_BRIEFING_HOW_TO_DISPATCH).toMatch(
      /Do not install cloudflared tunnel receivers/i,
    );
    expect(PROJECT_BRIEFING_HOW_TO_DISPATCH).toMatch(
      /Once a day, check the project webhook/i,
    );
    expect(PROJECT_BRIEFING_HOW_TO_DISPATCH).toMatch(
      /get_my_project_webhook_status/,
    );
    expect(PROJECT_BRIEFING_HOW_TO_DISPATCH).toMatch(
      /MUST ack_project_message/i,
    );
    expect(PROJECT_BRIEFING_HOW_TO_DISPATCH).not.toMatch(
      /MUST poll list_project_inbox|every 30 seconds while actively working|every 5 minutes when idle/i,
    );
    expect(PROJECT_BRIEFING_HOW_TO_DISPATCH).toMatch(
      /On leave or owner Revoke MUST delete all project-scoped routines/i,
    );
    expect(PROJECT_BRIEFING_HOW_TO_DISPATCH).toMatch(
      /Website relaunch watches/i,
    );
  });
});

describe("PROJECT_UPDATED_WAKE_REPLY_CLAUSE", () => {
  it("requires a short user line then ack (not ack-only)", () => {
    expect(PROJECT_UPDATED_WAKE_REPLY_CLAUSE).toContain(
      `kind "${PROJECT_MESSAGE_KIND_PROJECT_UPDATED}"`,
    );
    expect(PROJECT_UPDATED_WAKE_REPLY_CLAUSE).toContain("get_project_acl");
    expect(PROJECT_UPDATED_WAKE_REPLY_CLAUSE).toContain("get_project_briefing");
    expect(PROJECT_UPDATED_WAKE_REPLY_CLAUSE).toContain(
      "tell the user in one short line that project info changed",
    );
    expect(PROJECT_UPDATED_WAKE_REPLY_CLAUSE).toContain("then ack");
    expect(PROJECT_UPDATED_WAKE_REPLY_CLAUSE).toContain("Do not ack only.");
    const lineAt = PROJECT_UPDATED_WAKE_REPLY_CLAUSE.indexOf(
      "tell the user in one short line",
    );
    const ackAt = PROJECT_UPDATED_WAKE_REPLY_CLAUSE.indexOf("then ack");
    expect(lineAt).toBeGreaterThanOrEqual(0);
    expect(ackAt).toBeGreaterThan(lineAt);
    expect(PROJECT_BRIEFING_HOW_TO_DISPATCH).toContain(
      PROJECT_UPDATED_WAKE_REPLY_CLAUSE,
    );
    expect(buildProjectAclAgentGuidelineSection().body.join("\n")).toContain(
      PROJECT_UPDATED_WAKE_REPLY_CLAUSE,
    );
  });
});
