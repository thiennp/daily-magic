import { beforeEach, describe, expect, it, vi } from "vitest";

const queries = vi.hoisted(() => [] as string[]);
const nextRows = vi.hoisted(() => ({ rows: [] as Record<string, unknown>[] }));

vi.mock("@/lib/projects/acl/ensureProjectAclSchema", () => ({
  ensureProjectAclSchema: vi.fn(async () => undefined),
}));
vi.mock("@/lib/db", () => ({
  getSql: () => async (strings: TemplateStringsArray) => {
    queries.push(strings.join("?"));
    return nextRows.rows;
  },
  asRowArray: (value: unknown) => value,
}));

import { readProjectInviteJoinState } from "@/lib/projects/acl/invites/readProjectInviteJoinState";

const TOKEN = "tok-fake-invite-0000";
const row = (extra: Record<string, unknown>) => ({
  id: "inv-1",
  project_id: "proj-1",
  uses_remaining: 1,
  max_uses: 1,
  revoked_at: null,
  join_project_name: "Demo",
  join_usable: true,
  ...extra,
});

describe("readProjectInviteJoinState", () => {
  beforeEach(() => {
    queries.length = 0;
    nextRows.rows = [];
  });

  it("returns usable with project name; autoApprove null when the column is absent", async () => {
    nextRows.rows = [row({})];
    await expect(readProjectInviteJoinState(TOKEN)).resolves.toEqual({
      kind: "usable",
      projectId: "proj-1",
      projectName: "Demo",
      autoApprove: null,
    });
  });

  it("passes auto_approve through when present", async () => {
    nextRows.rows = [row({ auto_approve: true })];
    await expect(readProjectInviteJoinState(TOKEN)).resolves.toMatchObject({
      autoApprove: true,
    });
  });

  it("returns gone for revoked / expired / used-up rows", async () => {
    nextRows.rows = [row({ join_usable: false, uses_remaining: 0 })];
    await expect(readProjectInviteJoinState(TOKEN)).resolves.toEqual({
      kind: "gone",
    });
  });

  it("returns unknown for no row, and for short tokens without querying", async () => {
    await expect(readProjectInviteJoinState(TOKEN)).resolves.toEqual({
      kind: "unknown",
    });
    queries.length = 0;
    await expect(readProjectInviteJoinState("short")).resolves.toEqual({
      kind: "unknown",
    });
    expect(queries).toHaveLength(0);
  });

  it("is read-only: one SELECT, no UPDATE/INSERT/DELETE, invite row unchanged", async () => {
    const stored = row({});
    const before = structuredClone(stored);
    nextRows.rows = [stored];
    await readProjectInviteJoinState(TOKEN);
    await readProjectInviteJoinState(TOKEN);
    expect(queries).toHaveLength(2);
    for (const query of queries) {
      expect(query).toMatch(/^\s*SELECT/);
      expect(query).not.toMatch(/\b(UPDATE|INSERT|DELETE)\b/i);
      expect(query).toContain("token_hash");
    }
    expect(stored).toEqual(before);
  });
});
