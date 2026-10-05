import { describe, expect, it } from "vitest";

import { nextProjectUpdatedNotifyState } from "@/lib/projects/acl/messaging/nextProjectUpdatedNotifyState";
import {
  PROJECT_UPDATED_NOTIFY_STATES,
  PROJECT_UPDATED_NOTIFY_TRANSITIONS,
} from "@/lib/projects/acl/messaging/projectUpdatedNotifyStateMachine";

describe("nextProjectUpdatedNotifyState", () => {
  it("keeps flushed FSA: idle → pending → flushed → idle", () => {
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
    expect(nextProjectUpdatedNotifyState("flushed", "schedule")).toEqual({
      ok: true,
      state: "pending",
    });
    expect(nextProjectUpdatedNotifyState("flushed", "reclaim_stale")).toEqual({
      ok: true,
      state: "pending",
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
    expect(nextProjectUpdatedNotifyState("idle", "reclaim_stale")).toEqual({
      ok: false,
      from: "idle",
      event: "reclaim_stale",
    });
    expect(PROJECT_UPDATED_NOTIFY_TRANSITIONS.idle.flush_due).toBeUndefined();
  });
});
