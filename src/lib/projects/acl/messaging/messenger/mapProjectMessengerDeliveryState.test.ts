import { describe, expect, it } from "vitest";

import { mapProjectMessengerDeliveryState } from "@/lib/projects/acl/messaging/messenger/mapProjectMessengerDeliveryState";

const map = (
  b2bState: string | null,
  latestReplyKind: string | null = null,
  needsReply = true,
) =>
  mapProjectMessengerDeliveryState({ b2bState, latestReplyKind, needsReply });

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
});
