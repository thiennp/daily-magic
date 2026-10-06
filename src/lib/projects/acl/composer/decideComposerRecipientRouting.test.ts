import { describe, expect, it } from "vitest";

import { decideComposerRecipientRouting } from "@/lib/projects/acl/composer/decideComposerRecipientRouting";

const bots = (ids: readonly string[]) =>
  ids.map((membershipId) => ({ membershipId }));

describe("decideComposerRecipientRouting", () => {
  it("@ present → target mentions; sticky untouched", () => {
    const result = decideComposerRecipientRouting({
      mentionMembershipIds: ["mem-a"],
      stickyChecked: true,
      sticky: { mode: "all", membershipId: null },
      assistants: bots(["mem-a", "mem-b"]),
    });
    expect(result).toEqual({
      kind: "use_mentions",
      membershipIds: ["mem-a"],
      showPopup: false,
      hideAllRoutingUi: false,
      stickyUntouched: true,
    });
  });

  it("no @ + sticky checked all → use sticky, no popup", () => {
    const result = decideComposerRecipientRouting({
      mentionMembershipIds: [],
      stickyChecked: true,
      sticky: { mode: "all", membershipId: null },
      assistants: bots(["mem-a", "mem-b"]),
    });
    expect(result).toEqual({
      kind: "use_sticky_all",
      showPopup: false,
      hideAllRoutingUi: false,
      stickyUntouched: true,
    });
  });

  it("no @ + sticky checked bot → use sticky membership, no popup", () => {
    const result = decideComposerRecipientRouting({
      mentionMembershipIds: [],
      stickyChecked: true,
      sticky: { mode: "membership", membershipId: "mem-b" },
      assistants: bots(["mem-a", "mem-b"]),
    });
    expect(result).toEqual({
      kind: "use_sticky_membership",
      membershipId: "mem-b",
      showPopup: false,
      hideAllRoutingUi: false,
      stickyUntouched: true,
    });
  });

  it("no @ + unchecked / no sticky → popup required", () => {
    expect(
      decideComposerRecipientRouting({
        mentionMembershipIds: [],
        stickyChecked: false,
        sticky: null,
        assistants: bots(["mem-a", "mem-b"]),
      }),
    ).toEqual({
      kind: "require_popup",
      showPopup: true,
      hideAllRoutingUi: false,
      stickyUntouched: true,
    });
    expect(
      decideComposerRecipientRouting({
        mentionMembershipIds: [],
        stickyChecked: true,
        sticky: null,
        assistants: bots(["mem-a", "mem-b"]),
      }).kind,
    ).toBe("require_popup");
  });

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
