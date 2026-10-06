import { describe, expect, it } from "vitest";

import {
  describePitfallCacheAvailability,
  loadNodeSqlite,
  NODE_SQLITE_MIN_NODE_VERSION_LABEL,
  requireNodeSqlite,
  resolveNodeSqliteAvailability,
} from "./loadNodeSqlite";

class FakeDatabaseSync {}

describe("resolveNodeSqliteAvailability", () => {
  it("AWL-SQLITE-001: no process.getBuiltinModule (Node < 20.16) is unavailable", () => {
    const result = resolveNodeSqliteAvailability({
      getBuiltinModule: null,
      nodeVersion: "v20.10.0",
    });
    expect(result).toEqual({
      ok: false,
      reason: `Node v20.10.0 has no node:sqlite (needs Node ${NODE_SQLITE_MIN_NODE_VERSION_LABEL}+)`,
    });
  });

  it("AWL-SQLITE-002: getBuiltinModule returning undefined (Node 20 / 22.12) is unavailable", () => {
    const result = resolveNodeSqliteAvailability({
      getBuiltinModule: () => undefined,
      nodeVersion: "v22.12.0",
    });
    expect(result.ok).toBe(false);
  });

  it("AWL-SQLITE-003: a throwing loader or a module without DatabaseSync is unavailable", () => {
    expect(
      resolveNodeSqliteAvailability({
        getBuiltinModule: () => {
          throw new Error("ERR_UNKNOWN_BUILTIN_MODULE");
        },
        nodeVersion: "v20.19.2",
      }).ok,
    ).toBe(false);
    expect(
      resolveNodeSqliteAvailability({
        getBuiltinModule: () => ({ DatabaseSync: "nope" }),
        nodeVersion: "v22.13.0",
      }).ok,
    ).toBe(false);
  });

  it("AWL-SQLITE-004: a module with a DatabaseSync constructor is available", () => {
    const requested: string[] = [];
    const result = resolveNodeSqliteAvailability({
      getBuiltinModule: (id) => {
        requested.push(id);
        return { DatabaseSync: FakeDatabaseSync };
      },
      nodeVersion: "v22.13.0",
    });
    expect(requested).toEqual(["node:sqlite"]);
    expect(result.ok && result.sqlite.DatabaseSync).toBe(FakeDatabaseSync);
  });
});

describe("loadNodeSqlite on the test runtime", () => {
  const runtimeHasSqlite =
    typeof process.getBuiltinModule === "function" &&
    process.getBuiltinModule("node:sqlite") !== undefined;

  it("AWL-SQLITE-005: matches the runtime, caches, and agrees with the startup note", () => {
    const first = loadNodeSqlite();
    expect(loadNodeSqlite()).toBe(first);
    expect(first.ok).toBe(runtimeHasSqlite);
    if (first.ok) {
      expect(requireNodeSqlite()).toBe(first.sqlite);
      expect(describePitfallCacheAvailability()).toBeNull();
    } else {
      expect(() => requireNodeSqlite()).toThrow(/Pitfall cache unavailable/);
      expect(describePitfallCacheAvailability()).toMatch(
        /check_context\) is off/,
      );
    }
  });
});
