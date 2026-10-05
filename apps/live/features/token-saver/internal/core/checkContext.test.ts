import { describe, expect, it, vi } from "vitest";

import type { Pitfall } from "../../public-api/types";
import { checkContext, type CheckContextRegistry } from "./checkContext";

const samplePitfall = (id: string, keywords: string[]): Pitfall => ({
  id,
  projectId: null,
  symptom: "s",
  cause: "c",
  avoidance: `Fix ${id}`,
  check: { kind: "id", value: id },
  keywords,
  tags: [],
  source: "seed",
  hitCount: 0,
  lastSeenAt: null,
  severity: "warn",
});

const makeRegistry = (
  matched: readonly Pitfall[],
): CheckContextRegistry & { recordHit: ReturnType<typeof vi.fn> } => ({
  matchPitfalls: vi.fn(() => matched),
  recordHit: vi.fn(() => ({ ok: true })),
});

describe("checkContext", () => {
  it("returns hit, records each match, and caps bot lines", () => {
    const matched = [
      samplePitfall("missing-lock", ["npm install"]),
      samplePitfall("stale-node", ["node"]),
    ];
    const registry = makeRegistry(matched);
    const result = checkContext(
      { registry },
      { projectId: "proj-1", message: "npm install please" },
    );
    expect(result).toEqual({
      status: "hit",
      projectId: "proj-1",
      pitfalls: [
        { id: "missing-lock", avoidance: "Fix missing-lock" },
        { id: "stale-node", avoidance: "Fix stale-node" },
      ],
    });
    expect(registry.recordHit).toHaveBeenCalledTimes(2);
    expect(registry.recordHit).toHaveBeenCalledWith({
      projectId: "proj-1",
      id: "missing-lock",
    });
  });

  it("returns miss when the project exists but nothing matches", () => {
    const registry = makeRegistry([]);
    const result = checkContext(
      { registry },
      { projectId: "proj-1", message: "unrelated" },
    );
    expect(result).toEqual({ status: "miss", projectId: "proj-1" });
    expect(registry.recordHit).not.toHaveBeenCalled();
  });

  it("returns none with promptCreate when no project and cwd present", () => {
    const result = checkContext(
      { registry: makeRegistry([]), resolveProjectId: () => null },
      { cwd: "/tmp/no-project", message: "hi" },
    );
    expect(result).toEqual({ status: "none", promptCreate: true });
  });

  it("returns none silently when declined (terminal)", () => {
    const result = checkContext(
      {
        registry: null,
        isDeclined: () => true,
      },
      { cwd: "/tmp/declined" },
    );
    expect(result).toEqual({ status: "none" });
  });

  it("returns none and logs when the registry throws", () => {
    const logError = vi.fn();
    const registry: CheckContextRegistry = {
      matchPitfalls: () => {
        throw new Error("db locked");
      },
      recordHit: vi.fn(),
    };
    const result = checkContext(
      { registry, logError },
      { projectId: "proj-1", message: "npm install" },
    );
    expect(result).toEqual({ status: "none" });
    expect(logError).toHaveBeenCalledOnce();
  });

  it("keeps the hit when recordHit fails (e.g. SQLITE_BUSY) and logs it", () => {
    const logError = vi.fn();
    const matched = [samplePitfall("missing-lock", ["npm install"])];
    const registry: CheckContextRegistry = {
      matchPitfalls: () => matched,
      recordHit: () => {
        throw new Error("database is locked");
      },
    };
    const result = checkContext(
      { registry, logError },
      { projectId: "proj-1", message: "npm install" },
    );
    expect(result).toEqual({
      status: "hit",
      projectId: "proj-1",
      pitfalls: [{ id: "missing-lock", avoidance: "Fix missing-lock" }],
    });
    expect(logError).toHaveBeenCalledOnce();
  });

  it("checks isDeclined first when cwd is present (no resolve, no lookup)", () => {
    const registry = makeRegistry([samplePitfall("missing-lock", ["npm"])]);
    const resolveProjectId = vi.fn(() => "proj-1");
    const isDeclined = vi.fn(() => true);
    const result = checkContext(
      { registry, resolveProjectId, isDeclined },
      { cwd: "/tmp/declined", projectId: "proj-1", message: "npm install" },
    );
    expect(result).toEqual({ status: "none" });
    expect(isDeclined).toHaveBeenCalledWith("/tmp/declined");
    expect(resolveProjectId).not.toHaveBeenCalled();
    expect(registry.matchPitfalls).not.toHaveBeenCalled();
    expect(registry.recordHit).not.toHaveBeenCalled();
  });

  it("resolves the project after a non-declined cwd", () => {
    const registry = makeRegistry([]);
    const calls: string[] = [];
    const result = checkContext(
      {
        registry,
        isDeclined: () => {
          calls.push("isDeclined");
          return false;
        },
        resolveProjectId: () => {
          calls.push("resolveProjectId");
          return "proj-2";
        },
      },
      { cwd: "/tmp/repo", message: "hi" },
    );
    expect(result).toEqual({ status: "miss", projectId: "proj-2" });
    expect(calls).toEqual(["isDeclined", "resolveProjectId"]);
  });
});
