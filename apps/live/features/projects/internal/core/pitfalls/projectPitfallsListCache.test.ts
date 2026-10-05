import { afterEach, describe, expect, it } from "vitest";

import type {
  AgentWitchProjectPitfallsStore,
  ListAgentWitchPitfallsResult,
} from "./agentWitchProjectPitfallsStore.type";
import {
  invalidateProjectPitfallsListCache,
  listProjectPitfallsCached,
} from "./projectPitfallsListCache";
import { buildPitfallFixture } from "./projectPitfallFixtures.testUtil";

afterEach(() => {
  invalidateProjectPitfallsListCache();
});

const okList = (): ListAgentWitchPitfallsResult => ({
  ok: true,
  items: [buildPitfallFixture()],
  syncedAt: "2026-10-05T12:00:00.000Z",
});

describe("listProjectPitfallsCached", () => {
  it("fetches once then serves the cached list within the TTL", async () => {
    let calls = 0;
    const store: AgentWitchProjectPitfallsStore = {
      listPitfalls: async () => {
        calls += 1;
        return okList();
      },
      upsertPitfall: async () => ({ ok: true }),
    };

    const first = await listProjectPitfallsCached({
      store,
      projectId: "proj-1",
      includeRetired: false,
      nowMs: 1_000,
      ttlMs: 30_000,
    });
    const second = await listProjectPitfallsCached({
      store,
      projectId: "proj-1",
      includeRetired: false,
      nowMs: 2_000,
      ttlMs: 30_000,
    });

    expect(first).toEqual(second);
    expect(calls).toBe(1);
  });

  it("refetches when includeRetired changes or the cache is invalidated", async () => {
    let calls = 0;
    const store: AgentWitchProjectPitfallsStore = {
      listPitfalls: async (_id, options) => {
        calls += 1;
        return {
          ok: true,
          items: options.includeRetired
            ? [buildPitfallFixture({ source: "retired" })]
            : [buildPitfallFixture()],
          syncedAt: null,
        };
      },
      upsertPitfall: async () => ({ ok: true }),
    };

    await listProjectPitfallsCached({
      store,
      projectId: "proj-1",
      includeRetired: false,
      nowMs: 1_000,
    });
    await listProjectPitfallsCached({
      store,
      projectId: "proj-1",
      includeRetired: true,
      nowMs: 1_100,
    });
    expect(calls).toBe(2);

    invalidateProjectPitfallsListCache("proj-1");
    await listProjectPitfallsCached({
      store,
      projectId: "proj-1",
      includeRetired: true,
      nowMs: 1_200,
    });
    expect(calls).toBe(3);
  });
});
