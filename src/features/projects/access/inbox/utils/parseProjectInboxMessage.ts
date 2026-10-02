import type AwcProjectInboxMessage from "@/features/projects/access/inbox/types/awcProjectInboxMessage.type";
import type { AwcProjectInboxRefs } from "@/features/projects/access/inbox/types/awcProjectInboxMessage.type";

const REF_KEYS = ["prUrl", "commitSha", "localPath", "allowClaimId"] as const;

const asRefs = (value: unknown): AwcProjectInboxRefs => {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }
  const record = value as Record<string, unknown>;
  const out: Record<string, string> = {};
  for (const key of REF_KEYS) {
    const entry = record[key];
    if (typeof entry === "string" && entry.length > 0) {
      out[key] = entry;
    }
  }
  return out;
};

const asOptionalString = (value: unknown): string | null =>
  typeof value === "string" && value.length > 0 ? value : null;

export const parseProjectInboxMessage = (
  value: unknown,
): AwcProjectInboxMessage | null => {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    return null;
  }
  const row = value as Record<string, unknown>;
  const messageId = typeof row.messageId === "string" ? row.messageId : null;
  const kind = typeof row.kind === "string" ? row.kind : null;
  const summary = typeof row.summary === "string" ? row.summary : null;
  const createdAt = typeof row.createdAt === "string" ? row.createdAt : null;
  if (
    messageId === null ||
    kind === null ||
    summary === null ||
    createdAt === null
  ) {
    return null;
  }
  return {
    messageId,
    kind,
    summary,
    refs: asRefs(row.refs),
    fromProjectDisplayName: asOptionalString(row.fromProjectDisplayName),
    fromMembershipId: asOptionalString(row.fromMembershipId),
    toProjectDisplayName: asOptionalString(row.toProjectDisplayName),
    toMembershipId: asOptionalString(row.toMembershipId),
    toUserId: asOptionalString(row.toUserId),
    toTeamLabel: asOptionalString(row.toTeamLabel),
    createdAt,
    ackedAt: typeof row.ackedAt === "string" ? row.ackedAt : null,
  };
};
