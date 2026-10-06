import { describe, expect, it } from "vitest";

import { buildAgentAccessGuideline } from "@/lib/agentAccess/buildAgentAccessGuideline";
import { buildAgentAccessPrompt } from "@/lib/agentAccess/buildAgentAccessPrompt";
import { AWC_TERMS_VERSION } from "@/lib/agentAccess/awcTermsVersion.constant";
import { parseAgentAccessRegisterBody } from "@/lib/agentAccess/parseAgentAccessRegisterBody";
import {
  createAgentAccessToken,
  hashAgentAccessToken,
  readBearerAgentAccessToken,
} from "@/lib/agentAccess/hashAgentAccessToken";
import { parseAgentMailInboxResponse } from "@/lib/agentAccess/createAgentMailInbox";
import { isAgentAccessRateLimited } from "@/lib/agentAccess/agentAccessRateLimit";
import { buildSyntheticAgentEmail } from "@/lib/agentAccess/buildSyntheticAgentEmail";
import { isAgentAccessSyntheticEmail } from "@/lib/agentAccess/isAgentAccessSyntheticEmail";

describe("agent access registration", () => {
  it("defers register body + terms cases to parseAgentAccessRegisterBody.terms.test", () => {
    expect(
      parseAgentAccessRegisterBody({
        method: "none",
        acceptTerms: true,
        termsVersion: AWC_TERMS_VERSION,
      }).ok,
    ).toBe(true);
  });

  it("builds a short prompt that points at the agent guideline", () => {
    const prompt = buildAgentAccessPrompt();

    expect(prompt).toContain("You are a bot");
    expect(prompt).toContain("https://www.agentwitch.com/for-agents");
    expect(prompt).toContain("Open the guideline");
    expect(prompt).toContain("Do not ask the human");
    expect(prompt).not.toContain("/api/agent-access/register");
    expect(prompt).not.toMatch(/Daily Magic/);
    expect(prompt).not.toMatch(/Job history/);
  });

  it("keeps the full procedure on the guideline page", () => {
    const guideline = buildAgentAccessGuideline();
    const text = guideline.sections
      .flatMap((section) => section.body)
      .join("\n");

    expect(text).toContain(
      "https://www.agentwitch.com/api/agent-access/register",
    );
    expect(text).toContain('method "none"');
    expect(text).toContain('acceptTerms');
    expect(text).toContain(AWC_TERMS_VERSION);
    expect(text).toContain("Get your user's clear yes to the Terms and Privacy Policy first");
    expect(text).not.toContain("Tell your human");
    expect(text).toContain('method "agentmail"');
    expect(text).toContain("get_install_command");
    expect(text).toContain("create_workflow");
    expect(text).toContain("install_harness");
    expect(text).toContain("~/.agent-witch/harness/");
    expect(text).toContain("http://127.0.0.1:43347/prompt-optimizer/agent");
    expect(text).toContain("workingDirectory");
    expect(text).toContain("Do not ask the human to paste the prompt");
    expect(guideline.sections[0]?.heading).toBe("What Agent Witch is");
    expect(text).toContain("agent-support playground");
    expect(text).toContain("Prompt Optimizer");
    expect(text).toContain("not a concrete ops executor");
    expect(text).toContain("Slack");
    expect(
      guideline.sections.some(
        (section) => section.heading === "Project cowork ACL",
      ),
    ).toBe(true);
    expect(text).toContain("Approves or Denies");
    expect(text).toContain("approve/revoke audit");
    expect(text).toContain("There is no directory of other people's bots.");
    expect(text).not.toContain("Pass this to another bot");
  });

  it("hashes tokens and reads only aw_ bearer values", () => {
    const token = createAgentAccessToken();

    expect(token.startsWith("aw_")).toBe(true);
    expect(hashAgentAccessToken(token)).toHaveLength(64);
    expect(readBearerAgentAccessToken(`Bearer ${token}`)).toBe(token);
    expect(readBearerAgentAccessToken("Bearer nope")).toBeNull();
  });

  it("uses a synthetic mailbox-less domain for method none", () => {
    expect(buildSyntheticAgentEmail()).toMatch(
      /^agt-[0-9a-f-]+@agents\.agentwitch\.com$/,
    );
    expect(isAgentAccessSyntheticEmail("agt-1@agents.agentwitch.com")).toBe(
      true,
    );
    expect(isAgentAccessSyntheticEmail("human@example.com")).toBe(false);
  });

  it("reads an Agent Mail inbox id as the account email", () => {
    expect(
      parseAgentMailInboxResponse({ inbox_id: "aw1@agentmail.to" })?.email,
    ).toBe("aw1@agentmail.to");
    expect(parseAgentMailInboxResponse({ inbox_id: "no-at" })).toBeNull();
  });

  it("rate limits the 8th attempt in an hour", () => {
    expect(isAgentAccessRateLimited(7)).toBe(false);
    expect(isAgentAccessRateLimited(8)).toBe(true);
  });
});
