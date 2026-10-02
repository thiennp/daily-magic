import { describe, expect, it } from "vitest";

import {
  HOME_MARKETING_FEATURES_COPY,
  HOME_MARKETING_HERO_COPY,
  HOME_MARKETING_HONESTY_FOOTNOTE,
  HOME_MARKETING_STEPS_COPY,
} from "@/features/home/constants/homeMarketingLandingCopy.constant";
import { MARKETING_FEATURE_ITEMS } from "@/features/marketing/marketingFeatureItems.constant";
import { buildProjectAclAgentGuidelineSection } from "@/lib/agentAccess/buildProjectAclAgentGuidelineSection";

describe("home marketing bot-to-bot connect (Grok launch)", () => {
  it("landing hero and steps cover invite → Approve → peers → dispatch", () => {
    const blob = [
      HOME_MARKETING_HERO_COPY.description,
      ...HOME_MARKETING_HERO_COPY.steps,
      HOME_MARKETING_FEATURES_COPY.title,
      HOME_MARKETING_FEATURES_COPY.description,
      ...HOME_MARKETING_STEPS_COPY.steps.map((s) => `${s.title} ${s.body}`),
      HOME_MARKETING_HONESTY_FOOTNOTE,
    ].join("\n");
    expect(blob).toMatch(/invite/i);
    expect(blob).toMatch(/Approve/i);
    expect(blob).toMatch(/peers|list_project_peers/i);
    expect(blob).toMatch(/project_dispatch/i);
    expect(blob).toMatch(/leave_project/i);
    expect(blob).toMatch(/Dual Bearer|awc_proj_/i);
  });

  it("feature cards lead with bot-to-bot project connect", () => {
    expect(MARKETING_FEATURE_ITEMS[0]?.title).toMatch(/Bot-to-bot/i);
    expect(MARKETING_FEATURE_ITEMS[0]?.body).toMatch(/list_project_peers/);
    expect(MARKETING_FEATURE_ITEMS[0]?.body).toMatch(/project_dispatch/);
    expect(MARKETING_FEATURE_ITEMS[0]?.body).toMatch(/leave_project/);
    expect(MARKETING_FEATURE_ITEMS[1]?.body).toMatch(/Left project/i);
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
    expect(body).toMatch(/prefer register_project_webhook|Inbox: prefer/i);
    expect(body).toMatch(/aw_ required|require aw_/i);
    expect(body).toMatch(/not on awc_proj_ allowlist/);
    expect(body).toMatch(/thin protocol metadata|no media\/blobs/i);
    expect(body).toMatch(/leave_project/);
    expect(body).toMatch(/Dual-Bearer|awc_proj_/i);
  });
});
