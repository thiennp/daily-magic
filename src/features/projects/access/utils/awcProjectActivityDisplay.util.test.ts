import { describe, expect, it } from "vitest";

import {
  awcProjectActivityMemberAnchorId,
  formatAwcProjectActivityWhen,
  humanizeAwcProjectActivityDetailValue,
  resolveAwcProjectActivitySubjectUserId,
} from "@/features/projects/access/utils/awcProjectActivityDisplay.util";

describe("awcProjectActivityDisplay", () => {
  it("builds member anchor ids", () => {
    expect(awcProjectActivityMemberAnchorId("bot/a")).toBe(
      "access-member-bot%2Fa",
    );
  });

  it("resolves subject from target or detail", () => {
    expect(
      resolveAwcProjectActivitySubjectUserId({
        targetUserId: "user-1",
        actorUserId: "owner",
        detail: {},
      }),
    ).toBe("user-1");
    expect(
      resolveAwcProjectActivitySubjectUserId({
        targetUserId: null,
        actorUserId: "owner",
        detail: { subjectUserId: "user-2" },
      }),
    ).toBe("user-2");
  });

  it("formats ISO timestamps or returns raw on parse failure", () => {
    expect(formatAwcProjectActivityWhen("not-a-date")).toBe("not-a-date");
    expect(formatAwcProjectActivityWhen("2026-10-01T10:00:00.000Z")).toMatch(
      /2026/,
    );
  });

  it("humanizes snake_case detail codes", () => {
    expect(humanizeAwcProjectActivityDetailValue("display_name_taken")).toBe(
      "That project nickname is already taken.",
    );
    expect(humanizeAwcProjectActivityDetailValue("allow_claim_deny")).not.toMatch(
      /_/,
    );
  });
});
