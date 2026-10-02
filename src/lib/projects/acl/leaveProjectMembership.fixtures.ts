export const LEAVE_MEMBER_ROW = {
  id: "mem-1",
  project_id: "proj-1",
  user_id: "bot-1",
  role: "member",
  status: "active",
  team_label: null,
  scopes: ["acl:self", "project:meta", "peer_sync"],
  project_display_name: "Buni",
  created_at: "2026-10-01T00:00:00.000Z",
  revoked_at: null,
} as const;

export const LEAVE_PROJECT = {
  id: "proj-1",
  ownerUserId: "owner-1",
  deviceId: "mac-1",
  name: "Demo",
  folderPath: "/tmp/demo",
  repoUrls: [] as string[],
  defaultBranch: null,
  lastUsedAt: null,
  createdAt: "2026-10-01T00:00:00.000Z",
  updatedAt: "2026-10-01T00:00:00.000Z",
} as const;

export const revokedLeaveMemberRow = () => ({
  ...LEAVE_MEMBER_ROW,
  status: "revoked",
  revoked_at: "2026-10-02T12:00:00.000Z",
});
