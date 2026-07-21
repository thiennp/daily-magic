import { describe, expect, it } from "vitest";

import { resolveAgentLiveTerminalFeedbackAction } from "@/features/agent/utils/resolveAgentLiveTerminalFeedbackAction";

describe("resolveAgentLiveTerminalFeedbackAction", () => {
  it("returns noop for empty messages", () => {
    expect(
      resolveAgentLiveTerminalFeedbackAction({
        message: "   ",
        status: "streaming",
        connectionStatus: "connected",
        hasPendingInput: false,
        hasOpenSession: true,
      }),
    ).toEqual({ kind: "noop" });
  });

  it("answers pending input before other actions", () => {
    expect(
      resolveAgentLiveTerminalFeedbackAction({
        message: "yes",
        status: "streaming",
        connectionStatus: "connected",
        hasPendingInput: true,
        hasOpenSession: true,
      }),
    ).toEqual({ kind: "answer-input" });
  });

  it("queues feedback while the local terminal is working", () => {
    expect(
      resolveAgentLiveTerminalFeedbackAction({
        message: "also check Q3",
        status: "streaming",
        connectionStatus: "connected",
        hasPendingInput: false,
        hasOpenSession: true,
      }),
    ).toEqual({ kind: "queue-while-working" });
  });

  it("AGENT-050: steers immediately when preferred while working", () => {
    expect(
      resolveAgentLiveTerminalFeedbackAction({
        message: "focus on the API",
        status: "streaming",
        connectionStatus: "connected",
        hasPendingInput: false,
        hasOpenSession: true,
        preferredMode: "steer",
      }),
    ).toEqual({ kind: "send-follow-up" });
    expect(
      resolveAgentLiveTerminalFeedbackAction({
        message: "also check Q3",
        status: "streaming",
        connectionStatus: "connected",
        hasPendingInput: false,
        hasOpenSession: true,
        preferredMode: "queue",
      }),
    ).toEqual({ kind: "queue-while-working" });
  });

  it("sends follow-up when the session is ready", () => {
    expect(
      resolveAgentLiveTerminalFeedbackAction({
        message: "one more question",
        status: "finished",
        connectionStatus: "connected",
        hasPendingInput: false,
        hasOpenSession: true,
      }),
    ).toEqual({ kind: "send-follow-up" });
  });

  it("queues a run when the session is open but disconnected", () => {
    expect(
      resolveAgentLiveTerminalFeedbackAction({
        message: "retry this",
        status: "finished",
        connectionStatus: "disconnected",
        hasPendingInput: false,
        hasOpenSession: true,
      }),
    ).toEqual({ kind: "queue-run" });
  });
});
