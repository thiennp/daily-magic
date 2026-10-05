import { describe, expect, it } from "vitest";

import { nextProjectB2bState } from "@/lib/projects/acl/messaging/nextProjectB2bState";
import {
  PROJECT_B2B_SILENCE_CHECK_STATES,
  PROJECT_B2B_STATES,
  PROJECT_B2B_TRANSITIONS,
  type ProjectB2bEvent,
  type ProjectB2bState,
} from "@/lib/projects/acl/messaging/projectB2bStateMachine";

const legal: readonly [ProjectB2bState, ProjectB2bEvent, ProjectB2bState][] = [
  ["dispatched", "wake_accepted", "awaiting_first_activity"],
  ["awaiting_first_activity", "processing", "processing"],
  ["awaiting_first_activity", "status", "status_reporting"],
  ["awaiting_first_activity", "timeout_5m", "silent_5m_notified"],
  ["processing", "processing", "processing"],
  ["processing", "status", "status_reporting"],
  ["processing", "timeout_5m", "silent_5m_notified"],
  ["status_reporting", "status", "status_reporting"],
  ["status_reporting", "timeout_5m", "silent_5m_notified"],
  ["status_reporting", "done", "done"],
  ["status_reporting", "blocked", "blocked"],
  ["silent_5m_notified", "processing", "processing"],
  ["silent_5m_notified", "status", "status_reporting"],
  ["silent_5m_notified", "done", "done"],
  ["silent_5m_notified", "timeout_10m", "blocked_silent_10m"],
  ["done", "ack", "acked"],
  ["blocked", "ack", "acked"],
];

const illegal: readonly [ProjectB2bState, ProjectB2bEvent][] = [
  ["dispatched", "timeout_5m"],
  ["awaiting_first_activity", "timeout_10m"],
  ["processing", "timeout_10m"],
  ["status_reporting", "processing"],
  ["silent_5m_notified", "timeout_5m"],
  ["blocked_silent_10m", "processing"],
  ["blocked_silent_10m", "status"],
  ["blocked_silent_10m", "done"],
  ["blocked_silent_10m", "blocked"],
  ["blocked_silent_10m", "ack"],
  ["blocked_silent_10m", "timeout_10m"],
  ["done", "status"],
  ["done", "timeout_5m"],
  ["acked", "status"],
  ["awaiting_first_activity", "wake_accepted"],
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
    expect(PROJECT_B2B_TRANSITIONS.acked).toEqual({});
    expect(PROJECT_B2B_TRANSITIONS.blocked_silent_10m).toEqual({});
  });

  it("checks silence only in states with a timeout edge", () => {
    expect(PROJECT_B2B_SILENCE_CHECK_STATES).toEqual([
      "awaiting_first_activity",
      "silent_5m_notified",
      "processing",
      "status_reporting",
    ]);
  });

  it("lets every non-terminal state ack", () => {
    const terminal: readonly ProjectB2bState[] = [
      "acked",
      "blocked_silent_10m",
    ];
    for (const state of PROJECT_B2B_STATES.filter(
      (s) => !terminal.includes(s),
    )) {
      expect(nextProjectB2bState(state, "ack")).toEqual({
        ok: true,
        state: "acked",
      });
    }
  });
});
