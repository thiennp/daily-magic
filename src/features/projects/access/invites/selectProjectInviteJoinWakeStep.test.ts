import { describe, expect, it } from "vitest";

import { buildProjectInviteJoinMuseWebhookStep } from "@/features/projects/access/invites/buildProjectInviteJoinMuseWebhookStep";
import { buildProjectInviteJoinWakeWebhookStep } from "@/features/projects/access/invites/buildProjectInviteJoinWakeWebhookStep";
import type { ProjectInvitePlatform } from "@/features/projects/access/invites/projectInvitePlatform.type";
import { selectProjectInviteJoinWakeStep } from "@/features/projects/access/invites/selectProjectInviteJoinWakeStep";

describe("selectProjectInviteJoinWakeStep", () => {
  it("returns the Grok routine step 7 for grok", () => {
    expect(selectProjectInviteJoinWakeStep("grok")).toBe(
      buildProjectInviteJoinWakeWebhookStep,
    );
  });

  it("returns the Muse HMAC step 7 for muse", () => {
    expect(selectProjectInviteJoinWakeStep("muse")).toBe(
      buildProjectInviteJoinMuseWebhookStep,
    );
  });

  it("defaults to Grok when no platform is given", () => {
    expect(selectProjectInviteJoinWakeStep()).toBe(
      buildProjectInviteJoinWakeWebhookStep,
    );
  });

  it("falls back to Grok for an unknown value from untyped callers", () => {
    expect(
      selectProjectInviteJoinWakeStep("other" as ProjectInvitePlatform),
    ).toBe(buildProjectInviteJoinWakeWebhookStep);
  });
});
