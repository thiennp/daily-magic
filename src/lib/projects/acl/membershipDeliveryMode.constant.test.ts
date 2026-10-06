import { describe, expect, it } from "vitest";

import {
  isProjectMembershipPollDeliveryMode,
  parseProjectMembershipDeliveryMode,
  PROJECT_MEMBERSHIP_DELIVERY_MODE_POLL,
  PROJECT_MEMBERSHIP_DELIVERY_MODE_WEBHOOK,
  PROJECT_MEMBERSHIP_POLL_SILENCE_STATUS,
} from "@/lib/projects/acl/membershipDeliveryMode.constant";

describe("membershipDeliveryMode", () => {
  it("parses poll vs webhook (default webhook)", () => {
    expect(parseProjectMembershipDeliveryMode("poll")).toBe(
      PROJECT_MEMBERSHIP_DELIVERY_MODE_POLL,
    );
    expect(parseProjectMembershipDeliveryMode("webhook")).toBe(
      PROJECT_MEMBERSHIP_DELIVERY_MODE_WEBHOOK,
    );
    expect(parseProjectMembershipDeliveryMode(null)).toBe(
      PROJECT_MEMBERSHIP_DELIVERY_MODE_WEBHOOK,
    );
    expect(parseProjectMembershipDeliveryMode("no_wake")).toBe(
      PROJECT_MEMBERSHIP_DELIVERY_MODE_WEBHOOK,
    );
  });

  it("detects poll mode for S5 silence skip", () => {
    expect(isProjectMembershipPollDeliveryMode("poll")).toBe(true);
    expect(isProjectMembershipPollDeliveryMode("webhook")).toBe(false);
  });

  it("locks sender-facing poll silence honesty copy", () => {
    expect(PROJECT_MEMBERSHIP_POLL_SILENCE_STATUS).toBe("Checks on demand");
  });
});
