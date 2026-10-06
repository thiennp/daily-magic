import { beforeEach, describe, expect, it, vi } from "vitest";

const sqlMock = vi.fn();
const writeEventMock = vi.fn();

vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (rows: unknown) => (Array.isArray(rows) ? rows : []),
}));
vi.mock("@/lib/projects/acl/activity/writeProjectActivityEvent", () => ({
  writeProjectActivityEvent: (input: unknown) => writeEventMock(input),
}));

import { resetProjectRunsWithoutApprovalSchemaForTests } from "@/lib/projects/acl/runsWithoutApproval/ensureProjectRunsWithoutApprovalSchema";
import { readProjectRunsWithoutApproval } from "@/lib/projects/acl/runsWithoutApproval/readProjectRunsWithoutApproval";
import { setProjectRunsWithoutApproval } from "@/lib/projects/acl/runsWithoutApproval/setProjectRunsWithoutApproval";

type Project = { owner: string; allow: boolean };
const projects = new Map<string, Project>();

const text = (strings: TemplateStringsArray) => strings.join("?");

/** Tiny fake for the three statements the module issues. */
const fakeSql = async (strings: TemplateStringsArray, ...values: unknown[]) => {
  const q = text(strings);
  if (q.includes("ALTER TABLE")) return [];
  if (q.includes("UPDATE user_projects")) {
    const [next, id, actor] = values as [boolean, string, string, boolean];
    const p = projects.get(id);
    if (p === undefined || p.owner !== actor || p.allow === next) return [];
    p.allow = next;
    return [{ id }];
  }
  if (q.includes("FROM user_projects")) {
    const p = projects.get(values[0] as string);
    return p === undefined
      ? []
      : [{ owner_user_id: p.owner, allow_runs_without_approval: p.allow }];
  }
  throw new Error(`unexpected sql: ${q}`);
};

describe("setProjectRunsWithoutApproval (S0-2)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    resetProjectRunsWithoutApprovalSchemaForTests();
    sqlMock.mockImplementation(fakeSql);
    projects.clear();
    projects.set("proj-1", { owner: "owner-1", allow: false });
  });

  it("defaults OFF", async () => {
    expect(await readProjectRunsWithoutApproval("proj-1")).toBe(false);
    expect(await readProjectRunsWithoutApproval("missing")).toBe(false);
  });

  it("reads OFF when the query fails (fail closed)", async () => {
    sqlMock.mockRejectedValue(new Error("db down"));
    expect(await readProjectRunsWithoutApproval("proj-1")).toBe(false);
  });

  it("owner turns it ON then OFF; every change writes one Access log row", async () => {
    expect(
      await setProjectRunsWithoutApproval({
        projectId: "proj-1",
        actorUserId: "owner-1",
        allowRunsWithoutApproval: true,
      }),
    ).toEqual({ ok: true, allowRunsWithoutApproval: true, changed: true });
    expect(await readProjectRunsWithoutApproval("proj-1")).toBe(true);
    expect(
      await setProjectRunsWithoutApproval({
        projectId: "proj-1",
        actorUserId: "owner-1",
        allowRunsWithoutApproval: false,
      }),
    ).toEqual({ ok: true, allowRunsWithoutApproval: false, changed: true });

    expect(writeEventMock).toHaveBeenCalledTimes(2);
    expect(writeEventMock.mock.calls[0][0]).toEqual({
      projectId: "proj-1",
      type: "project.runs_without_approval_enabled",
      actor: { kind: "owner", userId: "owner-1" },
      detail: {},
    });
    expect(writeEventMock.mock.calls[1][0]).toMatchObject({
      type: "project.runs_without_approval_disabled",
    });
  });

  it("a no-op write changes nothing and logs nothing", async () => {
    expect(
      await setProjectRunsWithoutApproval({
        projectId: "proj-1",
        actorUserId: "owner-1",
        allowRunsWithoutApproval: false,
      }),
    ).toEqual({ ok: true, allowRunsWithoutApproval: false, changed: false });
    expect(writeEventMock).not.toHaveBeenCalled();
  });

  it("only the owner can toggle: members/bots get forbidden, flag and log untouched", async () => {
    for (const actor of ["member-1", "bot-user-1"]) {
      expect(
        await setProjectRunsWithoutApproval({
          projectId: "proj-1",
          actorUserId: actor,
          allowRunsWithoutApproval: true,
        }),
      ).toEqual({ ok: false, code: "forbidden" });
    }
    expect(projects.get("proj-1")?.allow).toBe(false);
    expect(writeEventMock).not.toHaveBeenCalled();
  });

  it("rejects non-boolean values and unknown projects", async () => {
    expect(
      await setProjectRunsWithoutApproval({
        projectId: "proj-1",
        actorUserId: "owner-1",
        allowRunsWithoutApproval: "yes",
      }),
    ).toEqual({ ok: false, code: "invalid_value" });
    expect(
      await setProjectRunsWithoutApproval({
        projectId: "nope",
        actorUserId: "owner-1",
        allowRunsWithoutApproval: true,
      }),
    ).toEqual({ ok: false, code: "not_found" });
    expect(writeEventMock).not.toHaveBeenCalled();
  });
});
