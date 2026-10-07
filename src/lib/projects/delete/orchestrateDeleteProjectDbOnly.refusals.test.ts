import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  createProjectDeleteSqlMock,
  OWNER_PROJECT,
} from "@/lib/projects/delete/projectDeleteSqlMock.testUtils";
import {
  expectNoLocalCalls,
  resetLocalSpies,
} from "@/lib/projects/delete/projectDeleteLocalSpies.testUtils";

const sqlMock = vi.hoisted(() => ({ current: null as unknown }));
const SPIES = "@/lib/projects/delete/projectDeleteLocalSpies.testUtils";

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock.current,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));
vi.mock("@/lib/projects/userProjectQueries", () => ({
  getUserProjectById: vi.fn(),
}));
vi.mock("fs", async () => (await import(SPIES)).fsModule());
vi.mock("node:fs", async () => (await import(SPIES)).fsModule());
vi.mock("node:fs/promises", async () => (await import(SPIES)).fsModule());
vi.mock("child_process", async () =>
  (await import(SPIES)).childProcessModule(),
);
vi.mock("node:child_process", async () =>
  (await import(SPIES)).childProcessModule(),
);

import { getUserProjectById } from "@/lib/projects/userProjectQueries";
import orchestrateDeleteProjectDbOnly from "@/lib/projects/delete/orchestrateDeleteProjectDbOnly";

const sql = (): ReturnType<typeof createProjectDeleteSqlMock> =>
  sqlMock.current as ReturnType<typeof createProjectDeleteSqlMock>;

const resetMocks = (): void => {
  sqlMock.current = createProjectDeleteSqlMock();
  resetLocalSpies();
  vi.mocked(getUserProjectById).mockReset();
  vi.mocked(getUserProjectById).mockResolvedValue({ ...OWNER_PROJECT });
};

const asOwner = {
  projectId: OWNER_PROJECT.id,
  ownerUserId: OWNER_PROJECT.ownerUserId,
};

const expectNothingDeleted = (): void => {
  expect(sql()).not.toHaveBeenCalled();
  expect(sql().transaction).not.toHaveBeenCalled();
  expectNoLocalCalls(expect);
};

describe("orchestrateDeleteProjectDbOnly — refusals delete nothing", () => {
  beforeEach(resetMocks);

  it("non-owner: not_owner", async () => {
    const result = await orchestrateDeleteProjectDbOnly({
      ...asOwner,
      ownerUserId: "intruder-2",
    });

    expect(result).toEqual({ ok: false, code: "not_owner" });
    expectNothingDeleted();
  });

  it("unknown id: not_found", async () => {
    vi.mocked(getUserProjectById).mockResolvedValue(null);

    const result = await orchestrateDeleteProjectDbOnly({
      ...asOwner,
      projectId: "does-not-exist",
    });

    expect(result).toEqual({ ok: false, code: "not_found" });
    expectNothingDeleted();
  });

  it("blank id: not_found without any lookup", async () => {
    const result = await orchestrateDeleteProjectDbOnly({
      ...asOwner,
      projectId: "  ",
    });

    expect(result).toEqual({ ok: false, code: "not_found" });
    expect(getUserProjectById).not.toHaveBeenCalled();
    expectNothingDeleted();
  });

  it("Default project: owner may delete (no default_project refusal)", async () => {
    vi.mocked(getUserProjectById).mockResolvedValue({
      ...OWNER_PROJECT,
      name: "Default",
    });

    const result = await orchestrateDeleteProjectDbOnly(asOwner);

    expect(result).toEqual({ ok: true, projectId: OWNER_PROJECT.id });
    expect(sql()).toHaveBeenCalledTimes(1);
    expect(sql().transaction).not.toHaveBeenCalled();
  });
});
