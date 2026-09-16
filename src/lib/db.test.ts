import { afterEach, describe, expect, it, vi } from "vitest";

import { isDatabaseUrlConfigured } from "@/lib/db";

describe("isDatabaseUrlConfigured", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it("returns false when DATABASE_URL is missing or blank", () => {
    vi.stubEnv("DATABASE_URL", "");
    expect(isDatabaseUrlConfigured()).toBe(false);
  });

  it("returns true when DATABASE_URL is non-empty", () => {
    vi.stubEnv("DATABASE_URL", "postgres://example");
    expect(isDatabaseUrlConfigured()).toBe(true);
  });
});

describe("getSql", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it("throws when DATABASE_URL is not set", async () => {
    vi.stubEnv("DATABASE_URL", "");
    vi.resetModules();
    const { getSql } = await import("@/lib/db");
    expect(() => getSql()).toThrow("DATABASE_URL is not set");
  });
});
