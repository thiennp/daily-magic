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

  it("builds short actionable agent prompt with redeem_project_invite", () => {
    const prompt = buildProjectInviteAgentPrompt({
      inviteUrl: "https://example.com/invite/p/tok-xyz",
      projectId: "proj-1",
      projectName: "Demo",
    });
    expect(prompt).toContain("redeem_project_invite");
    expect(prompt).toContain("token: tok-xyz");
    expect(prompt).toContain("https://example.com/invite/p/tok-xyz");
    expect(prompt).toContain("Project: Demo (proj-1)");
    expect(prompt).toMatch(/Approve/i);
  });
});
