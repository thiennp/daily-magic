import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  createProjectDeleteSqlMock,
  OWNER_PROJECT,
} from "@/lib/projects/delete/projectDeleteSqlMock.testUtils";

const sqlMock = vi.hoisted(() => ({ current: null as unknown }));
const requireAuth = vi.hoisted(() => vi.fn());

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock.current,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));
vi.mock("@/lib/auth/requireAuth", () => ({ requireAuth }));
vi.mock("@/lib/projects/userProjectQueries", () => ({
  getUserProjectById: vi.fn(),
  listUserProjectsForOwner: vi.fn(),
}));

import { DELETE as deleteFromWeb } from "@/app/api/projects/[projectId]/route";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";

const sql = (): ReturnType<typeof createProjectDeleteSqlMock> =>
  sqlMock.current as ReturnType<typeof createProjectDeleteSqlMock>;

const callWeb = (projectId: string) =>
  deleteFromWeb(
    new Request("http://test/api/projects/x", { method: "DELETE" }),
    {
      params: Promise.resolve({ projectId }),
    },
  );

describe("DELETE /api/projects/[projectId] (owner session, DB-only)", () => {
  beforeEach(() => {
    sqlMock.current = createProjectDeleteSqlMock();
    requireAuth.mockReset();
    requireAuth.mockResolvedValue({
      actor: { id: OWNER_PROJECT.ownerUserId, email: "o@example.com" },
      error: null,
    });
    vi.mocked(getUserProjectById).mockReset();
    vi.mocked(getUserProjectById).mockResolvedValue({ ...OWNER_PROJECT });
  });

  it("owner: 200 and one guarded DELETE of user_projects", async () => {
    const response = await callWeb(OWNER_PROJECT.id);
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
      ok: true,
      projectId: OWNER_PROJECT.id,
    });
    expect(sql()).toHaveBeenCalledTimes(1);
    expect(sql().transaction).not.toHaveBeenCalled();
    expect(sql().calls[0]?.text).toContain("DELETE FROM user_projects");
    expect(sql().calls[0]?.values).toEqual([
      OWNER_PROJECT.id,
      OWNER_PROJECT.ownerUserId,
    ]);
  });

  it("non-owner: 404 and nothing deleted", async () => {
    requireAuth.mockResolvedValue({
      actor: { id: "intruder-2", email: "i@example.com" },
      error: null,
    });
    const response = await callWeb(OWNER_PROJECT.id);
    expect(response.status).toBe(404);
    expect(sql()).not.toHaveBeenCalled();
  });

  it("unknown id: 404 and nothing deleted", async () => {
    vi.mocked(getUserProjectById).mockResolvedValue(null);
    const response = await callWeb("missing");
    expect(response.status).toBe(404);
    expect(sql()).not.toHaveBeenCalled();
  });

  it("signed out: 401 and no lookup", async () => {
    requireAuth.mockResolvedValue({
      actor: null,
      error: Response.json({ error: "Unauthorized" }, { status: 401 }),
    });
    const response = await callWeb(OWNER_PROJECT.id);
    expect(response.status).toBe(401);
    expect(getUserProjectById).not.toHaveBeenCalled();
    expect(sql()).not.toHaveBeenCalled();
  });

  it("Default project: 400 and nothing deleted", async () => {
    vi.mocked(getUserProjectById).mockResolvedValue({
      ...OWNER_PROJECT,
      name: "Default",
    });
    const response = await callWeb(OWNER_PROJECT.id);
    expect(response.status).toBe(400);
    expect(sql()).not.toHaveBeenCalled();
  });

  it("delete failure: 500, generic message, no SQL detail", async () => {
    sql().mockRejectedValue(new Error("relation secret_x"));
    const response = await callWeb(OWNER_PROJECT.id);
    expect(response.status).toBe(500);
    expect(JSON.stringify(await response.json())).not.toContain("secret_x");
  });
});
