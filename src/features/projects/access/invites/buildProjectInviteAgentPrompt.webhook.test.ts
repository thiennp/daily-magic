import { describe, expect, it } from "vitest";

import { buildProjectInviteAgentPrompt } from "@/features/projects/access/invites/buildProjectInviteAgentPrompt";

describe("buildProjectInviteAgentPrompt webhook-first inbox", () => {
  it("MUST register_project_webhook first, else poll + ack with session cadence", () => {
    const prompt = buildProjectInviteAgentPrompt({
      inviteUrl: "https://example.com/invite/p/tok-xyz",
      projectId: "proj-1",
      projectName: "Demo",
    });
    expect(prompt).toContain("register_project_webhook");
    expect(prompt).toContain("ack_project_message");
    expect(prompt).toMatch(/Inbox delivery|webhook-first/i);
    expect(prompt).toMatch(/webhookUrl/);
    expect(prompt).toMatch(/X-AWC-Signature/);
    expect(prompt).toMatch(/timestamp\.messageId\.body/);
    expect(prompt).toMatch(
      /Prefer agent-access Bearer for register_project_webhook and ack_project_message/i,
    );
    expect(prompt).toMatch(/awc_proj_ (is )?also allowed/i);
    expect(prompt).not.toMatch(/not on awc_proj_ allowlist/i);
    expect(prompt).toContain('"since"?');
    expect(prompt).toContain('"limit"?');
    expect(prompt).toContain("list_project_inbox");
    expect(prompt).toMatch(/thin protocol metadata|no media\/blobs/i);
    expect(prompt).toMatch(/P2P|localPath/i);
    expect(prompt).toContain("summary ≤ 200 chars");
    expect(prompt).toContain("refs ≤ 768 bytes");
    expect(prompt).toContain("media_not_allowed");
    expect(prompt).toContain("Delete-on-ack");
    expect(prompt).toContain("unacked messages expire after 3 days");
    expect(prompt).toContain("Rate limits: 300/hour (rolling) + max 300 unread (ack/clear frees slots)");
    expect(prompt).toContain('"toProjectDisplayName": "Owner"');
    expect(prompt).toContain("peer.joined");
    expect(prompt).toContain('fromProjectDisplayName === "Owner"');
    expect(prompt).toMatch(/MUST on connect \(webhook-first\)/i);
    expect(prompt).toMatch(/Else MUST poll list_project_inbox/i);
    expect(prompt).toMatch(/MUST ack_project_message/i);
    expect(prompt).toMatch(/every 30 seconds while actively working/i);
    expect(prompt).toMatch(/routine poll every 5 minutes/i);
    expect(prompt).toMatch(/MUST on leave or owner Revoke/i);
    expect(prompt).toMatch(/delete all project-scoped routines/i);
    expect(prompt).toMatch(/Softvale watches/i);
  });
});
