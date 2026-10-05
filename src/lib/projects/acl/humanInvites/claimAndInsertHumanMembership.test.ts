import { beforeEach, describe, expect, it, vi } from "vitest";

import { HUMAN_INVITE_USABLE_WHERE_FRAGMENTS } from "@/lib/projects/acl/humanInvites/humanInviteUsableSql.constant";

const sqlMock = Object.assign(vi.fn(), {
  unsafe: (raw: string) => ({ sql: raw }),
});
vi.mock("@/lib/db", () => ({
  getSql: () => sqlMock,
  asRowArray: (value: unknown) => (Array.isArray(value) ? value : []),
}));
vi.mock("@/lib/projects/acl/ensureProjectAclSchema", () => ({
  ensureProjectAclSchema: vi.fn(async () => undefined),
}));

import { claimAndInsertHumanMembership } from "@/lib/projects/acl/humanInvites/claimAndInsertHumanMembership";

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

describe("claimAndInsertHumanMembership", () => {
  beforeEach(() => {
    sqlMock.mockReset();
  });

  it("maps display-name unique failure to display_name_taken", async () => {
    sqlMock.mockRejectedValueOnce(
      new Error("duplicate key project_memberships_display_name_active_idx"),
    );
    await expect(
      claimAndInsertHumanMembership({
        token: "t".repeat(22),
        claimantUserId: "u",
        projectDisplayName: "Same",
        role: "member",
      }),
    ).resolves.toEqual({ ok: false, code: "display_name_taken" });
  });

  it("returns invalid_token when CTE matches nothing", async () => {
    sqlMock.mockResolvedValueOnce([]);
    await expect(
      claimAndInsertHumanMembership({
        token: "t".repeat(22),
        claimantUserId: "u",
        projectDisplayName: "Name",
        role: "member",
      }),
    ).resolves.toEqual({ ok: false, code: "invalid_token" });
  });

  it("embeds shared usable WHERE fragments in the claim CTE SQL", async () => {
    sqlMock.mockResolvedValueOnce([]);
    await claimAndInsertHumanMembership({
      token: "t".repeat(22),
      claimantUserId: "u",
      projectDisplayName: "Name",
      role: "member",
    });
    const query = sqlCallText(sqlMock.mock.calls[0] ?? []);
    expect(query).toContain("WITH claimed AS");
    for (const fragment of HUMAN_INVITE_USABLE_WHERE_FRAGMENTS) {
      expect(query).toContain(fragment);
    }
    expect(query).not.toContain("uses_remaining = max_uses");
  });
});
