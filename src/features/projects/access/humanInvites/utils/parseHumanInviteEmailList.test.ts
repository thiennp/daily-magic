import { describe, expect, it } from "vitest";

import { parseHumanInviteEmailList } from "@/features/projects/access/humanInvites/utils/parseHumanInviteEmailList";

describe("parseHumanInviteEmailList", () => {
  it("splits, trims, lowercases, dedupes", () => {
    expect(
      parseHumanInviteEmailList(" Ada@X.com, bee@y.org;ada@x.com\n"),
    ).toEqual({
      ok: true,
      emails: ["ada@x.com", "bee@y.org"],
    });
  });

  it("requires at least one valid email", () => {
    expect(parseHumanInviteEmailList("  ")).toEqual({
      ok: false,
      errorMessage: "Enter an email address.",
    });
    expect(parseHumanInviteEmailList("ada@x.com, nope")).toEqual({
      ok: false,
      errorMessage: "Check this email: nope",
    });
  });

  it("caps one send at 10", () => {
    const many = Array.from({ length: 11 }, (_, i) => `p${i}@x.com`).join(",");
    expect(parseHumanInviteEmailList(many)).toEqual({
      ok: false,
      errorMessage: "Send up to 10 invites at a time.",
    });
  });
});
