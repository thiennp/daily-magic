import { describe, expect, it } from "vitest";

import {
  projectSyncConnectionFromProbe,
  reduceProjectSyncConnection,
} from "@/features/projects/sync/projectSyncConnection";

describe("projectSyncConnection", () => {
  it("probe live → local_live", () => {
    expect(projectSyncConnectionFromProbe({ localLive: true })).toBe(
      "local_live",
    );
  });

  it("offline + neon_ok → neon_only; exhausted → lost; local_back → reconciling", () => {
    let state = projectSyncConnectionFromProbe({ localLive: false });
    expect(state).toBe("local_offline");
    state = reduceProjectSyncConnection(state, { type: "neon_ok" });
    expect(state).toBe("neon_only");
    state = reduceProjectSyncConnection(state, {
      type: "load_older_exhausted_offline",
    });
    expect(state).toBe("lost");
    state = reduceProjectSyncConnection(state, { type: "local_back" });
    expect(state).toBe("reconciling");
    state = reduceProjectSyncConnection(state, { type: "reconcile_done" });
    expect(state).toBe("local_live");
  });
});
