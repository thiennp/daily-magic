import { describe, expect, it } from "vitest";

import { nextProjectB2bState } from "@/lib/projects/acl/messaging/nextProjectB2bState";
import {
  PROJECT_B2B_STATES,
  PROJECT_B2B_TRANSITIONS,
  type ProjectB2bEvent,
  type ProjectB2bState,
} from "@/lib/projects/acl/messaging/projectB2bStateMachine";

const legal: readonly [ProjectB2bState, ProjectB2bEvent, ProjectB2bState][] = [
  ["dispatched", "wake_accepted", "woken"],
  ["woken", "watch_started", "awaiting_first_activity"],
  ["awaiting_first_activity", "received", "received"],
  ["awaiting_first_activity", "processing", "processing"],
  ["awaiting_first_activity", "timeout_5m", "silent_5m_notified"],
  ["silent_5m_notified", "status", "status_reporting"],
  ["silent_5m_notified", "done", "done"],
  ["silent_5m_notified", "timeout_10m", "blocked_silent_10m"],
  ["received", "processing", "processing"],
  ["processing", "status", "status_reporting"],
  ["status_reporting", "status", "status_reporting"],
  ["status_reporting", "done", "done"],
  ["status_reporting", "blocked", "blocked"],
  ["done", "ack", "acked"],
  ["blocked", "ack", "acked"],
];

const illegal: readonly [ProjectB2bState, ProjectB2bEvent][] = [
  ["dispatched", "timeout_5m"],
  ["awaiting_first_activity", "timeout_10m"],
  ["silent_5m_notified", "timeout_5m"],
  ["blocked_silent_10m", "timeout_10m"],
  ["blocked_silent_10m", "status"],
  ["blocked_silent_10m", "received"],
  ["blocked_silent_10m", "processing"],
  ["blocked_silent_10m", "done"],
  ["blocked_silent_10m", "blocked"],
  ["blocked_silent_10m", "ack"],
  ["processing", "received"],
  ["processing", "timeout_5m"],
  ["status_reporting", "timeout_10m"],
  ["done", "status"],
  ["woken", "wake_accepted"],
];

describe("nextProjectB2bState", () => {
  it.each(legal)("%s --%s--> %s", (from, event, to) => {
    expect(nextProjectB2bState(from, event)).toEqual({ ok: true, state: to });
  });

  it.each(illegal)("rejects %s --%s-->", (from, event) => {
    expect(nextProjectB2bState(from, event)).toEqual({
      ok: false,
      from,
      event,
    });
  });

  it("keeps acked and blocked_silent_10m terminal", () => {
    for (const state of ["acked", "blocked_silent_10m"] as const) {
      expect(PROJECT_B2B_TRANSITIONS[state]).toEqual({});
    }
  });

  it("lets B return to the normal path after the 5 minute notice", () => {
    for (const event of ["received", "processing", "status", "done"] as const) {
      expect(nextProjectB2bState("silent_5m_notified", event).ok).toBe(true);
    }
  });

  it("lets every non-terminal state ack", () => {
    const terminal: readonly ProjectB2bState[] = ["acked", "blocked_silent_10m"];
    for (const state of PROJECT_B2B_STATES.filter((s) => !terminal.includes(s))) {
      expect(nextProjectB2bState(state, "ack")).toEqual({
        ok: true,
        state: "acked",
      });
    }
  });
});
