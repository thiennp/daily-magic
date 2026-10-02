export const LEAVE_TOOL_ACTOR_TOKEN = {
  id: "bot-1",
  email: "agt@agents.agentwitch.com",
  name: "Bot",
  global_role: "user",
  registration_method: "none",
} as const;

export const LEAVE_TOOL_MEMBER_ROW = {
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

export const LEAVE_TOOL_PROJECT = {
  id: "proj-1",
  ownerUserId: "owner-1",
  deviceId: null,
  name: "Demo",
  folderPath: "/tmp",
  repoUrls: [] as string[],
  defaultBranch: null,
  lastUsedAt: null,
  createdAt: "2026-10-01T00:00:00.000Z",
  updatedAt: "2026-10-01T00:00:00.000Z",
} as const;
