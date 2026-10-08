import { describe, expect, it } from "vitest";

import { resolveAgentRunTitleSummary } from "@/lib/dispatch/resolveAgentRunTitleSummary";

/** 7daeea78: 812e1568's Tasks row title became "Finished on your computer.". */
describe("resolveAgentRunTitleSummary generic status lines", () => {
  it("never uses a generic status line as the title", () => {
    for (const reportSummary of [
      "Finished on your computer.",
      "Finished on your computer. Changed: 2 files changed, 618 insertions(+).",
    ]) {
      expect(
        resolveAgentRunTitleSummary({ status: "completed", reportSummary }),
      ).toBeNull();
    }
  });

  it("keeps a real summary", () => {
    expect(
      resolveAgentRunTitleSummary({
        status: "completed",
        reportSummary: "Styled home and settings screens.",
      }),
    ).toBe("Styled home and settings screens.");
  });
});
