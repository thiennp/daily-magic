import { HOME_MARKETING_STEPS_COPY } from "@/features/home/constants/homeMarketingBotsFaqCopy.constant";
import { describe, expect, it } from "vitest";

import {
  HOME_MARKETING_FEATURES_COPY,
  HOME_MARKETING_HERO_COPY,
  HOME_MARKETING_HONESTY_FOOTNOTE,
} from "@/features/home/constants/homeMarketingLandingCopy.constant";
import { MARKETING_FEATURE_ITEMS } from "@/features/marketing/marketingFeatureItems.constant";
import { AWC_GROK_BOT_WEBHOOK_REGISTER_STEPS } from "@/lib/agentAccess/awcGrokWebhookRegisterCopy.constant";
import { buildProjectAclAgentGuidelineSection } from "@/lib/agentAccess/buildProjectAclAgentGuidelineSection";

describe("home marketing bot-to-bot connect (Grok launch)", () => {
  it("landing hero and steps cover invite → Approve → peers → dispatch in plain words", () => {
    const blob = [
      HOME_MARKETING_HERO_COPY.description,
      HOME_MARKETING_FEATURES_COPY.title,
      HOME_MARKETING_FEATURES_COPY.description,
      ...HOME_MARKETING_STEPS_COPY.steps.map((s) => `${s.title} ${s.body}`),
      HOME_MARKETING_HONESTY_FOOTNOTE,
      ...HOME_MARKETING_FEATURES_COPY.items.map((i) => `${i.title} ${i.body}`),
    ].join("\n");
    expect(blob).toMatch(/approv/i);
    expect(blob).toMatch(/teammate/i);
    expect(blob).not.toMatch(
      /list_project_peers|project_dispatch|leave_project/i,
    );
    expect(blob).not.toMatch(/Dual Bearer|awc_proj_|agent-access|HMAC/i);
    expect(HOME_MARKETING_HONESTY_FOOTNOTE).toBe("");
  });

  it("feature cards lead with bot-to-bot project connect in plain words", () => {
    expect(MARKETING_FEATURE_ITEMS[0]?.title).toMatch(/Bot-to-bot/i);
    expect(MARKETING_FEATURE_ITEMS[0]?.body).toMatch(/pass work/i);
    expect(MARKETING_FEATURE_ITEMS[0]?.body).toMatch(/nickname/i);
    expect(MARKETING_FEATURE_ITEMS[0]?.body).toMatch(/leave/i);
    expect(MARKETING_FEATURE_ITEMS[0]?.body).not.toMatch(
      /list_project_peers|project_dispatch|leave_project|Bearer|MCP/i,
    );
    expect(MARKETING_FEATURE_ITEMS[1]?.body).toMatch(/Left project/i);
    expect(
      HOME_MARKETING_STEPS_COPY.steps.map((s) => s.body).join(" "),
    ).toMatch(/owner approves/i);
  });

  it("for-agents Project cowork ACL documents the full connect path", () => {
    const body = buildProjectAclAgentGuidelineSection().body.join(" ");
    expect(body).toMatch(/Bot-to-bot connect/i);
    expect(body).toMatch(/redeem_project_invite/);
    expect(body).toMatch(/wait for Approve|wait owner Approve/i);
    expect(body).toMatch(/list_project_peers/);
    expect(body).toMatch(/project_dispatch/);
    expect(body).toMatch(/register_project_webhook/);
    expect(body).toMatch(/list_project_inbox/);
    expect(body).toMatch(/ack_project_message/);
    expect(body).toContain(AWC_GROK_BOT_WEBHOOK_REGISTER_STEPS);
    expect(body).toMatch(/Grok Bot only/);
    expect(body).not.toMatch(/if you can host HTTPS/i);
    expect(body).not.toMatch(/grokbot:\/\/|Slack|Discord/i);
    expect(body).toMatch(/MUST on connect \(webhook-first\)|Inbox: MUST/i);
    expect(body).toMatch(/Inbox wake is webhook-only, via a Grok routine/i);
    expect(body).toMatch(/do not poll list_project_inbox on a timer/i);
    expect(body).toMatch(/Once a day, check the project webhook/i);
    expect(body).toMatch(/get_my_project_webhook_status/);
    expect(body).toMatch(/MUST ack_project_message/i);
    expect(body).not.toMatch(/MUST poll list_project_inbox|else MUST poll/i);
    expect(body).not.toMatch(/every 30 seconds while actively working/i);
    expect(body).not.toMatch(/every 5 minutes when idle/i);
    expect(body).toMatch(/MUST on leave or owner Revoke/i);
    expect(body).toMatch(/delete all project-scoped routines/i);
    expect(body).toMatch(/Website relaunch watches/i);
    expect(body).toMatch(
      /Prefer agent-access \(aw_\) for register_project_webhook and ack_project_message/i,
    );
    expect(body).toMatch(
      /register_project_webhook, ack_project_message, rotate_project_api_key/,
    );
    expect(body).not.toMatch(/not on awc_proj_ allowlist/);
    expect(body).toMatch(/thin protocol metadata|no media\/blobs/i);
    expect(body).toContain("summary ≤ 200 chars");
    expect(body).toContain("refs ≤ 768 bytes");
    expect(body).toContain("media_not_allowed");
    expect(body).toContain("delete-on-ack");
    expect(body).toMatch(/unacked messages expire after 3 days/i);
    expect(body).toContain(
      "Rate limits: 300/hour (rolling) + max 300 unread (ack/clear frees slots)",
    );
    expect(body).toMatch(/leave_project/);
    expect(body).toMatch(/Dual-Bearer|awc_proj_/i);
    expect(body).toMatch(/register_project_webhook/);
    expect(body).toMatch(/list_project_inbox|ack_project_message/);
  });
});
