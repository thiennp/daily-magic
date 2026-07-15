import { describe, expect, it } from "vitest";

import resolveHomeSetupNestedBoxClass from "@/features/home/resolveHomeSetupNestedBoxClass";

describe("resolveHomeSetupNestedBoxClass", () => {
  it("returns the full box class outside Your setup", () => {
    expect(resolveHomeSetupNestedBoxClass(false, "border p-4", "mt-4")).toBe(
      "border p-4",
    );
  });

  it("returns the embedded spacing class inside Your setup", () => {
    expect(resolveHomeSetupNestedBoxClass(true, "border p-4", "mt-4")).toBe(
      "mt-4",
    );
  });
});
