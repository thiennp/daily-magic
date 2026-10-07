import { describe, expect, it } from "vitest";

import {
  PROJECT_BRIEFING_HOW_TO_DISPATCH,
  PROJECT_BRIEFING_VIEWER_READ_ONLY,
} from "@/lib/projects/acl/projectBriefingHowToDispatch.constant";
import { PROJECT_BRIEFING_HOW_TO_DISPATCH_POLL } from "@/lib/projects/acl/projectBriefingPollDelivery.constant";
import { selectProjectBriefingHowToDispatch } from "@/lib/projects/acl/selectProjectBriefingHowToDispatch";

describe("selectProjectBriefingHowToDispatch delivery_mode", () => {
  it("poll members get the on-demand briefing; webhook/default keep the wake one", () => {
    expect(selectProjectBriefingHowToDispatch("member", "poll")).toBe(
      PROJECT_BRIEFING_HOW_TO_DISPATCH_POLL,
    );
    expect(selectProjectBriefingHowToDispatch("member", "webhook")).toBe(
      PROJECT_BRIEFING_HOW_TO_DISPATCH,
    );
    expect(selectProjectBriefingHowToDispatch("member")).toBe(
      PROJECT_BRIEFING_HOW_TO_DISPATCH,
    );
    expect(selectProjectBriefingHowToDispatch("viewer", "poll")).toBe(
      PROJECT_BRIEFING_VIEWER_READ_ONLY,
    );
  });

  it("poll briefing: Checks on demand, soft ≤1/min, no wake MUST or silence warning", () => {
    const text = PROJECT_BRIEFING_HOW_TO_DISPATCH_POLL;
    expect(text).toContain("Checks on demand");
    expect(text).toContain("at most about once a minute");
    expect(text).toContain("AWC never wakes you");
    expect(text).toContain("MUST ack_project_message");
    expect(text).not.toMatch(/MUST on connect \(webhook-first\)/);
    expect(text).not.toMatch(/after 10 minutes the delivery is blocked/);
  });
});
