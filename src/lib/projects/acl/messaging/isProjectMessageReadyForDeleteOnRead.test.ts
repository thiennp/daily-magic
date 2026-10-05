import { describe, expect, it } from "vitest";

import {
  areDeliveriesTerminalForDeleteOnRead,
  isDeliveryReadyForDeleteOnRead,
  isProjectMessageReadyForDeleteOnRead,
} from "@/lib/projects/acl/messaging/isProjectMessageReadyForDeleteOnRead";

describe("isProjectMessageReadyForDeleteOnRead", () => {
  it("rejects unread rows", () => {
    expect(
      isProjectMessageReadyForDeleteOnRead({
        readAt: null,
        deliveryStates: ["done"],
        kind: "task.assign",
      }),
    ).toBe(false);
  });

  it("allows actionable read + terminal", () => {
    expect(
      isProjectMessageReadyForDeleteOnRead({
        readAt: "2026-10-05T08:00:00.000Z",
        deliveryStates: ["done"],
        kind: "task.assign",
      }),
    ).toBe(true);
    expect(
      isProjectMessageReadyForDeleteOnRead({
        readAt: new Date("2026-10-05T08:00:00.000Z"),
        deliveryStates: ["blocked", "blocked_silent_10m"],
        kind: "task.processing",
      }),
    ).toBe(true);
  });

  it("rejects listed-but-unacked task.* with read + null b2b", () => {
    expect(
      isProjectMessageReadyForDeleteOnRead({
        readAt: "2026-10-05T08:00:00.000Z",
        deliveryStates: [null],
        kind: "task.assign",
      }),
    ).toBe(false);
    expect(
      isProjectMessageReadyForDeleteOnRead({
        readAt: "2026-10-05T08:00:00.000Z",
        deliveryStates: [],
        kind: "task.status",
      }),
    ).toBe(false);
  });

  it("allows peer.joined / peer.silent with read + unwatched", () => {
    expect(
      isProjectMessageReadyForDeleteOnRead({
        readAt: "2026-10-05T08:00:00.000Z",
        deliveryStates: [null],
        kind: "peer.joined",
      }),
    ).toBe(true);
    expect(
      isProjectMessageReadyForDeleteOnRead({
        readAt: "2026-10-05T08:00:00.000Z",
        deliveryStates: [],
        kind: "peer.silent",
      }),
    ).toBe(true);
    expect(
      isProjectMessageReadyForDeleteOnRead({
        readAt: "2026-10-05T08:00:00.000Z",
        deliveryStates: [null],
        kind: "peer.silent_blocked",
      }),
    ).toBe(true);
  });

  it("keeps blocked/timeout terminal DOR for actionable", () => {
    expect(
      isProjectMessageReadyForDeleteOnRead({
        readAt: "2026-10-05T08:00:00.000Z",
        deliveryStates: ["blocked_silent_10m"],
        kind: "task.assign",
      }),
    ).toBe(true);
  });

  it("skips read + still-watched states", () => {
    expect(
      isProjectMessageReadyForDeleteOnRead({
        readAt: "2026-10-05T08:00:00.000Z",
        deliveryStates: ["processing"],
        kind: "peer.joined",
      }),
    ).toBe(false);
    expect(
      isProjectMessageReadyForDeleteOnRead({
        readAt: "2026-10-05T08:00:00.000Z",
        deliveryStates: ["done", "awaiting_first_activity"],
        kind: "task.assign",
      }),
    ).toBe(false);
  });

  it("delivery helpers: null unwatched; all must be terminal", () => {
    expect(isDeliveryReadyForDeleteOnRead(null)).toBe(true);
    expect(isDeliveryReadyForDeleteOnRead("dispatched")).toBe(false);
    expect(areDeliveriesTerminalForDeleteOnRead([])).toBe(false);
    expect(areDeliveriesTerminalForDeleteOnRead([null])).toBe(false);
    expect(areDeliveriesTerminalForDeleteOnRead(["done"])).toBe(true);
    expect(areDeliveriesTerminalForDeleteOnRead(["done", null])).toBe(false);
  });
});
