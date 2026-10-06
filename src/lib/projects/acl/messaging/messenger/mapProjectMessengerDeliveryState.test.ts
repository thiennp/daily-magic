import { describe, expect, it } from "vitest";

import { mapProjectMessengerDeliveryState } from "@/lib/projects/acl/messaging/messenger/mapProjectMessengerDeliveryState";

const map = (
  b2bState: string | null,
  latestReplyKind: string | null = null,
  needsReply = true,
  deliveryMode: "webhook" | "poll" = "webhook",
) =>
  mapProjectMessengerDeliveryState({
    b2bState,
    latestReplyKind,
    needsReply,
    deliveryMode,
  });

describe("mapProjectMessengerDeliveryState", () => {
  it.each([
    ["dispatched", "received"],
    ["awaiting_first_activity", "waiting"],
    ["silent_5m_notified", "waiting"],
    ["processing", "working"],
    ["status_reporting", "working"],
    ["done", "done"],
    ["blocked", "blocked"],
    ["blocked_silent_10m", "no_answer"],
    ["acked", "got_it"],
  ])("existing state %s → %s", (state, expected) => {
    expect(map(state, null, false)).toBe(expected);
  });

  it("task.received in processing reads Got it; later status reads Working on it", () => {
    expect(map("processing", "task.received")).toBe("got_it");
    expect(map("processing", "task.status")).toBe("working");
  });

  it("No answer — blocked is final even when a late reply is linked", () => {
    expect(map("blocked_silent_10m", "task.done")).toBe("no_answer");
  });

  it("unwatched rows follow the linked reply, else waiting / received", () => {
    expect(map(null, "task.done")).toBe("done");
    expect(map(null, null, true)).toBe("waiting");
    expect(map(null, null, false)).toBe("received");
    expect(map("dispatched", "task.received")).toBe("got_it");
    expect(map("dispatched", null, true)).toBe("waiting");
  });

  it("poll-mode maps waiting/no_answer to Checks on demand", () => {
    expect(map("awaiting_first_activity", null, true, "poll")).toBe(
      "checks_on_demand",
    );
    expect(map("silent_5m_notified", null, true, "poll")).toBe(
      "checks_on_demand",
    );
    expect(map("blocked_silent_10m", null, true, "poll")).toBe(
      "checks_on_demand",
    );
    expect(map("processing", "task.status", true, "poll")).toBe("working");
  });

  it("webhook-mode keeps waiting and no_answer", () => {
    expect(map("awaiting_first_activity", null, true, "webhook")).toBe(
      "waiting",
    );
    expect(map("blocked_silent_10m", null, true, "webhook")).toBe("no_answer");
  });
});
