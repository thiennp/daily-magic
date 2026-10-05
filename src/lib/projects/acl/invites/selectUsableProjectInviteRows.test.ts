import { readFileSync } from "node:fs";
import { join } from "node:path";

import { beforeEach, describe, expect, it, vi } from "vitest";

import { PROJECT_INVITE_USABLE_WHERE_FRAGMENTS } from "@/lib/projects/acl/invites/projectInviteUsableSql.constant";

const sqlMock = vi.fn();
vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (value: unknown) => (Array.isArray(value) ? value : []),
}));

import { selectUsableProjectInviteRows } from "@/lib/projects/acl/invites/selectUsableProjectInviteRows";

const readSrc = (relativePath: string): string =>
  readFileSync(join(process.cwd(), relativePath), "utf8");

describe("selectUsableProjectInviteRows", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    sqlMock.mockResolvedValue([]);
  });

  it("applies one guarded WHERE matching claim (unused, unexpired, unrevoked)", async () => {
    await selectUsableProjectInviteRows("proj-1");
    const query = String(sqlMock.mock.calls[0]?.[0] ?? "");
    expect(query).toContain("FROM project_invites");
    expect(query).toContain("project_id =");
    for (const fragment of PROJECT_INVITE_USABLE_WHERE_FRAGMENTS) {
      expect(query).toContain(fragment);
    }
    expect(query).not.toMatch(/uses_remaining\s*=/);
    expect(sqlMock.mock.calls[0]?.[1]).toBe("proj-1");
  });

  it("stays in lockstep with claimProjectInviteToken's UPDATE WHERE", () => {
    const claim = readSrc(
      "src/lib/projects/acl/invites/claimProjectInviteToken.ts",
    );
    const select = readSrc(
      "src/lib/projects/acl/invites/selectUsableProjectInviteRows.ts",
    );
    for (const fragment of PROJECT_INVITE_USABLE_WHERE_FRAGMENTS) {
      expect(claim).toContain(fragment);
      expect(select).toContain(fragment);
    }
  });

  it("returns only the rows the SQL yields (no JS post-filter)", async () => {
    sqlMock.mockResolvedValue([
      {
        id: "inv-usable",
        project_id: "proj-1",
        created_by_user_id: "owner",
        team_label: null,
        scopes: [],
        max_uses: 1,
        uses_remaining: 1,
        expires_at: "2026-10-20T00:00:00.000Z",
        revoked_at: null,
        created_at: "2026-10-05T00:00:00.000Z",
      },
    ]);
    const rows = await selectUsableProjectInviteRows("proj-1");
    expect(rows).toHaveLength(1);
    expect(rows[0]?.id).toBe("inv-usable");
  });
});
