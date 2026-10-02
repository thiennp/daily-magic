import { describe, expect, it } from "vitest";

import { buildProjectInviteAgentPrompt } from "@/features/projects/access/invites/buildProjectInviteAgentPrompt";

describe("buildProjectInviteAgentPrompt webhook-first inbox", () => {
  it("prefers register_project_webhook then list_project_inbox + ack", () => {
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
    expect(prompt).toMatch(/aw_ required|require agent-access Bearer \(aw_\)/i);
    expect(prompt).toMatch(/not on awc_proj_ allowlist/i);
    expect(prompt).toContain('"since"?');
    expect(prompt).toContain('"limit"?');
    expect(prompt).toContain("list_project_inbox");
    expect(prompt).not.toMatch(/awc_proj_ also allowed for those/i);
    expect(prompt).toMatch(/thin protocol metadata|no media\/blobs/i);
    expect(prompt).toMatch(/P2P|localPath/i);
  });
});
