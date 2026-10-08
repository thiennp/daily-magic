import { describe, expect, it } from "vitest";

import {
  AGENT_WITCH_BUNDLE_RESTART_MAX_WAIT_MS,
  shouldRestartForBundleUpdateNow,
} from "./agentWitchBundleRestartGate";

describe("shouldRestartForBundleUpdateNow", () => {
  it("restarts immediately when idle", () => {
    expect(
      shouldRestartForBundleUpdateNow({ busyTaskCount: 0, waitedMs: 0 }),
    ).toBe(true);
  });

  it("waits while tasks run within the bounded wait", () => {
    expect(
      shouldRestartForBundleUpdateNow({ busyTaskCount: 2, waitedMs: 1000 }),
    ).toBe(false);
  });

  it("restarts once the max wait has elapsed", () => {
    expect(
      shouldRestartForBundleUpdateNow({
        busyTaskCount: 1,
        waitedMs: AGENT_WITCH_BUNDLE_RESTART_MAX_WAIT_MS,
      }),
    ).toBe(true);
  });
});
