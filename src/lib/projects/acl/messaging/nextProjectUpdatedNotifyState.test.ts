import { describe, expect, it } from "vitest";

import { nextProjectUpdatedNotifyState } from "@/lib/projects/acl/messaging/nextProjectUpdatedNotifyState";
import {
  PROJECT_UPDATED_NOTIFY_STATES,
  PROJECT_UPDATED_NOTIFY_TRANSITIONS,
} from "@/lib/projects/acl/messaging/projectUpdatedNotifyStateMachine";

describe("nextProjectUpdatedNotifyState", () => {
  it("names idle → pending → flushed → idle", () => {
    expect(PROJECT_UPDATED_NOTIFY_STATES).toEqual([
      "idle",
      "pending",
      "flushed",
    ]);
    expect(nextProjectUpdatedNotifyState("idle", "schedule")).toEqual({
      ok: true,
      state: "pending",
    });
    expect(nextProjectUpdatedNotifyState("pending", "schedule")).toEqual({
      ok: true,
      state: "pending",
    });
    expect(nextProjectUpdatedNotifyState("pending", "flush_due")).toEqual({
      ok: true,
      state: "flushed",
    });
    expect(nextProjectUpdatedNotifyState("flushed", "notify_done")).toEqual({
      ok: true,
      state: "idle",
    });
  });

  it("rejects illegal transitions", () => {
    expect(nextProjectUpdatedNotifyState("idle", "flush_due")).toEqual({
      ok: false,
      from: "idle",
      event: "flush_due",
    });
    expect(nextProjectUpdatedNotifyState("flushed", "flush_due")).toEqual({
      ok: false,
      from: "flushed",
      event: "flush_due",
    });
    expect(PROJECT_UPDATED_NOTIFY_TRANSITIONS.idle.flush_due).toBeUndefined();
  });
});
