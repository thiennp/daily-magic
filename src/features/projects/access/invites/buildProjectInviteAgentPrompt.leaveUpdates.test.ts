import { describe, expect, it } from "vitest";

import { buildProjectInviteAgentPrompt } from "@/features/projects/access/invites/buildProjectInviteAgentPrompt";

describe("buildProjectInviteAgentPrompt leave + wake + product updates", () => {
  it("covers leave, wake-routine, and check_product_updates", () => {
    const prompt = buildProjectInviteAgentPrompt({
      inviteUrl: "https://example.com/invite/p/tok-xyz",
      projectId: "proj-1",
      projectName: "Demo",
    });
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
    expect(prompt).not.toMatch(
      /Else MUST poll list_project_inbox|every 30 seconds while actively working|every 5 minutes when idle/i,
    );
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
  });
});
