export const skillActorRoleProjectFixture = {
  id: "proj-1",
  ownerUserId: "owner-1",
  deviceId: null,
  name: "P",
  folderPath: "/tmp",
  repoUrls: [] as string[],
  defaultBranch: null as string | null,
  lastUsedAt: null,
  createdAt: "2026-10-01T00:00:00.000Z",
  updatedAt: "2026-10-01T00:00:00.000Z",
};

export const skillActorRoleSeatFixture = (
  role: "member" | "viewer" | "owner",
  memberKind: "human" | "bot",
) => ({
  id: "mem-1",
  projectId: "proj-1",
  userId: "actor-1",
  role,
  status: "active" as const,
  memberKind,
  teamLabel: null,
  scopes: [] as const,
  projectDisplayName: "Alex",
  createdAt: "2026-10-01T00:00:00.000Z",
  revokedAt: null,
});
