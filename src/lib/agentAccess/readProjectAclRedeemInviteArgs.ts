import { parseProjectInviteJoinPlatform } from "@/lib/projects/acl/invites/projectInviteJoinPlatform.constant";

const readSuggestedDisplayName = (args: unknown): string | null => {
  if (args === null || typeof args !== "object") {
    return null;
  }
  const record = args as {
    suggestedProjectDisplayName?: unknown;
    projectDisplayName?: unknown;
  };
  if (typeof record.suggestedProjectDisplayName === "string") {
    return record.suggestedProjectDisplayName;
  }
  // Alias accepted for convenience (catalog documents suggestedProjectDisplayName).
  if (typeof record.projectDisplayName === "string") {
    return record.projectDisplayName;
  }
  return null;
};

/** redeem_project_invite args: token, nickname suggestion, joinType platform. */
export const readProjectAclRedeemInviteArgs = (
  args: unknown,
): {
  readonly token: string | null;
  readonly suggested: string | null;
  readonly joinPlatform: string | null;
} => {
  const record =
    args !== null && typeof args === "object"
      ? (args as { token?: unknown; joinType?: unknown })
      : {};
  return {
    token: typeof record.token === "string" ? record.token : null,
    suggested: readSuggestedDisplayName(args),
    joinPlatform: parseProjectInviteJoinPlatform(record.joinType),
  };
};
