import { beforeEach, describe, expect, it, vi } from "vitest";

const getProject = vi.hoisted(() => vi.fn());
const loadExtras = vi.hoisted(() => vi.fn());
const keep = vi.hoisted(() => vi.fn());
vi.mock("@/lib/projects/userProjectQueries", () => ({
  getUserProjectById: getProject,
}));
vi.mock("@/lib/dispatch/loadAgentRunDispatchCompositionExtras", () => ({
  default: loadExtras,
}));
vi.mock("@/lib/projects/composition/keepRunScopedComponentsInProject", () => ({
  default: keep,
}));

import keepRunScopedComponentsInProjectForOwner from "@/lib/projects/composition/keepRunScopedComponentsInProjectForOwner";

const run = (projectId: string) => ({
  projectId,
  compositionSnapshot: { entries: [{ scope: "run", id: "c1" }] },
});
const call = () =>
  keepRunScopedComponentsInProjectForOwner({
    ownerUserId: "owner",
    projectId: "A",
    agentRunId: "run-1",
  });

describe("keepRunScopedComponentsInProjectForOwner", () => {
  beforeEach(() => {
    for (const m of [getProject, loadExtras, keep]) m.mockReset();
    getProject.mockResolvedValue({ ownerUserId: "owner" });
    keep.mockResolvedValue({ ok: true, boundCount: 1 });
  });

  it("keeps the components of a run that belongs to this project", async () => {
    loadExtras.mockResolvedValue(run("A"));
    expect(await call()).toEqual({ ok: true, boundCount: 1 });
  });

  it("refuses a run from another project", async () => {
    loadExtras.mockResolvedValue(run("B"));
    const result = await call();
    expect(result.ok).toBe(false);
    expect(keep).not.toHaveBeenCalled();
  });
});
