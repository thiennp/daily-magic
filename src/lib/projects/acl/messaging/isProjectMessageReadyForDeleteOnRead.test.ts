import { describe, expect, it } from "vitest";

import {
  isDeliveryReadyForDeleteOnRead,
  isProjectMessageReadyForDeleteOnRead,
} from "@/lib/projects/acl/messaging/isProjectMessageReadyForDeleteOnRead";

describe("isProjectMessageReadyForDeleteOnRead", () => {
  it("rejects unread rows", () => {
    expect(
      isProjectMessageReadyForDeleteOnRead({
        readAt: null,
        deliveryStates: ["done"],
      }),
    ).toBe(false);
  });

  it("allows read + terminal", () => {
    expect(
      isProjectMessageReadyForDeleteOnRead({
        readAt: "2026-10-05T08:00:00.000Z",
        deliveryStates: ["done"],
      }),
    ).toBe(true);
    expect(
      isProjectMessageReadyForDeleteOnRead({
        readAt: new Date("2026-10-05T08:00:00.000Z"),
        deliveryStates: ["blocked", "blocked_silent_10m"],
      }),
    ).toBe(true);
  });

  it("allows read + unwatched (null or no deliveries)", () => {
    expect(
      isProjectMessageReadyForDeleteOnRead({
        readAt: "2026-10-05T08:00:00.000Z",
        deliveryStates: [null],
      }),
    ).toBe(true);
    expect(
      isProjectMessageReadyForDeleteOnRead({
        readAt: "2026-10-05T08:00:00.000Z",
        deliveryStates: [],
      }),
    ).toBe(true);
  });

  it("skips read + still-watched states", () => {
    expect(
      isProjectMessageReadyForDeleteOnRead({
        readAt: "2026-10-05T08:00:00.000Z",
        deliveryStates: ["processing"],
      }),
    ).toBe(false);
    expect(
      isProjectMessageReadyForDeleteOnRead({
        readAt: "2026-10-05T08:00:00.000Z",
        deliveryStates: ["done", "awaiting_first_activity"],
      }),
    ).toBe(false);
  });

  it("treats null delivery state as unwatched", () => {
    expect(isDeliveryReadyForDeleteOnRead(null)).toBe(true);
    expect(isDeliveryReadyForDeleteOnRead("dispatched")).toBe(false);
  });
});
