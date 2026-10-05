import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  createProjectDeleteSqlMock,
  extractDeletedTableName,
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

describe("orchestrateDeleteProjectDbOnly — owner (single CASCADE delete)", () => {
  beforeEach(resetMocks);

  it("issues exactly one DELETE of user_projects guarded by owner", async () => {
    const result = await orchestrateDeleteProjectDbOnly(asOwner);

    expect(result).toEqual({ ok: true, projectId: OWNER_PROJECT.id });
    expect(sql()).toHaveBeenCalledTimes(1);
    expect(sql().transaction).not.toHaveBeenCalled();
    const [query] = sql().calls;
    expect(extractDeletedTableName(query.text)).toBe("user_projects");
    expect(query.text).toContain("owner_user_id = $");
    expect(query.text).toContain("RETURNING id");
    expect(query.values).toEqual([OWNER_PROJECT.id, OWNER_PROJECT.ownerUserId]);
  });

  it("ownership changed mid-flight: empty RETURNING → not_found", async () => {
    sqlMock.current = createProjectDeleteSqlMock({ returnProjectRow: false });

    const result = await orchestrateDeleteProjectDbOnly(asOwner);

    expect(result).toEqual({ ok: false, code: "not_found" });
    expect(sql()).toHaveBeenCalledTimes(1);
  });

  it("never touches fs, child_process, or fetch (no local AgentWitch / wake port)", async () => {
    await orchestrateDeleteProjectDbOnly(asOwner);

    expectNoLocalCalls(expect);
  });
});
