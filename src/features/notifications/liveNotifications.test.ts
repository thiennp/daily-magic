import { describe, expect, it } from "vitest";

import {
  joinNotificationId,
  mapJoinRequest,
  mapRunApproval,
  parseNotificationId,
  runNotificationId,
} from "@/features/notifications/liveNotifications";

const project = { id: "p1", name: "baby-care" };
const NOW = Date.parse("2026-10-09T12:00:00Z");

describe("notification ids", () => {
  it("round-trip project and target", () => {
    expect(parseNotificationId(joinNotificationId("p1", "r9"))).toEqual({
      kind: "join",
      projectId: "p1",
      targetId: "r9",
    });
    expect(parseNotificationId(runNotificationId("p1", "run7"))?.kind).toBe(
      "run",
    );
    expect(parseNotificationId("bogus")).toBeNull();
  });
});

describe("mapJoinRequest", () => {
  it("maps an assistant request and flags expired ones as timeout", () => {
    const item = mapJoinRequest(
      project,
      {
        id: "r1",
        requesterIsAgent: true,
        requesterLabel: "Claude",
        requestedScopes: [],
        reason: null,
        createdAt: "2026-10-09T11:00:00Z",
        suggestedProjectDisplayName: null,
        approvalCard: { ownerPersonName: "Thien", isExpired: true },
      },
      { unread: true, nowMs: NOW },
    );
    expect(item).toMatchObject({
      kind: "join",
      who: "Claude",
      whoKind: "assistant",
      project: "baby-care",
      owner: "Thien",
      state: "timeout",
      unread: true,
    });
  });

  it("names unnamed people 'Someone'", () => {
    const item = mapJoinRequest(
      project,
      {
        id: "r2",
        requesterIsAgent: false,
        requesterLabel: null,
        requestedScopes: [],
        reason: "hi",
        createdAt: "2026-10-09T11:59:00Z",
        suggestedProjectDisplayName: null,
      },
      { unread: false, nowMs: NOW },
    );
    expect(item).toMatchObject({
      who: "Someone",
      whoKind: "person",
      note: "hi",
    });
  });
});

describe("mapRunApproval", () => {
  it("uses the first prompt line and minutes left", () => {
    const item = mapRunApproval(
      project,
      {
        runId: "run1",
        requesterLabel: "Magi",
        prompt: "Fix the build\nmore detail",
        tool: "codex",
        computerName: "Grey - Check",
        approvalExpiresAt: "2026-10-09T12:20:00Z",
      },
      { unread: true, nowMs: NOW },
    );
    expect(item).toMatchObject({
      kind: "run",
      task: "Fix the build",
      computerLabel: "Grey - Check",
      minsLeft: 20,
      state: "pending",
    });
  });
});
