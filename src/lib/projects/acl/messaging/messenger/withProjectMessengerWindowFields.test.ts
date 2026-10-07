import { describe, expect, it } from "vitest";

import { mapAgentRunToMessengerTimelineEntry } from "@/lib/projects/acl/messaging/messenger/mapAgentRunToMessengerTimelineEntry";
import type { ProjectMessengerTimelineEntry } from "@/lib/projects/acl/messaging/messenger/projectMessenger.type";
import { withProjectMessengerWindowFields as decorate } from "@/lib/projects/acl/messaging/messenger/withProjectMessengerWindowFields";

const base: ProjectMessengerTimelineEntry = {
  messageId: "m1",
  createdAt: "2026-10-07T20:00:00.000Z",
  author: { kind: "bot", membershipId: "b1", displayName: "Planner" },
  kind: "chat.note",
  text: "hello",
  needsReply: false,
  inReplyTo: null,
  states: [],
};

describe("withProjectMessengerWindowFields (OW9)", () => {
  it("adds windowKind + subjectState and keeps every existing field", () => {
    const out = decorate({ ...base, kind: "task.done" });
    expect(out).toEqual({
      ...base,
      kind: "task.done",
      windowKind: "task_update",
      subjectState: {
        source: "reply_kind",
        status: "done",
        needsYou: false,
        awaitingApproval: false,
      },
    });
  });

  it("chat row: windowKind chat, subjectState null", () => {
    expect(decorate(base)).toMatchObject({
      windowKind: "chat",
      subjectState: null,
    });
  });

  it("AI session row is a task with the live run status", () => {
    const run = mapAgentRunToMessengerTimelineEntry({
      id: "r1",
      createdAt: base.createdAt,
      status: "running",
      writerAgent: "cursor",
      prompt: "fix it",
    });
    expect(decorate(run)).toMatchObject({
      windowKind: "task",
      subjectState: {
        source: "agent_run",
        status: "running",
        awaitingApproval: false,
      },
    });
  });

  it("keeps a windowKind the row already carries (local AWL page)", () => {
    expect(decorate({ ...base, windowKind: "notice" }).windowKind).toBe(
      "notice",
    );
  });

  it("adds no body or text field beyond the row's own", () => {
    const keys = Object.keys(decorate(base)).sort();
    expect(keys).toEqual(
      [...Object.keys(base), "subjectState", "windowKind"].sort(),
    );
  });
});
