export const ACL_APPROVE_REQUEST_ROW = {
  id: "req-1",
  project_id: "proj-1",
  requester_user_id: "bot-1",
  invited_by_user_id: null,
  reason: null,
  requested_scopes: ["acl:self", "project:meta", "peer_sync"],
  status: "pending",
  decided_by_user_id: null,
  decided_at: null,
  created_at: "2026-10-01T00:00:00.000Z",
  expires_at: "2026-10-15T00:00:00.000Z",
  invite_id: null,
  team_label: null,
  suggested_project_display_name: null,
};

export const ACL_APPROVE_MEMBER_ROW = {
  id: "mem-1",
  project_id: "proj-1",
  user_id: "bot-1",
  role: "member",
  status: "active",
  team_label: null,
  scopes: ["acl:self", "project:meta", "peer_sync", "msg:dispatch"],
  project_display_name: "Buni",
  created_at: "2026-10-01T00:00:00.000Z",
  revoked_at: null,
};
