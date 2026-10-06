import { describe, expect, it } from "vitest";

import { decideComposerRecipientRouting } from "@/lib/projects/acl/composer/decideComposerRecipientRouting";

const bots = (ids: readonly string[]) =>
  ids.map((membershipId) => ({ membershipId }));

describe("decideComposerRecipientRouting edges", () => {
  it("one assistant → hide ALL routing UI; force that bot (even with @ or sticky)", () => {
    const forced = {
      kind: "force_single_assistant" as const,
      membershipId: "mem-only",
      showPopup: false as const,
      hideAllRoutingUi: true as const,
      stickyUntouched: true as const,
    };
    expect(
      decideComposerRecipientRouting({
        mentionMembershipIds: [],
        stickyChecked: false,
        sticky: null,
        assistants: bots(["mem-only"]),
      }),
    ).toEqual(forced);
    expect(
      decideComposerRecipientRouting({
        mentionMembershipIds: ["mem-other"],
        stickyChecked: true,
        sticky: { mode: "all", membershipId: null },
        assistants: bots(["mem-only"]),
        chipUncheck: true,
      }),
    ).toEqual(forced);
  });

  it("chip uncheck → clear sticky and require popup (multi-assistant)", () => {
    expect(
      decideComposerRecipientRouting({
        mentionMembershipIds: [],
        stickyChecked: true,
        sticky: { mode: "membership", membershipId: "mem-a" },
        assistants: bots(["mem-a", "mem-b"]),
        chipUncheck: true,
      }),
    ).toEqual({
      kind: "clear_sticky",
      showPopup: true,
      hideAllRoutingUi: false,
      stickyUntouched: false,
    });
  });

  it("zero assistants → popup (no force)", () => {
    expect(
      decideComposerRecipientRouting({
        mentionMembershipIds: [],
        stickyChecked: false,
        sticky: null,
        assistants: [],
      }).kind,
    ).toBe("require_popup");
  });
});
