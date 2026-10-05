import { describe, expect, it } from "vitest";

import { isValidProjectComputerHistoryProjectId } from "./isValidProjectComputerHistoryProjectId";

describe("isValidProjectComputerHistoryProjectId", () => {
  it("accepts plain ids", () => {
    expect(isValidProjectComputerHistoryProjectId("proj-1")).toBe(true);
  });

  it("rejects empty, dots, separators, and ..", () => {
    expect(isValidProjectComputerHistoryProjectId("")).toBe(false);
    expect(isValidProjectComputerHistoryProjectId("  ")).toBe(false);
    expect(isValidProjectComputerHistoryProjectId(".hidden")).toBe(false);
    expect(isValidProjectComputerHistoryProjectId("a/b")).toBe(false);
    expect(isValidProjectComputerHistoryProjectId("a\\b")).toBe(false);
    expect(isValidProjectComputerHistoryProjectId("a..b")).toBe(false);
    expect(isValidProjectComputerHistoryProjectId(" trimmed ")).toBe(false);
  });
});
