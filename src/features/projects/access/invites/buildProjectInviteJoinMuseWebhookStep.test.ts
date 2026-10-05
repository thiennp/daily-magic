import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { buildProjectInviteJoinMuseWebhookStep } from "@/features/projects/access/invites/buildProjectInviteJoinMuseWebhookStep";
import { AWC_MUSE_HMAC_WEBHOOK_REGISTER_STEPS } from "@/lib/agentAccess/awcMuseHmacWebhookRegisterCopy.constant";
import { PROJECT_API_KEY_MCP_TOOLS } from "@/lib/projects/acl/projectApiKeys/projectApiKeyMcpAllowlist.constant";
import { PROJECT_DISPATCH_PROCESSING_REPLY_CLAUSE } from "@/lib/projects/acl/projectBriefingHowToDispatch.constant";
import { signProjectWebhookBody } from "@/lib/projects/acl/webhooks/projectWebhookSecret";

const read = (path: string): string =>
  readFileSync(join(process.cwd(), path), "utf8");

describe("buildProjectInviteJoinMuseWebhookStep (step 7, Muse HMAC, copy only)", () => {
  const lines = buildProjectInviteJoinMuseWebhookStep();

  it("returns the AW Wake wrapper plus the shared reply clause before the ack", () => {
    expect(lines).toEqual([
      "7. Inbox delivery (webhook-first, Muse HMAC) — after peers summary:",
      `   MUST on connect (webhook-first): ${AWC_MUSE_HMAC_WEBHOOK_REGISTER_STEPS}`,
      "   Inbox wake is webhook-only; do not poll list_project_inbox on a timer.",
      `   ${PROJECT_DISPATCH_PROCESSING_REPLY_CLAUSE}`,
      '   MUST ack_project_message { "messageId": "<id>" }.',
      "   Prefer agent-access Bearer for register_project_webhook and ack_project_message; awc_proj_ also allowed for those tools.",
    ]);
  });

  it("has none of the Grok routine form, key, or daily repair copy", () => {
    const text = lines.join("\n");
    expect(text).not.toMatch(/Grok webhook form|routine key|Once a day/);
    expect(text).not.toMatch(/grokbot:\/\/|https?:\/\//);
  });

  it("only claims awc_proj_ for tools on the project key allowlist", () => {
    expect(PROJECT_API_KEY_MCP_TOOLS).toContain("register_project_webhook");
    expect(PROJECT_API_KEY_MCP_TOOLS).toContain("ack_project_message");
  });

  it("matches the signing headers and the signed string AWC uses", () => {
    const post = read(
      "src/lib/projects/acl/webhooks/postSignedProjectMembershipWebhook.ts",
    );
    for (const header of [
      "x-awc-signature",
      "x-awc-timestamp",
      "x-awc-message-id",
    ]) {
      expect(post).toContain(`"${header}"`);
      expect(AWC_MUSE_HMAC_WEBHOOK_REGISTER_STEPS).toContain(header);
    }
    const sig = signProjectWebhookBody({
      secret: "awc_whsec_test",
      timestamp: "1700000000",
      messageId: "m-1",
      body: "{}",
    });
    expect(sig).toMatch(/^[0-9a-f]{64}$/);
    expect(
      read("src/lib/projects/acl/webhooks/projectWebhookSecret.ts"),
    ).toContain("<= 300");
  });

  it("quotes the register tool note and the safe-URL error codes", () => {
    expect(
      read("src/lib/agentAccess/executeRegisterProjectWebhookTool.ts"),
    ).toContain(
      '"Store secret once. AWC signs X-AWC-Signature over timestamp.messageId.body."',
    );
    const guard = read(
      "src/lib/projects/acl/webhooks/assertSafeProjectWebhookUrl.ts",
    );
    for (const code of ["invalid_url", "https_only", "blocked_host"]) {
      expect(guard).toContain(`"${code}"`);
      expect(AWC_MUSE_HMAC_WEBHOOK_REGISTER_STEPS).toContain(code);
    }
  });

  it("stays pure and copy-only", () => {
    const src = read(
      "src/features/projects/access/invites/buildProjectInviteJoinMuseWebhookStep.ts",
    );
    expect(src).not.toMatch(
      /messaging|wakeProject|insertProjectMessage|fetch\(|process\.env|Date|getSql/,
    );
    expect(buildProjectInviteJoinMuseWebhookStep()).toEqual(lines);
  });
});
