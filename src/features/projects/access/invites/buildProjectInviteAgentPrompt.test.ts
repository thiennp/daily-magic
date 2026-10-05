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

  it("builds connect + check-access + peers summary with MCP Bearer note", () => {
    const urls = buildAgentAccessUrls();
    const prompt = buildProjectInviteAgentPrompt({
      inviteUrl: "https://example.com/invite/p/tok-xyz",
      projectId: "proj-1",
      projectName: "Demo",
    });
    expect(prompt).toContain("redeem_project_invite");
    expect(prompt).toContain('"token": "tok-xyz"');
    expect(prompt).toContain("suggestedProjectDisplayName");
    expect(prompt).toMatch(/no connector/i);
    expect(prompt).toContain(urls.mcpUrl);
    expect(prompt).toContain(urls.registerUrl);
    expect(prompt).toContain(urls.invokeUrl);
    expect(prompt).toMatch(/wait for the project owner to Approve/i);
    expect(prompt).toMatch(/come back and confirm/i);
    expect(prompt).toMatch(/do not busy-poll|not silent polling/i);
    expect(prompt).toMatch(/skip.*wait for Approve|If status is active/i);
    expect(prompt).toMatch(/Bots you own can join without Approve/i);
    expect(prompt).toContain("get_my_project_access");
    expect(prompt).toContain("toMembershipId");
    expect(prompt).toMatch(/prefer toMembershipId|MUST prefer toMembershipId/i);
    expect(prompt).toMatch(/~7 days|alias TTL/i);
    expect(prompt).toContain("rotate_project_api_key");
    expect(prompt).toContain("awc_proj_");
    expect(prompt).toMatch(
      /Dual-Bearer|MCP accepts agent-access Bearer OR active awc_proj_/i,
    );
    expect(prompt).toMatch(/project-scoped tools/i);
    expect(prompt).toMatch(/You MAY use awc_proj_/i);
    expect(prompt).toContain("list_project_peers");
    expect(prompt).toContain("list_project_inbox");
    expect(prompt).toContain("check_membership");
    expect(prompt).toMatch(/awc_proj_ alone 401s|cannot call non-project/i);
    expect(prompt).toContain("get_project_acl");
    expect(prompt).toContain("list_project_peers");
    expect(prompt).toMatch(/REQUIRED/i);
    expect(prompt).toContain("projectDisplayName");
    expect(prompt).toContain("teamLabel");
    expect(prompt).toContain("isAgent");
    expect(prompt).toContain("isOwner");
    expect(prompt).toMatch(/Expect self|from self/i);
    expect(prompt).toMatch(/isOwner/i);
    expect(prompt).toMatch(
      /empty peers is less common|Empty peers besides the owner is normal/i,
    );
    expect(prompt).toMatch(/print a clear human summary/i);
    expect(prompt).toContain("project_dispatch");
    expect(prompt).toMatch(/toMembershipId|toProjectDisplayName|toTeamLabel/);
    expect(prompt).toMatch(/get_project_briefing/i);
    expect(prompt).toContain("check_product_updates");
    expect(prompt).toMatch(/sinceCatalogVersion/);
    expect(prompt).toMatch(/Product updates/i);
    expect(prompt).toMatch(/after connect|post-Approve summary/i);
    expect(prompt).toMatch(/periodically/i);
    expect(prompt).toMatch(/Start with sinceCatalogVersion 0|start with 0/i);
    expect(prompt).toMatch(/entries\[\]\.adapt|adaptHint|tools\[\]|connect/);
    expect(prompt).toMatch(/tell your user briefly|catalog advanced/i);
    expect(prompt).toMatch(
      /Store returned catalogVersion|store.*catalogVersion/i,
    );
    expect(prompt).toMatch(
      /agent-access Bearer|check_product_updates is catalog-wide/i,
    );
    expect(prompt).toMatch(
      /awc_proj_ alone 401s|do NOT swap to awc_proj_|required\/preferred/i,
    );
    expect(prompt).toMatch(/Dual-auth|Dual-Bearer|project-scoped/i);
    expect(prompt).not.toMatch(/memory pull|pull memory|project memory/i);
    expect(prompt).not.toMatch(/open this URL/i);
    expect(prompt).not.toContain("https://example.com/invite/p/tok-xyz");
    expect(prompt).toContain("Project: Demo (proj-1)");
    expect(prompt).toContain("leave_project");
    expect(prompt).toMatch(/"confirm":\s*true/);
    expect(prompt).toMatch(
      /no owner Approve needed|does not need to Approve your leave/i,
    );
    expect(prompt).toMatch(
      /agent-access only for leave_project|do NOT call leave_project with awc_proj_|agent-access MCP Bearer only/i,
    );
    expect(prompt).toMatch(
      /not on the awc_proj_|do NOT call leave_project with awc_proj_/i,
    );
    expect(prompt).toMatch(/Left project|leave \//i);
    expect(prompt).toMatch(/cannot revoke others/i);
    expect(prompt).toMatch(/MUST on leave or owner Revoke/i);
    expect(prompt).toMatch(/delete all project-scoped routines/i);
    expect(prompt).toMatch(/Website relaunch watches/i);
    expect(prompt).toMatch(/MUST on connect \(webhook-first\)/i);
    expect(prompt).toMatch(/Inbox wake is webhook-only, via a Grok routine/i);
    expect(prompt).toMatch(/do not poll list_project_inbox on a timer/i);
    expect(prompt).toMatch(/Once a day, check the project webhook/i);
    expect(prompt).toMatch(/get_my_project_webhook_status/);
    expect(prompt).not.toMatch(/Else MUST poll list_project_inbox|every 30 seconds while actively working|every 5 minutes when idle/i);
  });

  it("prefers explicit token over URL parse", () => {
    const prompt = buildProjectInviteAgentPrompt({
      inviteUrl: "https://example.com/invite/p/from-url",
      token: "explicit-tok",
    });
    expect(prompt).toContain('"token": "explicit-tok"');
    expect(prompt).not.toContain("from-url");
  });
});
