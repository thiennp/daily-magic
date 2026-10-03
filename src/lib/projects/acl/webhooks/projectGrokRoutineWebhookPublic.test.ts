import { describe, expect, it } from "vitest";

import { buildRegisterProjectWebhookToolBody } from "@/lib/agentAccess/executeRegisterProjectWebhookTool";
import { toPublicGrokRoutineWebhook } from "@/lib/projects/acl/webhooks/projectGrokRoutineWebhookPublic";
import { PROJECT_BRIEFING_HOW_TO_DISPATCH } from "@/lib/projects/acl/projectBriefingHowToDispatch.constant";
import { buildProjectAclAgentGuidelineSection } from "@/lib/agentAccess/buildProjectAclAgentGuidelineSection";

describe("grok routine webhook bearer is write-only", () => {
  it("omits the bearer from public reads and briefing text", () => {
    const bearer = "super-secret-bearer-value";
    const pub = toPublicGrokRoutineWebhook({
      webhook_url: "https://example.com/wake",
      bearer_retained: bearer,
    });
    expect(pub).toEqual({
      grokWebhookRegistered: true,
      grokWebhookUrl: "https://example.com/wake",
    });
    expect(JSON.stringify(pub)).not.toContain(bearer);
    const tool = buildRegisterProjectWebhookToolBody({
      hmac: null,
      grokWebhookUrl: "https://example.com/wake",
    });
    expect(tool).not.toHaveProperty("grokWebhookBearer");
    expect(tool).not.toHaveProperty("bearer_retained");
    expect(JSON.stringify(tool)).not.toContain(bearer);
    const briefing = [
      PROJECT_BRIEFING_HOW_TO_DISPATCH,
      ...buildProjectAclAgentGuidelineSection().body,
    ].join("\n");
    expect(briefing).not.toContain(bearer);
    expect(briefing).not.toContain("bearer_retained");
  });
});
