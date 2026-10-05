import { beforeEach, describe, expect, it, vi } from "vitest";

const issue = vi.hoisted(() => vi.fn());
vi.mock("@/lib/agentAccess/claimBot/issueClaimBotCode", () => ({
  issueClaimBotCode: issue,
}));

import { executeIssueClaimBotCodeTool } from "@/lib/agentAccess/claimBot/executeIssueClaimBotCodeTool";
import { ISSUE_BOT_CLAIM_CODE_TOOL } from "@/lib/agentAccess/claimBot/issueClaimBotCodeTool.constant";
import { AGENT_ACCESS_MUTATING_TOOLS } from "@/lib/agentAccess/agentAccess.constant";
import { PROJECT_API_KEY_MCP_TOOLS } from "@/lib/projects/acl/projectApiKeys/projectApiKeyMcpAllowlist.constant";

describe("executeIssueClaimBotCodeTool", () => {
  beforeEach(() => {
    issue.mockReset();
  });

  it("returns the plaintext code once on success", async () => {
    issue.mockResolvedValue({
      ok: true,
      code: "awc_claim_abc",
      expiresAt: "2026-10-05T08:00:00.000Z",
      tokenId: "tok-1",
    });
    const result = await executeIssueClaimBotCodeTool({
      token: "aw_testtokenvalue123456",
    });
    const text = JSON.stringify(result);
    expect(text).toContain("awc_claim_abc");
    expect(text).toContain("expiresAt");
    expect(result?.isError).not.toBe(true);
  });

  it("surfaces already_claimed clearly", async () => {
    issue.mockResolvedValue({ ok: false, code: "already_claimed" });
    const result = await executeIssueClaimBotCodeTool({
      token: "aw_testtokenvalue123456",
    });
    expect(result?.isError).toBe(true);
    expect(JSON.stringify(result)).toContain("already_claimed");
    expect(JSON.stringify(result)).toContain("Unclaim");
  });

  it("is agent-access Bearer only and listed as mutating", () => {
    expect(ISSUE_BOT_CLAIM_CODE_TOOL.name).toBe("issue_bot_claim_code");
    expect(ISSUE_BOT_CLAIM_CODE_TOOL.description).toContain(
      "Agent-access Bearer only",
    );
    expect(PROJECT_API_KEY_MCP_TOOLS).not.toContain("issue_bot_claim_code");
    expect(AGENT_ACCESS_MUTATING_TOOLS).toContain("issue_bot_claim_code");
  });
});
