import { describe, expect, it } from "vitest";

import {
  buildProjectInviteAgentPrompt,
  extractProjectInviteTokenFromUrl,
} from "@/features/projects/access/invites/buildProjectInviteAgentPrompt";

describe("buildProjectInviteAgentPrompt", () => {
  it("extracts token from invite URL", () => {
    expect(
      extractProjectInviteTokenFromUrl(
        "https://example.com/invite/p/abcTOKEN123",
      ),
    ).toBe("abcTOKEN123");
  });

  it("builds MCP-only prompt with redeem_project_invite token JSON", () => {
    const prompt = buildProjectInviteAgentPrompt({
      inviteUrl: "https://example.com/invite/p/tok-xyz",
      projectId: "proj-1",
      projectName: "Demo",
    });
    expect(prompt).toContain("redeem_project_invite");
    expect(prompt).toContain('{ "token": "tok-xyz" }');
    expect(prompt).toMatch(/pending/i);
    expect(prompt).toMatch(/do not open a browser/i);
    expect(prompt).not.toMatch(/open this URL/i);
    expect(prompt).not.toContain("https://example.com/invite/p/tok-xyz");
    expect(prompt).toContain("Project: Demo (proj-1)");
  });

  it("prefers explicit token over URL parse", () => {
    const prompt = buildProjectInviteAgentPrompt({
      inviteUrl: "https://example.com/invite/p/from-url",
      token: "explicit-tok",
    });
    expect(prompt).toContain('{ "token": "explicit-tok" }');
    expect(prompt).not.toContain("from-url");
  });
});
