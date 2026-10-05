import { describe, expect, it } from "vitest";

import isProjectDeleteConfirmNameMatch from "@/features/projects/utils/isProjectDeleteConfirmNameMatch";

describe("isProjectDeleteConfirmNameMatch", () => {
  it("enables only on the exact project name (outer spaces ignored)", () => {
    expect(isProjectDeleteConfirmNameMatch("Client repo", "Client repo")).toBe(
      true,
    );
    expect(
      isProjectDeleteConfirmNameMatch("  Client repo ", "Client repo"),
    ).toBe(true);
  });

  it("stays disabled for partial, different-case, or empty input", () => {
    expect(isProjectDeleteConfirmNameMatch("", "Client repo")).toBe(false);
    expect(isProjectDeleteConfirmNameMatch("Client", "Client repo")).toBe(
      false,
    );
    expect(isProjectDeleteConfirmNameMatch("client repo", "Client repo")).toBe(
      false,
    );
    expect(isProjectDeleteConfirmNameMatch("", "   ")).toBe(false);
  });
});
