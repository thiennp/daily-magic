import type {
  AwcMembershipView,
  AwcPendingRequestView,
} from "@/features/projects/access/types/awcProjectAccessContract.type";

/** Normalize legacy access GET rows until eng ships enriched MembershipView. */
const mapMember = (row: Record<string, unknown>): AwcMembershipView => ({
  id: String(row.id),
  userId: String(row.userId ?? row.user_id ?? ""),
  role: row.role === "owner" ? "owner" : "member",
  status:
    row.status === "revoked"
      ? "revoked"
      : row.status === "naming_required"
        ? "naming_required"
        : "active",
  teamLabel:
    typeof row.teamLabel === "string"
      ? row.teamLabel
      : typeof row.team_label === "string"
        ? row.team_label
        : null,
  scopes: Array.isArray(row.scopes)
    ? row.scopes.filter((s): s is string => typeof s === "string")
    : [],
  projectDisplayName:
    typeof row.projectDisplayName === "string"
      ? row.projectDisplayName
      : null,
  isAgent: row.isAgent === true,
  displayName:
    typeof row.displayName === "string" ? row.displayName : undefined,
  email: typeof row.email === "string" ? row.email : undefined,
  image: typeof row.image === "string" ? row.image : undefined,
  createdAt: String(row.createdAt ?? row.created_at ?? ""),
  revokedAt:
    typeof row.revokedAt === "string"
      ? row.revokedAt
      : typeof row.revoked_at === "string"
        ? row.revoked_at
        : null,
});

const mapPending = (row: Record<string, unknown>): AwcPendingRequestView => ({
  id: String(row.id),
  requesterUserId: String(row.requesterUserId ?? row.requester_user_id ?? ""),
  requesterIsAgent: row.requesterIsAgent === true,
  requesterLabel:
    typeof row.requesterLabel === "string" ? row.requesterLabel : null,
  requestedScopes: Array.isArray(row.requestedScopes)
    ? row.requestedScopes.filter((s): s is string => typeof s === "string")
    : Array.isArray(row.requested_scopes)
      ? row.requested_scopes.filter((s): s is string => typeof s === "string")
      : [],
  teamLabel:
    typeof row.teamLabel === "string"
      ? row.teamLabel
      : typeof row.team_label === "string"
        ? row.team_label
        : null,
  reason: typeof row.reason === "string" ? row.reason : null,
  createdAt: String(row.createdAt ?? row.created_at ?? ""),
  expiresAt:
    typeof row.expiresAt === "string"
      ? row.expiresAt
      : typeof row.expires_at === "string"
        ? row.expires_at
        : null,
});

export const fetchProjectAccess = async (projectId: string) => {
  const response = await fetch(`/api/projects/${projectId}/access`, {
    cache: "no-store",
  });
  const body: unknown = await response.json().catch(() => null);
  const ok =
    typeof body === "object" &&
    body !== null &&
    (body as { ok?: unknown }).ok === true;
  const membersRaw =
    ok && Array.isArray((body as { members?: unknown }).members)
      ? ((body as { members: Record<string, unknown>[] }).members)
      : [];
  const pendingRaw =
    ok && Array.isArray((body as { pendingRequests?: unknown }).pendingRequests)
      ? ((body as { pendingRequests: Record<string, unknown>[] }).pendingRequests)
      : [];
  return {
    ok,
    members: membersRaw.map(mapMember),
    pendingRequests: pendingRaw.map(mapPending),
    errorMessage:
      typeof body === "object" &&
      body !== null &&
      typeof (body as { errorMessage?: unknown }).errorMessage === "string"
        ? (body as { errorMessage: string }).errorMessage
        : undefined,
  };
};

/** @deprecated Prefer patchProjectAccess (contract PATCH). Kept for folder-refs only. */
export const postProjectAccessAction = async (
  url: string,
  body?: Record<string, unknown>,
): Promise<{ readonly ok: boolean; readonly errorMessage?: string }> => {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  return response.json() as Promise<{
    readonly ok: boolean;
    readonly errorMessage?: string;
  }>;
};

export const fetchProjectFolderRefs = async (projectId: string) => {
  const response = await fetch(`/api/projects/${projectId}/folder-refs`, {
    cache: "no-store",
  });
  return response.json() as Promise<{
    readonly ok: boolean;
    readonly folderRefs?: readonly {
      readonly id: string;
      readonly machineOrDeviceRef: string;
      readonly folderPath: string;
    }[];
  }>;
};
