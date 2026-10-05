import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  createProjectDeleteSqlMock,
  extractDeletedTableName,
  OWNER_PROJECT,
  type CapturedProjectDeleteQuery,
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
import { PROJECT_DELETE_TABLES_IN_ORDER } from "@/lib/projects/delete/projectDeleteTables.constant";

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

const sentQueries = (): readonly CapturedProjectDeleteQuery[] =>
  (sql().transaction.mock.calls[0]?.[0] ??
    []) as readonly CapturedProjectDeleteQuery[];

describe("orchestrateDeleteProjectDbOnly — owner", () => {
  beforeEach(resetMocks);

  it("owner on any Mac: deletes every project table in one transaction, leaf rows first", async () => {
    const result = await orchestrateDeleteProjectDbOnly(asOwner);

    expect(result).toEqual({ ok: true, projectId: OWNER_PROJECT.id });
    expect(sql().transaction).toHaveBeenCalledTimes(1);
    expect(sentQueries().map((q) => extractDeletedTableName(q.text))).toEqual([
      ...PROJECT_DELETE_TABLES_IN_ORDER,
    ]);
  });

  it("scopes every statement to this project id and this owner only", async () => {
    await orchestrateDeleteProjectDbOnly(asOwner);

    for (const query of sentQueries()) {
      expect(query.text).toContain("owner_user_id = $");
      expect(query.values).toContain(OWNER_PROJECT.id);
      expect(query.values).toContain(OWNER_PROJECT.ownerUserId);
      expect(
        query.values.every(
          (v) => v === OWNER_PROJECT.id || v === OWNER_PROJECT.ownerUserId,
        ),
      ).toBe(true);
    }
  });

  it("ownership changed mid-flight: project row not deleted → not_found", async () => {
    sql().transaction.mockImplementation(async (queries) =>
      queries.map(() => []),
    );

    const result = await orchestrateDeleteProjectDbOnly(asOwner);

    expect(result).toEqual({ ok: false, code: "not_found" });
  });

  it("never touches fs, child_process, or fetch (no local AgentWitch / wake port)", async () => {
    await orchestrateDeleteProjectDbOnly(asOwner);

    expectNoLocalCalls(expect);
  });
});
