import { describe, expect, it } from "vitest";

import { buildAgentAccessLiveGuide } from "@/lib/agentAccess/buildAgentAccessLiveGuide";

describe("live agent guide", () => {
  it("lists current tools and how to teach other bots", () => {
    const guide = buildAgentAccessLiveGuide();
    const names = guide.tools.map((tool) => tool.name);

    expect(names).toContain("get_agent_guide");
    expect(names).toContain("check_product_updates");
    expect(names).toContain("report_feedback");
    expect(guide.productUpdates.tool).toBe("check_product_updates");
    expect(guide.productUpdates.startSince).toBe(0);
    expect(names).toContain("create_workflow");
    expect(names).toContain("request_project_access");
    expect(names).toContain("mint_allow_claim");
    expect(guide.projectCowork.noTokenSharing).toBe(true);
    expect(guide.projectCowork.tools).toContain("list_project_peers");
    expect(guide.projectCowork.tools).toContain("project_dispatch");
    expect(guide.projectCowork.tools).toContain("register_project_webhook");
    expect(guide.projectCowork.tools).toContain("list_project_inbox");
    expect(guide.projectCowork.tools).toContain("ack_project_message");
    expect(guide.projectCowork.tools).toContain("rotate_project_api_key");
    expect(guide.projectCowork.tools.indexOf("register_project_webhook")).toBeLessThan(
      guide.projectCowork.tools.indexOf("list_project_inbox"),
    );
    expect(guide.whatAgentWitchIs.role).toBe("agent_support_playground");
    expect(guide.whatAgentWitchIs.summary).toContain(
      "agent-support playground",
    );
    expect(guide.whatAgentWitchIs.excludes).toContain("slack_ops_execution");
    expect(guide.whatAgentWitchIs.excludes).toContain("cloud_content_bus");
    expect(guide.whatAgentWitchIs.includes).toContain("project_access_acl");
    expect(guide.promptSdlc.billingHonesty).toMatch(
      /useThisPrompt only on passed/,
    );
    expect(guide.promptSdlc.poll).toMatch(/no_reply/);
    expect(guide.teachOtherBots.instruction).toContain("use_agent_witch");
    expect(guide.teachOtherBots.instruction).toContain(
      "Do not look up or publish another person's account.",
    );
    expect(JSON.stringify(guide)).not.toContain("passAlong");
    expect(guide.teachOtherBots.toolName).toBe("use_agent_witch");
    expect(guide.teachOtherBots.readFirst[0]).toBe(
      "https://www.agentwitch.com/for-agents",
    );
    expect(guide.registerUrl).toBe(
      "https://www.agentwitch.com/api/agent-access/register",
    );
    expect(guide.promptSdlc.url).toBe(
      "http://127.0.0.1:43347/prompt-optimizer/agent",
    );
    expect(guide.promptSdlc.context).toContain("harness");
  });
});
