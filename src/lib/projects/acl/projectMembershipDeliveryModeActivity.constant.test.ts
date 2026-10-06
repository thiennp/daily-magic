import { describe, expect, it } from "vitest";

import { formatProjectDeliveryModeActivity } from "@/lib/projects/acl/projectMembershipDeliveryModeActivity.constant";
import { PROJECT_ACCESS_ERROR_MESSAGES } from "@/lib/projects/acl/projectAccessErrorMessages.constant";

describe("delivery_mode Activity + error copy (Product EN S5)", () => {
  it("member self-switch to wake reads '{name} now wakes up on its own'", () => {
    expect(
      formatProjectDeliveryModeActivity({
        by: "member",
        deliveryMode: "webhook",
        name: "Muse",
      }),
    ).toBe("Muse now wakes up on its own");
    expect(
      formatProjectDeliveryModeActivity({
        by: "member",
        deliveryMode: "webhook",
        name: null,
      }),
    ).toBe("This assistant now wakes up on its own");
  });

  it("invalid_delivery_mode raw API copy has no unfilled {name}", () => {
    expect(PROJECT_ACCESS_ERROR_MESSAGES.invalid_delivery_mode).toBe(
      "Choose how this assistant gets messages.",
    );
    // Server errorMessage is never name-filled; no placeholder may leak.
    for (const message of Object.values(PROJECT_ACCESS_ERROR_MESSAGES)) {
      expect(message).not.toContain("{name}");
    }
  });
});
