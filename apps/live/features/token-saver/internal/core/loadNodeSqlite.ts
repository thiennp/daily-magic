import type { DatabaseSync } from "node:sqlite";

/** First Node lines with `node:sqlite` unflagged (22.13+, 23.4+). */
export const NODE_SQLITE_MIN_NODE_VERSION_LABEL = "22.13";

export interface NodeSqliteModule {
  readonly DatabaseSync: typeof DatabaseSync;
}

export type NodeSqliteAvailability =
  | { readonly ok: true; readonly sqlite: NodeSqliteModule }
  | { readonly ok: false; readonly reason: string };

export type GetBuiltinModule = (id: string) => unknown;

const isNodeSqliteModule = (value: unknown): value is NodeSqliteModule =>
  typeof value === "object" &&
  value !== null &&
  typeof (value as { readonly DatabaseSync?: unknown }).DatabaseSync ===
    "function";

/**
 * Capability check without a static `node:sqlite` import: a missing module
 * (Node 20 / 22.12, or no `process.getBuiltinModule` before Node 20.16) is
 * reported as unavailable instead of throwing at bundle load.
 */
export const resolveNodeSqliteAvailability = (input: {
  readonly getBuiltinModule: GetBuiltinModule | null;
  readonly nodeVersion: string;
}): NodeSqliteAvailability => {
  const unavailable: NodeSqliteAvailability = {
    ok: false,
    reason: `Node ${input.nodeVersion} has no node:sqlite (needs Node ${NODE_SQLITE_MIN_NODE_VERSION_LABEL}+)`,
  };
  if (input.getBuiltinModule === null) {
    return unavailable;
  }
  try {
    const loaded = input.getBuiltinModule("node:sqlite");
    return isNodeSqliteModule(loaded)
      ? { ok: true, sqlite: loaded }
      : unavailable;
  } catch {
    return unavailable;
  }
};

const readProcessGetBuiltinModule = (): GetBuiltinModule | null =>
  typeof process.getBuiltinModule === "function"
    ? (id: string): unknown => process.getBuiltinModule(id)
    : null;

const availabilityCache = new Map<"process", NodeSqliteAvailability>();

/** Loads `node:sqlite` once per process, at first use. */
export const loadNodeSqlite = (): NodeSqliteAvailability => {
  const cached = availabilityCache.get("process");
  if (cached !== undefined) {
    return cached;
  }
  const availability = resolveNodeSqliteAvailability({
    getBuiltinModule: readProcessGetBuiltinModule(),
    nodeVersion: process.version,
  });
  availabilityCache.set("process", availability);
  return availability;
};

/** Throws a clear error when SQLite is unavailable (callers degrade to "none"). */
export const requireNodeSqlite = (): NodeSqliteModule => {
  const availability = loadNodeSqlite();
  if (!availability.ok) {
    throw new Error(`Pitfall cache unavailable: ${availability.reason}`);
  }
  return availability.sqlite;
};

/** One startup log line when the pitfall cache is off; null when SQLite works. */
export const describePitfallCacheAvailability = (): string | null => {
  const availability = loadNodeSqlite();
  return availability.ok
    ? null
    : `[agent-witch] Pitfall cache (check_context) is off: ${availability.reason}. Everything else runs.`;
};
