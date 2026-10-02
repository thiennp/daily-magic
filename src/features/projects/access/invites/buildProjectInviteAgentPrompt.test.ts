import { describe, expect, it } from "vitest";

import {
  buildProjectInviteAgentPrompt,
  extractProjectInviteTokenFromUrl,
} from "@/features/projects/access/invites/buildProjectInviteAgentPrompt";
import { buildAgentAccessUrls } from "@/lib/agentAccess/buildAgentAccessUrls";

describe("buildProjectInviteAgentPrompt", () => {
  it("extracts token from invite URL", () => {
    expect(
      extractProjectInviteTokenFromUrl(
        "https://example.com/invite/p/abcTOKEN123",
      ),
    ).toBe("abcTOKEN123");
  });

  it("builds connect + wait-Approve + peers summary with MCP Bearer note", () => {
    const urls = buildAgentAccessUrls();
    const prompt = buildProjectInviteAgentPrompt({
      inviteUrl: "https://example.com/invite/p/tok-xyz",
      projectId: "proj-1",
      projectName: "Demo",
    });
    expect(prompt).toContain("redeem_project_invite");
    expect(prompt).toContain('{ "token": "tok-xyz" }');
    expect(prompt).toMatch(/no connector/i);
    expect(prompt).toContain(urls.mcpUrl);
    expect(prompt).toContain(urls.registerUrl);
    expect(prompt).toContain(urls.invokeUrl);
    expect(prompt).toMatch(/wait for the project owner to Approve/i);
    expect(prompt).toMatch(/come back and confirm/i);
    expect(prompt).toMatch(/do not busy-poll|not silent polling/i);
    expect(prompt).toContain("get_my_project_access");
    expect(prompt).toContain("rotate_project_api_key");
    expect(prompt).toContain("awc_proj_");
    expect(prompt).toMatch(/do NOT replace your MCP Authorization Bearer/i);
    expect(prompt).toMatch(/does not accept awc_proj_/i);
    expect(prompt).toContain("get_project_acl");
    expect(prompt).toContain("list_project_peers");
    expect(prompt).toMatch(/REQUIRED/i);
    expect(prompt).toContain("projectDisplayName");
    expect(prompt).toContain("teamLabel");
    expect(prompt).toContain("isAgent");
    expect(prompt).toMatch(/Empty peers is normal/i);
    expect(prompt).toMatch(/print a clear human summary/i);
    expect(prompt).toContain("project_dispatch");
    expect(prompt).toMatch(/toProjectDisplayName|toTeamLabel/);
    expect(prompt).toMatch(/get_project_briefing/i);
    expect(prompt).toContain("check_product_updates");
    expect(prompt).toMatch(/sinceCatalogVersion/);
    expect(prompt).toMatch(/keep agent-access Bearer for MCP/);
    expect(prompt).not.toMatch(/memory pull|pull memory|project memory/i);
    expect(prompt).not.toMatch(/open this URL/i);
    expect(prompt).not.toContain("https://example.com/invite/p/tok-xyz");
    expect(prompt).toContain("Project: Demo (proj-1)");
    expect(prompt).toContain("leave_project");
    expect(prompt).toMatch(/"confirm":\s*true/);
    expect(prompt).toMatch(/no owner Approve needed|does not need to Approve your leave/i);
    expect(prompt).toMatch(/do NOT call leave_project with awc_proj_|agent-access MCP Bearer only/i);
    expect(prompt).toMatch(/cannot revoke others/i);
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
