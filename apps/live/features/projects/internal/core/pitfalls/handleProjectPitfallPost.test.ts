import { describe, expect, it } from "vitest";

import type {
  ProjectPitfallUpsert,
  ProjectPitfallView,
} from "@agent-witch/shared/pitfalls";
import type {
  AgentWitchProjectPitfallsStore,
  UpsertAgentWitchPitfallResult,
} from "./agentWitchProjectPitfallsStore.type";
import handleProjectPitfallPost, {
  resolveProjectPitfallPostAction,
  waitForPitfallActionIdle,
} from "./handleProjectPitfallPost";
import { buildPitfallFixture } from "./projectPitfallFixtures.testUtil";

const createFakeStore = (
  items: readonly ProjectPitfallView[] | null,
  upsertResult: UpsertAgentWitchPitfallResult = { ok: true },
) => {
  const upserts: ProjectPitfallUpsert[] = [];
  const store: AgentWitchProjectPitfallsStore = {
    listPitfalls: async () =>
      items === null
        ? { ok: false, reason: "unavailable" }
        : { ok: true, items, syncedAt: null },
    upsertPitfall: async (_projectId, pitfall) => {
      upserts.push(pitfall);
      return upsertResult;
    },
  };
  return { store, upserts };
};

const flashOf = (location: string): string | null =>
  new URLSearchParams(location.split("?")[1]).get("pitfall");

