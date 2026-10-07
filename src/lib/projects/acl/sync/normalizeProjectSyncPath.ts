import {
  PROJECT_SYNC_CHAT_PATH_PREFIX,
  PROJECT_SYNC_KINDS,
  type ProjectSyncKind,
} from "@/lib/projects/acl/sync/projectSync.constants";

export type NormalizeProjectSyncPathResult =
  | {
      readonly ok: true;
      readonly path: string;
      readonly kind: ProjectSyncKind;
    }
  | { readonly ok: false; readonly code: "invalid_path" | "kind_not_allowed" };

const KIND_BY_PREFIX: readonly {
  readonly prefix: string;
  readonly kind: ProjectSyncKind;
}[] = [
  { prefix: PROJECT_SYNC_CHAT_PATH_PREFIX, kind: "chat" },
  { prefix: "skills/", kind: "skill" },
  { prefix: "knowledge/", kind: "knowledge" },
  { prefix: "tasks/", kind: "summary" },
  { prefix: "outcomes/", kind: "summary" },
];

/**
 * Store-relative path only (no .., no absolute). Infers kind from allowlist.
 */
export const normalizeProjectSyncPath = (
  raw: string,
): NormalizeProjectSyncPathResult => {
  const path = raw.trim().replace(/^\/+/, "").replace(/\\/g, "/");
  if (
    path.length === 0 ||
    path.includes("..") ||
    path.startsWith(".agentwitch/") ||
    path.includes("//")
  ) {
    return { ok: false, code: "invalid_path" };
  }
  for (const entry of KIND_BY_PREFIX) {
    if (path.startsWith(entry.prefix)) {
      if (!(PROJECT_SYNC_KINDS as readonly string[]).includes(entry.kind)) {
        return { ok: false, code: "kind_not_allowed" };
      }
      return { ok: true, path, kind: entry.kind };
    }
  }
  return { ok: false, code: "kind_not_allowed" };
};
