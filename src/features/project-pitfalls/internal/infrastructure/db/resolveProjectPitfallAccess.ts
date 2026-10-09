import type { ProjectPitfallFailure } from "@/features/project-pitfalls/internal/core/projectPitfall.type";
import { getActiveProjectMembership } from "@/lib/projects/acl/getActiveProjectMembership";
import { getUserProjectById } from "@/lib/projects/userProjectQueries";

/** ACL = project membership: owner, active member or read-only viewer; else not_found / forbidden. */
export const resolveProjectPitfallAccess = async (input: {
  readonly projectId: string;
  readonly actorUserId: string;
}): Promise<
  | { readonly ok: true; readonly role: "owner" | "member" | "viewer" }
  | ProjectPitfallFailure
> => {
  const project = await getUserProjectById(input.projectId);
  if (project === null) {
    return { ok: false, code: "not_found" };
  }
  if (project.ownerUserId === input.actorUserId) {
    return { ok: true, role: "owner" };
  }
  const membership = await getActiveProjectMembership(
    input.projectId,
    input.actorUserId,
  );
  if (membership === null) return { ok: false, code: "forbidden" };
  return { ok: true, role: membership.role === "viewer" ? "viewer" : "member" };
};