describe("handleProjectPitfallPost", () => {
  it("maps paths to actions", () => {
    expect(resolveProjectPitfallPostAction("/project/pitfalls/save")).toBe(
      "save",
    );
    expect(resolveProjectPitfallPostAction("/project/pitfalls/retire")).toBe(
      "retire",
    );
    expect(resolveProjectPitfallPostAction("/project/pitfalls/restore")).toBe(
      "restore",
    );
    expect(
      resolveProjectPitfallPostAction("/project/pitfalls/nope"),
    ).toBeNull();
  });

  it("saves a seed edit as a project override with the same id", async () => {
    const { store, upserts } = createFakeStore([buildPitfallFixture()]);
    const location = await handleProjectPitfallPost({
      action: "save",
      form: new URLSearchParams({
        pitfallId: "seed-stale-lockfile",
        symptom: "Install fails on a new branch",
        cause: "Lockfile drifted.",
        avoidance: "Run npm ci first.",
      }),
      projectId: "proj-1",
      store,
    });
    expect(flashOf(location)).toBe("saved");
    expect(location).toContain("/project?id=proj-1&tab=pitfalls");
    expect(upserts).toHaveLength(1);
    expect(upserts[0]).toMatchObject({
      id: "seed-stale-lockfile",
      source: "project",
    });
    expect(upserts[0]).not.toHaveProperty("hitCount");
  });

  it("blocks adding a 65th active pitfall without calling the cloud", async () => {
    const full = Array.from({ length: 64 }, (_, i) =>
      buildPitfallFixture({ id: `p-${i}`, source: "project" }),
    );
    const { store, upserts } = createFakeStore(full);
    const location = await handleProjectPitfallPost({
      action: "save",
      form: new URLSearchParams({
        symptom: "New",
        cause: "Why",
        avoidance: "Fix",
      }),
      projectId: "proj-1",
      store,
      randomSuffix: () => "000000",
    });
    expect(flashOf(location)).toBe("limit");
    expect(upserts).toHaveLength(0);
  });

  it("still allows editing an existing pitfall at the cap", async () => {
    const full = Array.from({ length: 64 }, (_, i) =>
      buildPitfallFixture({ id: `p-${i}`, source: "project" }),
    );
    const { store, upserts } = createFakeStore(full);
    const location = await handleProjectPitfallPost({
      action: "save",
      form: new URLSearchParams({
        pitfallId: "p-3",
        symptom: "Edited",
        cause: "Why",
        avoidance: "Fix",
      }),
      projectId: "proj-1",
      store,
    });
    expect(flashOf(location)).toBe("saved");
    expect(upserts).toHaveLength(1);
  });

  it("maps a cloud 64-cap rejection to the limit message", async () => {
    const { store } = createFakeStore([], {
      ok: false,
      reason: "active_limit",
    });
    const location = await handleProjectPitfallPost({
      action: "save",
      form: new URLSearchParams({
        symptom: "New",
        cause: "Why",
        avoidance: "Fix",
      }),
      projectId: "proj-1",
      store,
      randomSuffix: () => "000000",
    });
    expect(flashOf(location)).toBe("limit");
  });

  it("retires by upserting source retired and keeps Show retired", async () => {
    const { store, upserts } = createFakeStore([buildPitfallFixture()]);
    const location = await handleProjectPitfallPost({
      action: "retire",
      form: new URLSearchParams({
        pitfallId: "seed-stale-lockfile",
        showRetired: "1",
      }),
      projectId: "proj-1",
      store,
    });
    expect(flashOf(location)).toBe("retired");
    expect(location).toContain("retired=1");
    expect(upserts[0]).toMatchObject({
      id: "seed-stale-lockfile",
      source: "retired",
      symptom: "Install fails after a branch switch",
    });
  });

  it("brings back a retired pitfall as a project item", async () => {
    const { store, upserts } = createFakeStore([
      buildPitfallFixture({ source: "retired" }),
    ]);
    const location = await handleProjectPitfallPost({
      action: "restore",
      form: new URLSearchParams({ pitfallId: "seed-stale-lockfile" }),
      projectId: "proj-1",
      store,
    });
    expect(flashOf(location)).toBe("restored");
    expect(upserts[0]?.source).toBe("project");
  });

  it("reports missing, invalid, and unavailable states", async () => {
    const { store } = createFakeStore([]);
    expect(
      flashOf(
        await handleProjectPitfallPost({
          action: "retire",
          form: new URLSearchParams({ pitfallId: "gone" }),
          projectId: "proj-1",
          store,
        }),
      ),
    ).toBe("missing");
    expect(
      flashOf(
        await handleProjectPitfallPost({
          action: "save",
          form: new URLSearchParams({ symptom: "" }),
          projectId: "proj-1",
          store,
        }),
      ),
    ).toBe("invalid");
    expect(
      flashOf(
        await handleProjectPitfallPost({
          action: "save",
          form: new URLSearchParams({
            symptom: "a",
            cause: "c",
            avoidance: "b",
          }),
          projectId: "proj-1",
          store: null,
        }),
      ),
    ).toBe("unavailable");
    expect(
      flashOf(
        await handleProjectPitfallPost({
          action: "save",
          form: new URLSearchParams({
            symptom: "a",
            cause: "c",
            avoidance: "b",
          }),
          projectId: "proj-1",
          store: createFakeStore(null).store,
        }),
      ),
    ).toBe("unavailable");
  });

  it("serializes rapid retire then restore so the restore sees the retired row", async () => {
    let items = [buildPitfallFixture()];
    const upsertOrder: string[] = [];
    const store: AgentWitchProjectPitfallsStore = {
      listPitfalls: async () => ({ ok: true, items, syncedAt: null }),
      upsertPitfall: async (_projectId, pitfall) => {
        upsertOrder.push(pitfall.source);
        // Simulate a slow first write; the second call must wait and re-list.
        await new Promise((resolve) => setTimeout(resolve, 30));
        items = [
          buildPitfallFixture({
            source: pitfall.source === "retired" ? "retired" : "project",
          }),
        ];
        return { ok: true };
      },
    };

    const retire = handleProjectPitfallPost({
      action: "retire",
      form: new URLSearchParams({ pitfallId: "seed-stale-lockfile" }),
      projectId: "proj-1",
      store,
    });
    const restore = handleProjectPitfallPost({
      action: "restore",
      form: new URLSearchParams({ pitfallId: "seed-stale-lockfile" }),
      projectId: "proj-1",
      store,
    });

    const [retireLoc, restoreLoc] = await Promise.all([retire, restore]);
    await waitForPitfallActionIdle("proj-1:seed-stale-lockfile");

    expect(flashOf(retireLoc)).toBe("retired");
    expect(flashOf(restoreLoc)).toBe("restored");
    expect(upsertOrder).toEqual(["retired", "project"]);
    expect(items[0]?.source).toBe("project");
  });

  it("ignores a duplicate retire while the first retire is still pending", async () => {
    let items = [buildPitfallFixture()];
    let upsertCalls = 0;
    const store: AgentWitchProjectPitfallsStore = {
      listPitfalls: async () => ({ ok: true, items, syncedAt: null }),
      upsertPitfall: async () => {
        upsertCalls += 1;
        await new Promise((resolve) => setTimeout(resolve, 20));
        items = [buildPitfallFixture({ source: "retired" })];
        return { ok: true };
      },
    };

    const first = handleProjectPitfallPost({
      action: "retire",
      form: new URLSearchParams({ pitfallId: "seed-stale-lockfile" }),
      projectId: "proj-1",
      store,
    });
    const second = handleProjectPitfallPost({
      action: "retire",
      form: new URLSearchParams({ pitfallId: "seed-stale-lockfile" }),
      projectId: "proj-1",
      store,
    });

    const [firstLoc, secondLoc] = await Promise.all([first, second]);
    expect(flashOf(firstLoc)).toBe("retired");
    // Second call re-lists after the first finishes; row is already retired so
    // upsert still runs with source retired (idempotent), but both complete in order.
    expect(flashOf(secondLoc)).toBe("retired");
    expect(upsertCalls).toBe(2);
  });
});
