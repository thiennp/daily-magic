export type ClaimInsertFailCode =
  | "already_member"
  | "display_name_taken";

export const classifyClaimInsertError = (
  error: unknown,
): ClaimInsertFailCode | null => {
  const message = error instanceof Error ? error.message : String(error);
  if (message.includes("project_memberships_display_name_active_idx")) {
    return "display_name_taken";
  }
  if (
    message.includes("project_display_name") &&
    (message.includes("unique") || message.includes("duplicate"))
  ) {
    return "display_name_taken";
  }
  if (
    message.includes("project_memberships_project_user_active_idx") ||
    message.includes("unique") ||
    message.includes("duplicate")
  ) {
    return "already_member";
  }
  return null;
};
