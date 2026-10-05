import type ProjectMembershipRecord from "@/lib/projects/acl/types/ProjectMembershipRecord.type";

/** Seat fields that decide whether an active membership may post messages. */
export type ProjectMessagePostSeat = Pick<
  ProjectMembershipRecord,
  "role" | "memberKind" | "scopes" | "projectDisplayName"
>;

export type ProjectMessagePostDenyCode =
  | "viewer_read_only"
  | "naming_required"
  | "missing_scope";

export type ProjectMessagePostAccess =
  | { readonly ok: true; readonly projectDisplayName: string }
  | { readonly ok: false; readonly code: ProjectMessagePostDenyCode };

/** Locked UX: role viewer is read-only on project messages (inbox read only). */
export const isProjectMessageReadOnlyRole = (role: unknown): boolean =>
  role === "viewer";

/**
 * One post/dispatch gate for an active membership (MCP + session HTTP).
 * - viewer (human-only role): never posts → viewer_read_only
 * - every poster needs a project nickname → naming_required
 * - human member: role grants posting (human seats carry no scopes)
 * - bot (memberKind bot or absent): unchanged, needs msg:dispatch scope
 */
export const decideProjectMessagePostAccess = (
  seat: ProjectMessagePostSeat,
): ProjectMessagePostAccess => {
  if (isProjectMessageReadOnlyRole(seat.role)) {
    return { ok: false, code: "viewer_read_only" };
  }
  const projectDisplayName = seat.projectDisplayName;
  if (!projectDisplayName) {
    return { ok: false, code: "naming_required" };
  }
  if (seat.memberKind !== "human" && !seat.scopes.includes("msg:dispatch")) {
    return { ok: false, code: "missing_scope" };
  }
  return { ok: true, projectDisplayName };
};
