import { describe, expect, it } from "vitest";

import buildHomeGreeting from "@/features/home/utils/buildHomeGreeting";

describe("buildHomeGreeting", () => {
  it("uses morning greeting before noon", () => {
    expect(
      buildHomeGreeting({
        displayName: "Thien",
        attentionCount: 0,
        isBrandNew: false,
        now: new Date("2026-10-06T09:00:00"),
      }),
    ).toBe("Good morning, Thien. Nothing needs you right now.");
  });

  it("mentions connect for brand-new accounts", () => {
    expect(
      buildHomeGreeting({
        displayName: "Thien",
        attentionCount: 0,
        isBrandNew: true,
        now: new Date("2026-10-06T15:00:00"),
      }),
    ).toBe("Welcome, Thien. Connect this computer to get started.");
  });

  it("counts attention items", () => {
    expect(
      buildHomeGreeting({
        displayName: "Thien",
        attentionCount: 2,
        isBrandNew: false,
        now: new Date("2026-10-06T20:00:00"),
      }),
    ).toBe("Good evening, Thien. 2 things need you.");
  });
});
