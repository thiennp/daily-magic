import { describe, expect, it } from "vitest";

import { formatPitfallBotLine } from "./formatPitfallBotLine";

describe("formatPitfallBotLine", () => {
  it("joins id and one-line avoidance", () => {
    expect(
      formatPitfallBotLine({
        id: " arch-max-lines ",
        avoidance: "Run the check.\nThen land.",
      }),
    ).toBe("arch-max-lines|Run the check. Then land.");
  });
});
