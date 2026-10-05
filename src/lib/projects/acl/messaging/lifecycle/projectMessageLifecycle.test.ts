import { describe, expect, it } from "vitest";

import {
  isProjectMessageRead,
  isProjectMessageReadyToLeaveRead,
  isProjectMessageVisibleInUnreadInbox,
} from "@/lib/projects/acl/messaging/lifecycle/isProjectMessageRead";
import { nextProjectMessageLifecycleState } from "@/lib/projects/acl/messaging/lifecycle/nextProjectMessageLifecycleState";
import {
  PROJECT_MESSAGE_LIFECYCLE_ARROWS,
  PROJECT_MESSAGE_LIFECYCLE_STATES,
} from "@/lib/projects/acl/messaging/lifecycle/projectMessageLifecycle.constants";

const READ_AT = "2026-10-05T08:00:00.000Z";

describe("project message lifecycle states", () => {
  it("has exactly READ and SAVED_TO_PROJECT_FOLDER", () => {
    expect(PROJECT_MESSAGE_LIFECYCLE_STATES).toEqual([
      "READ",
      "SAVED_TO_PROJECT_FOLDER",
    ]);
  });

  it("READ predicate and unread inbox filter are complements", () => {
    expect(isProjectMessageRead({ readAt: null })).toBe(false);
    expect(isProjectMessageVisibleInUnreadInbox({ readAt: null })).toBe(true);
    expect(isProjectMessageRead({ readAt: READ_AT })).toBe(true);
    expect(isProjectMessageRead({ readAt: new Date(READ_AT) })).toBe(true);
    expect(isProjectMessageVisibleInUnreadInbox({ readAt: READ_AT })).toBe(
      false,
    );
  });

  it("DOR readiness wraps delete-on-read rules", () => {
    const base = { deliveryStates: ["done"], kind: "task.assign" } as const;
    expect(isProjectMessageReadyToLeaveRead({ ...base, readAt: null })).toBe(
      false,
    );
    expect(isProjectMessageReadyToLeaveRead({ ...base, readAt: READ_AT })).toBe(
      true,
    );
    expect(
      isProjectMessageReadyToLeaveRead({
        readAt: READ_AT,
        deliveryStates: [null],
        kind: "task.assign",
      }),
    ).toBe(false);
  });
});

describe("project message lifecycle arrows", () => {
  it("names owners per arrow", () => {
    expect(PROJECT_MESSAGE_LIFECYCLE_ARROWS.markRead.owner).toBe("dispatch");
    expect(PROJECT_MESSAGE_LIFECYCLE_ARROWS.saveToProjectFolder.owner).toBe(
      "history",
    );
    expect(PROJECT_MESSAGE_LIFECYCLE_ARROWS.deleteFromCloud.owner).toBe(
      "dispatch",
    );
  });

  it("walks unread → READ → SAVED → deleted", () => {
    expect(nextProjectMessageLifecycleState(null, "markRead")).toEqual({
      ok: true,
      state: "READ",
    });
    expect(
      nextProjectMessageLifecycleState("READ", "saveToProjectFolder"),
    ).toEqual({ ok: true, state: "SAVED_TO_PROJECT_FOLDER" });
    expect(
      nextProjectMessageLifecycleState(
        "SAVED_TO_PROJECT_FOLDER",
        "deleteFromCloud",
      ),
    ).toEqual({ ok: true, state: null });
  });

  it("rejects illegal arrows", () => {
    expect(nextProjectMessageLifecycleState("READ", "markRead")).toEqual({
      ok: false,
      from: "READ",
      arrow: "markRead",
    });
    expect(nextProjectMessageLifecycleState(null, "deleteFromCloud").ok).toBe(
      false,
    );
    expect(
      nextProjectMessageLifecycleState(
        "SAVED_TO_PROJECT_FOLDER",
        "saveToProjectFolder",
      ).ok,
    ).toBe(false);
  });
});
