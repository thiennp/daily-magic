import { describe, expect, it } from "vitest";

import { isCloudDeleteAllowedFromLifecycleState } from "@/lib/projects/acl/messaging/lifecycle/isCloudDeleteAllowedFromLifecycleState";
import {
  PROJECT_MESSAGE_CLOUD_DELETE_REQUIRES_FOLDER_ACK_WHEN_HISTORY_ON,
  PROJECT_MESSAGE_LIFECYCLE_ARROWS,
} from "@/lib/projects/acl/messaging/lifecycle/projectMessageLifecycle.constants";

const AGE_OR_TIMEOUT = /age|7d|day|timeout|expire|stale|ttl/i;

describe("cloud delete requires folder ack when History is on", () => {
  it("encodes the Lead rule as a constant", () => {
    expect(
      PROJECT_MESSAGE_CLOUD_DELETE_REQUIRES_FOLDER_ACK_WHEN_HISTORY_ON,
    ).toBe(true);
  });

  it("has no age/7d/timeout arrow in the transition table", () => {
    const names = Object.keys(PROJECT_MESSAGE_LIFECYCLE_ARROWS);
    expect(names.filter((name) => AGE_OR_TIMEOUT.test(name))).toEqual([]);
  });

  it("only deleteFromCloud leaves the cloud, and only from SAVED", () => {
    const exits = Object.entries(PROJECT_MESSAGE_LIFECYCLE_ARROWS).filter(
      ([, spec]) => spec.to === null,
    );
    expect(exits.map(([name, spec]) => [name, spec.from])).toEqual([
      ["deleteFromCloud", "SAVED_TO_PROJECT_FOLDER"],
    ]);
  });

  it.each(["on_configuring", "on_ready", "degraded"] as const)(
    "History %s: SAVED only, READ/unread never",
    (mode) => {
      expect(
        isCloudDeleteAllowedFromLifecycleState("SAVED_TO_PROJECT_FOLDER", mode),
      ).toBe(true);
      expect(isCloudDeleteAllowedFromLifecycleState("READ", mode)).toBe(false);
      expect(isCloudDeleteAllowedFromLifecycleState(null, mode)).toBe(false);
    },
  );

  it("History off: OFF-only exception allows READ, never unread", () => {
    expect(isCloudDeleteAllowedFromLifecycleState("READ", "off")).toBe(true);
    expect(
      isCloudDeleteAllowedFromLifecycleState("SAVED_TO_PROJECT_FOLDER", "off"),
    ).toBe(true);
    expect(isCloudDeleteAllowedFromLifecycleState(null, "off")).toBe(false);
  });
});
