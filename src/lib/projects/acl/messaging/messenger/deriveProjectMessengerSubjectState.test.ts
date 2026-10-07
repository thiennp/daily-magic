import { describe, expect, it } from "vitest";

import { deriveProjectMessengerSubjectState as derive } from "@/lib/projects/acl/messaging/messenger/deriveProjectMessengerSubjectState";
import type {
  ProjectMessengerMessageState,
  ProjectMessengerTimelineEntry,
} from "@/lib/projects/acl/messaging/messenger/projectMessenger.type";

const entry = (
  over: Partial<ProjectMessengerTimelineEntry>,
): ProjectMessengerTimelineEntry => ({
  messageId: "m1",
  createdAt: "2026-10-07T20:00:00.000Z",
  author: { kind: "owner", membershipId: null, displayName: null },
  kind: "task.assign",
  text: "t",
  needsReply: true,
  inReplyTo: null,
  states: [],
  ...over,
});

const chip = (membershipId: string, state: ProjectMessengerMessageState) => ({
  membershipId,
  displayName: null,
  state,
  reason: null,
});

describe("deriveProjectMessengerSubjectState (OW9)", () => {
  it("task row: worst delivery state first, done/of over recipients", () => {
    const states = [
      chip("a", "done"),
      chip("b", "blocked"),
      chip("c", "working"),
    ];
    expect(derive(entry({ states }), "task")).toEqual({
      source: "deliveries",
      status: "blocked",
      done: 1,
      of: 3,
      needsYou: true,
      awaitingApproval: false,
    });
  });

  it("task row with no deliveries has no subject state", () => {
    expect(derive(entry({}), "task")).toBeNull();
  });

  it("AI session row reads agent_runs.status; pending_approval needs you", () => {
    const session = {
      status: "pending_approval",
      writerAgent: null,
      agentRunId: "r1",
    };
    expect(derive(entry({ kind: "ai.session", session }), "task")).toEqual({
      source: "agent_run",
      status: "pending_approval",
      needsYou: true,
      awaitingApproval: true,
    });
  });

  it("task_update: done / blocked only", () => {
    const bot = { kind: "bot" as const, membershipId: "b", displayName: null };
    expect(
      derive(entry({ author: bot, kind: "task.done" }), "task_update"),
    ).toMatchObject({
      source: "reply_kind",
      status: "done",
      needsYou: false,
    });
    expect(
      derive(entry({ author: bot, kind: "task.blocked" }), "task_update"),
    ).toMatchObject({
      status: "blocked",
      needsYou: true,
    });
    expect(
      derive(entry({ author: bot, kind: "task.status" }), "task_update"),
    ).toBeNull();
  });

  it("chat rows have none", () => {
    expect(derive(entry({ kind: "chat.note" }), "chat")).toBeNull();
  });
});
