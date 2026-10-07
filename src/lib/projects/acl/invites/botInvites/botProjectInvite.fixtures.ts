import type ProjectMembershipRecord from "@/lib/projects/acl/types/ProjectMembershipRecord.type";

export const BOT_INVITE_PROJECT = {
  id: "proj-1",
  ownerUserId: "owner-1",
  deviceId: null,
  name: "Demo",
  folderPath: "/tmp",
  repoUrls: [] as string[],
  defaultBranch: null as string | null,
  lastUsedAt: null,
  createdAt: "2026-10-01T00:00:00.000Z",
  updatedAt: "2026-10-01T00:00:00.000Z",
};

export const BOT_INVITER_MEMBERSHIP: ProjectMembershipRecord = {
  id: "mem-inviter",
  projectId: "proj-1",
  userId: "bot-inviter",
  role: "member",
  status: "active",
  memberKind: "bot",
  teamLabel: "crew",
  scopes: ["acl:self", "project:meta", "peer_sync", "msg:dispatch"],
  projectDisplayName: "Quiet Fox",
  createdAt: "2026-10-01T00:00:00.000Z",
  revokedAt: null,
};

/** Raw project_invites row for a bot-made invite (migration 112 columns). */
export const BOT_MADE_INVITE_ROW = {
  id: "inv-bot-1",
  project_id: "proj-1",
  created_by_user_id: "bot-inviter",
  token_hash: "hash",
  team_label: "crew",
  scopes: ["acl:self", "project:meta", "peer_sync", "msg:dispatch"],
  max_uses: 1,
  uses_remaining: 0,
  expires_at: "2026-10-08T01:00:00.000Z",
  revoked_at: null,
  created_at: "2026-10-08T00:30:00.000Z",
  auto_approve: false,
  platform: null,
  created_by_membership_id: "mem-inviter",
  bound_owner_user_id: "owner-1",
};

export const BOT_INVITE_PENDING_ROW = {
  id: "req-bot-1",
  project_id: "proj-1",
  requester_user_id: "bot-sibling",
  invited_by_user_id: "bot-inviter",
  reason: "invite_redeem",
  requested_scopes: ["acl:self", "project:meta", "peer_sync", "msg:dispatch"],
  status: "pending",
  decided_by_user_id: null,
  decided_at: null,
  created_at: "2026-10-08T00:31:00.000Z",
  expires_at: "2026-10-22T00:31:00.000Z",
  invite_id: "inv-bot-1",
  team_label: "crew",
  suggested_project_display_name: "Bright Owl",
};

/** SQL stub: claim returns `claimRows`, pending insert returns one row. */
export const stubBotRedeemSql = (
  sqlMock: {
    mockImplementation: (
      fn: (strings: TemplateStringsArray) => Promise<unknown>,
    ) => unknown;
  },
  claimRows: readonly Record<string, unknown>[],
): void => {
  sqlMock.mockImplementation(async (strings: TemplateStringsArray) => {
    const q = String(strings);
    if (q.includes("uses_remaining = uses_remaining - 1")) return claimRows;
    if (q.includes("INSERT INTO project_access_requests")) {
      return [BOT_INVITE_PENDING_ROW];
    }
    return [];
  });
};
