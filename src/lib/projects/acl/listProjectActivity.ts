import { resolveProjectAclAccess } from "@/lib/projects/acl/resolveProjectAclAccess";
import type ProjectActivityEvent from "@/lib/projects/acl/types/ProjectActivityEvent.type";

export type ListProjectActivityResult =
  | {
      readonly ok: true;
      readonly events: readonly ProjectActivityEvent[];
      readonly nextCursor: string | null;
    }
  | { readonly ok: false; readonly code: "not_found" | "forbidden" };

/**
 * Project activity feed. History dropped from Neon (Lead Option A).
 * Auth unchanged (owner or active member with project:meta); returns empty
 * list 200 until Product removes the Access Activity panel (PR2).
 */
export const listProjectActivity = async (input: {
  readonly projectId: string;
  readonly actorUserId: string;
  readonly since?: string | null;
  readonly cursor?: string | null;
  readonly limit?: number;
}): Promise<ListProjectActivityResult> => {
  void input.since;
  void input.cursor;
  void input.limit;
  const access = await resolveProjectAclAccess({
    projectId: input.projectId,
    actorUserId: input.actorUserId,
    requiredScopes: ["project:meta"],
  });
  if (!access.ok) {
    return {
      ok: false,
      code: access.reason === "not_found" ? "not_found" : "forbidden",
    };
  }

  return { ok: true, events: [], nextCursor: null };
};
