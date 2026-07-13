import { afterEach, describe, expect, it } from "vitest";

import isValidDevSecret from "@/lib/auth/isValidDevSecret";

describe("isValidDevSecret", () => {
  afterEach(() => {
    delete process.env.SECRET;
  });

  it("returns false when SECRET is not configured", () => {
    expect(isValidDevSecret("anything")).toBe(false);
  });

  it("returns true when candidate matches configured SECRET", () => {
    process.env.SECRET = "test-secret";
    expect(isValidDevSecret("test-secret")).toBe(true);
  });

  it("returns false when candidate does not match", () => {
    process.env.SECRET = "test-secret";
    expect(isValidDevSecret("wrong")).toBe(false);
  });
});
