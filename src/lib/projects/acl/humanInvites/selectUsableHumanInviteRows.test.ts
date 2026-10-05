import { readFileSync } from "node:fs";
import { join } from "node:path";

import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  HUMAN_INVITE_LIST_NEVER_REDEEMED_FRAGMENT,
  HUMAN_INVITE_USABLE_WHERE_FRAGMENTS,
} from "@/lib/projects/acl/humanInvites/humanInviteUsableSql.constant";

const sqlMock = vi.fn();
vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (value: unknown) => (Array.isArray(value) ? value : []),
}));

import { selectUsableHumanInviteRows } from "@/lib/projects/acl/humanInvites/selectUsableHumanInviteRows";

const readSrc = (relativePath: string): string =>
  readFileSync(join(process.cwd(), relativePath), "utf8");

describe("selectUsableHumanInviteRows", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    sqlMock.mockResolvedValue([]);
  });

  it("applies shared claim fragments plus list-only never-redeemed", async () => {
    await selectUsableHumanInviteRows("proj-1");
    const query = String(sqlMock.mock.calls[0]?.[0] ?? "");
    expect(query).toContain("FROM project_human_invites");
    for (const fragment of HUMAN_INVITE_USABLE_WHERE_FRAGMENTS) {
      expect(query).toContain(fragment);
    }
    expect(query).toContain(HUMAN_INVITE_LIST_NEVER_REDEEMED_FRAGMENT);
  });

  it("stays in lockstep with claim on the three shared fragments only", () => {
    const claim = readSrc(
      "src/lib/projects/acl/humanInvites/claimHumanInviteToken.ts",
    );
    const select = readSrc(
      "src/lib/projects/acl/humanInvites/selectUsableHumanInviteRows.ts",
    );
    for (const fragment of HUMAN_INVITE_USABLE_WHERE_FRAGMENTS) {
      expect(claim).toContain(fragment);
      expect(select).toContain(fragment);
    }
    expect(select).toContain(HUMAN_INVITE_LIST_NEVER_REDEEMED_FRAGMENT);
    expect(claim).not.toContain(HUMAN_INVITE_LIST_NEVER_REDEEMED_FRAGMENT);
  });

  it("hides a used invite from the list while claim required uses_remaining > 0", () => {
    const select = readSrc(
      "src/lib/projects/acl/humanInvites/selectUsableHumanInviteRows.ts",
    );
    const claim = readSrc(
      "src/lib/projects/acl/humanInvites/claimHumanInviteToken.ts",
    );
    expect(select).toContain("uses_remaining = max_uses");
    expect(claim).toContain("uses_remaining > 0");
    expect(claim).not.toContain("uses_remaining = max_uses");
  });
});
