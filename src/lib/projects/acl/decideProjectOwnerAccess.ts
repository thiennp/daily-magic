export type ProjectOwnerAccessDecision =
  | { readonly allow: true }
  | { readonly allow: false; readonly reason: "not_found" | "forbidden" };

/**
 * Pure permission rule for owner-only Project Access writes.
 * No project → not_found. Signed-in user is not the project owner → forbidden.
 */
export const decideProjectOwnerAccess = (input: {
  readonly actorUserId: string;
  readonly projectOwnerUserId: string | null;
}): ProjectOwnerAccessDecision => {
  if (input.projectOwnerUserId === null) {
    return { allow: false, reason: "not_found" };
  }
  if (input.projectOwnerUserId !== input.actorUserId) {
    return { allow: false, reason: "forbidden" };
  }
  return { allow: true };
};
