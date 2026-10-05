export const REDEEM_TEST_INVITE = {
  id: "inv-1",
  projectId: "proj-1",
  createdByUserId: "owner",
  email: null,
  role: "member" as const,
  maxUses: 1,
  usesRemaining: 1,
  expiresAt: "2026-10-20T00:00:00.000Z",
  revokedAt: null,
  redeemedAt: null,
  redeemedByUserId: null,
  createdAt: "2026-10-05T09:00:00.000Z",
};

export const REDEEM_TEST_MEMBERSHIP = {
  id: "mem-1",
  projectId: "proj-1",
  userId: "user-1",
  role: "member" as const,
  status: "active" as const,
  memberKind: "human" as const,
  teamLabel: null,
  scopes: [],
  projectDisplayName: null,
  createdAt: "2026-10-05T10:00:00.000Z",
  revokedAt: null,
};
