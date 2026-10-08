import type { SkillIndexDb } from "./skillIndex.types";
import type { SkillToolDeps } from "./skillTools.types";

export type ToolScope = {
  readonly db: SkillIndexDb;
  readonly projectId: string;
};

export const readArgs = (raw: unknown): Readonly<Record<string, unknown>> =>
  typeof raw === "object" && raw !== null && !Array.isArray(raw)
    ? (raw as Readonly<Record<string, unknown>>)
    : {};

export const readString = (
  args: Readonly<Record<string, unknown>>,
  key: string,
): string => (typeof args[key] === "string" ? args[key].trim() : "");

/** Resolve db + project for a call, or the reason it cannot be served. */
export const resolveToolScope = (
  deps: SkillToolDeps,
  args: Readonly<Record<string, unknown>>,
): ToolScope | { readonly unavailable: string } => {
  const db = deps.openDb();
  if (db === null) {
    return { unavailable: "skills_unavailable" };
  }
  const cwd = readString(args, "cwd") || deps.defaultCwd?.() || "";
  const projectId = cwd.length > 0 ? deps.resolveProjectId(cwd) : null;
  return projectId === null
    ? { unavailable: "no_project_for_cwd" }
    : { db, projectId };
};
