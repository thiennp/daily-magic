import { describe, expect, it } from "vitest";

import { classifyProjectMessageWindowKind as classify } from "@/lib/projects/acl/messaging/messenger/classifyProjectMessageWindowKind";
import type { ProjectMessengerTimelineEntry } from "@/lib/projects/acl/messaging/messenger/projectMessenger.type";
import { projectMessengerApprovalOf } from "@/lib/projects/acl/messaging/messenger/projectMessengerApprovalOf";
import { withProjectMessengerWindowFields } from "@/lib/projects/acl/messaging/messenger/withProjectMessengerWindowFields";

const RUN = "33333333-3333-4333-8333-333333333333";

const session = (status: string): ProjectMessengerTimelineEntry => ({
  messageId: `session-${RUN}`,
  createdAt: "2026-10-08T08:00:00.000Z",
  author: { kind: "owner", membershipId: null, displayName: "Owner" },
  kind: "ai.session",
  entryKind: "session",
  session: { status, writerAgent: "cursor", agentRunId: RUN },
  text: "Fix the login bug",
  needsReply: false,
  inReplyTo: null,
  states: [],
});

describe("approval rows (S5 item 4)", () => {
  it("run waiting for approval → approval_request + approvalId (run id)", () => {
    const row = withProjectMessengerWindowFields(session("pending_approval"));
    expect(row).toMatchObject({
      windowKind: "approval_request",
      approvalId: RUN,
      subjectState: { source: "agent_run", awaitingApproval: true },
    });
  });

  it("denied / expired run → approval_result; approved run stays task", () => {
    expect(projectMessengerApprovalOf(session("denied"))).toEqual({
      windowKind: "approval_result",
      approvalId: RUN,
    });
    expect(
      withProjectMessengerWindowFields(session("expired")).windowKind,
    ).toBe("approval_result");
    const running = withProjectMessengerWindowFields(session("running"));
    expect(running.windowKind).toBe("task");
    expect(running).not.toHaveProperty("approvalId");
  });

  it("reserved approval.* kinds classify and carry the run id from the summary", () => {
    expect(
      classify({
        kind: "approval.request",
        senderKind: "system",
        recipientKind: "owner",
      }),
    ).toBe("approval_request");
    expect(
      classify({
        kind: "approval.result",
        senderKind: "bot",
        recipientKind: "none",
      }),
    ).toBe("approval_result");
    const row = withProjectMessengerWindowFields({
      ...session("x"),
      session: undefined,
      entryKind: undefined,
      kind: "approval.request",
      author: { kind: "system", membershipId: null, displayName: null },
      inReplyTo: RUN,
    });
    expect(row).toMatchObject({
      windowKind: "approval_request",
      approvalId: RUN,
      subjectState: null,
    });
  });

  it("plain chat rows get no approvalId", () => {
    const row = withProjectMessengerWindowFields({
      ...session("x"),
      session: undefined,
      entryKind: undefined,
      kind: "chat.note",
    });
    expect(row.windowKind).toBe("chat");
    expect(row).not.toHaveProperty("approvalId");
  });
});
