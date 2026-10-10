import { afterEach, describe, expect, it, vi } from "vitest";

import {
  createSqlFromPool,
  isDatabaseUrlConfigured,
  toParameterizedQuery,
  unsafeSql,
} from "@/lib/db";

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

const tag = (strings: TemplateStringsArray, ...values: unknown[]) => ({
  strings,
  values,
});

describe("toParameterizedQuery", () => {
  it("numbers each interpolation as a bind parameter", () => {
    const { strings, values } =
      tag`SELECT * FROM t WHERE a = ${1} AND b = ${"x"}`;

    expect(toParameterizedQuery(strings, values)).toEqual({
      text: "SELECT * FROM t WHERE a = $1 AND b = $2",
      values: [1, "x"],
    });
  });

  it("splices unsafe fragments inline and renumbers the bind parameters", () => {
    const { strings, values } =
      tag`SELECT 1 WHERE a = ${1} AND ${unsafeSql("b IS NULL")} AND c = ${2}`;

    expect(toParameterizedQuery(strings, values)).toEqual({
      text: "SELECT 1 WHERE a = $1 AND b IS NULL AND c = $2",
      values: [1, 2],
    });
  });

  it("keeps a query without interpolations unchanged", () => {
    const { strings, values } = tag`SELECT 1`;

    expect(toParameterizedQuery(strings, values)).toEqual({
      text: "SELECT 1",
      values: [],
    });
  });
});

describe("createSqlFromPool", () => {
  it("resolves to the rows of the pool result", async () => {
    const query = vi.fn().mockResolvedValue({ rows: [{ id: "a" }] });
    const sql = createSqlFromPool({ query });

    const rows = await sql`SELECT id FROM t WHERE id = ${"a"}`;

    expect(rows).toEqual([{ id: "a" }]);
    expect(query).toHaveBeenCalledWith("SELECT id FROM t WHERE id = $1", ["a"]);
  });
});
