import { describe, expect, it } from "vitest";

import { deriveProjectMessengerBotStatus } from "@/lib/projects/acl/messaging/messenger/deriveProjectMessengerBotStatus";

describe("deriveProjectMessengerBotStatus", () => {
  it("working when any delivery is processing or status_reporting", () => {
    expect(
      deriveProjectMessengerBotStatus({
        states: ["blocked_silent_10m", "status_reporting"],
        latestWakeResult: "fetch_failed",
      }),
    ).toBe("working");
  });

  it("silent when the newest watched delivery hit the 10-minute block", () => {
    expect(
      deriveProjectMessengerBotStatus({
        states: [null, "blocked_silent_10m", "done"],
        latestWakeResult: "http_200",
      }),
    ).toBe("silent");
  });

  it("silent when the last wake failed", () => {
    expect(
      deriveProjectMessengerBotStatus({
        states: ["done"],
        latestWakeResult: "http_500",
      }),
    ).toBe("silent");
  });

  it("idle otherwise (a later done after an old block)", () => {
    expect(
      deriveProjectMessengerBotStatus({
        states: ["done", "blocked_silent_10m"],
        latestWakeResult: "http_200",
      }),
    ).toBe("idle");
    expect(
      deriveProjectMessengerBotStatus({ states: [], latestWakeResult: null }),
    ).toBe("idle");
  });

  it("poll-mode waiting deliveries show Checks on demand (no silent)", () => {
    expect(
      deriveProjectMessengerBotStatus({
        states: ["awaiting_first_activity"],
        latestWakeResult: "fetch_failed",
        deliveryMode: "poll",
      }),
    ).toBe("checks_on_demand");
    expect(
      deriveProjectMessengerBotStatus({
        states: ["blocked_silent_10m"],
        latestWakeResult: "http_500",
        deliveryMode: "poll",
      }),
    ).toBe("checks_on_demand");
    expect(
      deriveProjectMessengerBotStatus({
        states: ["done"],
        latestWakeResult: "http_500",
        deliveryMode: "poll",
      }),
    ).toBe("idle");
  });

  it("webhook-mode silence path unchanged", () => {
    expect(
      deriveProjectMessengerBotStatus({
        states: ["blocked_silent_10m"],
        latestWakeResult: "http_200",
        deliveryMode: "webhook",
      }),
    ).toBe("silent");
  });
});
