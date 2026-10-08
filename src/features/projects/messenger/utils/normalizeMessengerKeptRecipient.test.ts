import { describe, expect, it } from "vitest";

import { normalizeMessengerKeptRecipient } from "@/features/projects/messenger/utils/normalizeMessengerKeptRecipient";

describe("normalizeMessengerKeptRecipient (093103ac single recipient)", () => {
  it("keeps one assistant", () => {
    expect(
      normalizeMessengerKeptRecipient({
        kind: "assistant",
        membershipId: "m1",
      }),
    ).toEqual({ kind: "assistant", membershipId: "m1" });
  });

  it("maps a legacy single-id assistants row", () => {
    expect(
      normalizeMessengerKeptRecipient({
        kind: "assistants",
        membershipIds: ["m1"],
      }),
    ).toEqual({ kind: "assistant", membershipId: "m1" });
  });

  it("drops legacy everyone and multi-assistant rows", () => {
    expect(normalizeMessengerKeptRecipient({ kind: "everyone" })).toBeNull();
    expect(
      normalizeMessengerKeptRecipient({
        kind: "assistants",
        membershipIds: ["m1", "m2"],
      }),
    ).toBeNull();
    expect(normalizeMessengerKeptRecipient(null)).toBeNull();
    expect(normalizeMessengerKeptRecipient({ kind: "assistant" })).toBeNull();
  });
});
