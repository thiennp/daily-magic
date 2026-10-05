import { readFileSync } from "node:fs";
import { join } from "node:path";

import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  PROJECT_INVITE_LIST_NEVER_REDEEMED_FRAGMENT,
  PROJECT_INVITE_USABLE_WHERE_FRAGMENTS,
} from "@/lib/projects/acl/invites/projectInviteUsableSql.constant";

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

  it("applies shared claim fragments plus list-only never-redeemed", async () => {
    await selectUsableProjectInviteRows("proj-1");
    const query = String(sqlMock.mock.calls[0]?.[0] ?? "");
    expect(query).toContain("FROM project_invites");
    expect(query).toContain("project_id =");
    for (const fragment of PROJECT_INVITE_USABLE_WHERE_FRAGMENTS) {
      expect(query).toContain(fragment);
    }
    expect(query).toContain(PROJECT_INVITE_LIST_NEVER_REDEEMED_FRAGMENT);
    expect(sqlMock.mock.calls[0]?.[1]).toBe("proj-1");
  });

  it("stays in lockstep with claimProjectInviteToken on the three shared fragments only", () => {
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
    expect(select).toContain(PROJECT_INVITE_LIST_NEVER_REDEEMED_FRAGMENT);
    expect(claim).not.toContain(PROJECT_INVITE_LIST_NEVER_REDEEMED_FRAGMENT);
    expect(claim).not.toContain("max_uses");
  });

  it("hides a multi-use invite after one redeem while claim would still accept it", () => {
    const select = readSrc(
      "src/lib/projects/acl/invites/selectUsableProjectInviteRows.ts",
    );
    const claim = readSrc(
      "src/lib/projects/acl/invites/claimProjectInviteToken.ts",
    );
    // List requires never-redeemed (uses_remaining = max_uses).
    expect(select).toContain("uses_remaining = max_uses");
    // Claim only requires uses_remaining > 0 — a max_uses=3 / uses_remaining=2
    // row is still claimable but excluded from the list SELECT.
    expect(claim).toContain("uses_remaining > 0");
    expect(claim).not.toContain("uses_remaining = max_uses");
    expect(PROJECT_INVITE_LIST_NEVER_REDEEMED_FRAGMENT).toBe(
      "uses_remaining = max_uses",
    );
  });

  it("returns only the rows the SQL yields (no JS post-filter)", async () => {
    sqlMock.mockResolvedValue([
      {
        id: "inv-usable",
        project_id: "proj-1",
        created_by_user_id: "owner",
        team_label: null,
        scopes: [],
        max_uses: 3,
        uses_remaining: 3,
        expires_at: "2026-10-20T00:00:00.000Z",
        revoked_at: null,
        created_at: "2026-10-05T00:00:00.000Z",
      },
    ]);
    const rows = await selectUsableProjectInviteRows("proj-1");
    expect(rows).toHaveLength(1);
    expect(rows[0]?.id).toBe("inv-usable");
    expect(rows[0]?.uses_remaining).toBe(rows[0]?.max_uses);
  });
});
