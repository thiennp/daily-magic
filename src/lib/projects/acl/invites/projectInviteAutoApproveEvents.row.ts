/** Shared invite row for durable auto-approve event tests. */
export const inviteAutoApproveRow = (
  overrides: Record<string, unknown> = {},
) => ({
  id: "inv-aaaa1111-bbbb-cccc-dddd-eeeeeeeeeeee",
  project_id: "proj-1",
  created_by_user_id: "owner-1",
  token_hash: "hash",
  team_label: null,
  scopes: ["acl:self"],
  max_uses: 1,
  uses_remaining: 1,
  expires_at: "2026-10-09T00:00:00.000Z",
  revoked_at: null,
  created_at: "2026-10-06T00:00:00.000Z",
  auto_approve: false,
  ...overrides,
});
