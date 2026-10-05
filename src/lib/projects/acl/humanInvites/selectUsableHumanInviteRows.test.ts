import { readFileSync } from "node:fs";
import { join } from "node:path";

import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  HUMAN_INVITE_LIST_NEVER_REDEEMED_FRAGMENT,
  HUMAN_INVITE_USABLE_WHERE_FRAGMENTS,
} from "@/lib/projects/acl/humanInvites/humanInviteUsableSql.constant";

const sqlMock = Object.assign(vi.fn(), {
  unsafe: (raw: string) => ({ sql: raw }),
});
vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (value: unknown) => (Array.isArray(value) ? value : []),
}));

import { selectUsableHumanInviteRows } from "@/lib/projects/acl/humanInvites/selectUsableHumanInviteRows";

const CLAIM =
  "src/lib/projects/acl/humanInvites/claimAndInsertHumanMembership.ts";
const SELECT =
  "src/lib/projects/acl/humanInvites/selectUsableHumanInviteRows.ts";

const readSrc = (relativePath: string): string =>
  readFileSync(join(process.cwd(), relativePath), "utf8");

const sqlCallText = (call: unknown[]): string => {
  const strings = call[0] as TemplateStringsArray;
  const values = call.slice(1);
  let out = "";
  for (let i = 0; i < strings.length; i++) {
    out += strings[i];
    if (i < values.length) {
      const v = values[i];
      if (v !== null && typeof v === "object" && "sql" in v) {
        out += String((v as { sql: string }).sql);
      }
    }
  }
  return out;
};

describe("selectUsableHumanInviteRows", () => {
  beforeEach(() => {
    sqlMock.mockReset();
    sqlMock.mockResolvedValue([]);
  });

  it("applies shared claim fragments plus list-only never-redeemed", async () => {
    await selectUsableHumanInviteRows("proj-1");
    const query = sqlCallText(sqlMock.mock.calls[0] ?? []);
    expect(query).toContain("FROM project_human_invites");
    for (const fragment of HUMAN_INVITE_USABLE_WHERE_FRAGMENTS) {
      expect(query).toContain(fragment);
    }
    expect(query).toContain(HUMAN_INVITE_LIST_NEVER_REDEEMED_FRAGMENT);
  });

  it("stays in lockstep with claim CTE via shared USABLE_WHERE_SQL", () => {
    const claim = readSrc(CLAIM);
    const select = readSrc(SELECT);
    expect(claim).toContain("HUMAN_INVITE_USABLE_WHERE_SQL");
    expect(select).toContain("HUMAN_INVITE_USABLE_WHERE_SQL");
    expect(select).toContain("HUMAN_INVITE_LIST_NEVER_REDEEMED_FRAGMENT");
    expect(claim).not.toContain("HUMAN_INVITE_LIST_NEVER_REDEEMED_FRAGMENT");
  });

  it("hides a used invite from the list while claim omits never-redeemed", () => {
    expect(readSrc(SELECT)).toContain("LIST_NEVER_REDEEMED");
    expect(readSrc(CLAIM)).not.toContain("LIST_NEVER_REDEEMED");
  });
});
