import type { MyMacDevice } from "@/features/agent/hooks/useMyMacDevices";
import type ProjectCompositionCounts from "@/lib/projects/types/ProjectCompositionCounts.type";
import type ProjectCompositionItem from "@/lib/projects/types/ProjectCompositionItem.type";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";

const now = "2026-10-01T06:00:00.000Z";

export const PROJECTS_STORYBOOK_SAMPLE_PROJECT: UserProjectRecord = {
  id: "storybook-project-1",
  ownerUserId: "storybook-owner",
  deviceId: "storybook-mac-1",
  name: "daily-magic",
  folderPath: "/Users/me/code/daily-magic",
  repoUrls: ["https://github.com/thiennp/daily-magic.git"],
  defaultBranch: "main",
  lastUsedAt: now,
  createdAt: now,
  updatedAt: now,
};

export const PROJECTS_STORYBOOK_DEFAULT_PROJECT: UserProjectRecord = {
  ...PROJECTS_STORYBOOK_SAMPLE_PROJECT,
  id: "storybook-default",
  name: "Default",
  folderPath: "/Users/me/code/default-workspace",
};

export const PROJECTS_STORYBOOK_LONG_NAME_PROJECT: UserProjectRecord = {
  ...PROJECTS_STORYBOOK_SAMPLE_PROJECT,
  id: "storybook-long-name",
  name: "Client proposal harness — Q4 rollout with extra-long title",
  folderPath:
    "/Users/me/Documents/very/long/path/to/some-client-repo-name-that-truncates",
};

export const PROJECTS_STORYBOOK_ONLINE_MAC: MyMacDevice = {
  id: "storybook-mac-1",
  tokenHash: "storybook-local-hash",
  deviceLabel: "MacBook Pro",
  displayName: "Thien MacBook",
  claimedAt: now,
  lastSeenAt: now,
  isConnected: true,
  isOnline: true,
  presenceTier: "live",
  isDispatchReady: true,
  lastHeartbeatAt: now,
  installBundleVersion: "238",
  wakePort: 47892,
};

export const PROJECTS_STORYBOOK_OFFLINE_MAC: MyMacDevice = {
  ...PROJECTS_STORYBOOK_ONLINE_MAC,
  id: "storybook-mac-offline",
  isConnected: false,
  isOnline: false,
  presenceTier: "offline",
  isDispatchReady: false,
  lastSeenAt: "2026-09-28T12:00:00.000Z",
  lastHeartbeatAt: "2026-09-28T12:00:00.000Z",
};

export const PROJECTS_STORYBOOK_COMPOSITION_COUNTS: ProjectCompositionCounts = {
  harness: 2,
  workflow: 1,
  agent: 3,
};

export const PROJECTS_STORYBOOK_COMPOSITION_ITEMS: readonly ProjectCompositionItem[] =
  [
    {
      id: "item-h1",
      componentId: "comp-h1",
      kind: "harness",
      name: "Agent Witch core harness",
      versionLabel: "12",
    },
    {
      id: "item-w1",
      componentId: "comp-w1",
      kind: "workflow",
      name: "Verify post-change",
      versionLabel: null,
    },
  ];

export const PROJECTS_STORYBOOK_DISPLAY_NAME_PRESETS = {
  presets: ["Ada", "Buni", "Conti", "Scripti", "Mira"],
  available: ["Ada", "Conti", "Scripti", "Mira"],
  suggested: "Ada",
} as const;

export const PROJECTS_STORYBOOK_INVITES = [
  {
    inviteId: "invite-listed-1",
    createdAt: now,
    expiresAt: "2026-10-09T00:00:00.000Z",
    revokedAt: null,
    maxUses: 1,
    usesRemaining: 1,
    teamLabel: "specialist",
    scopes: ["acl:self", "project:meta"],
  },
] as const;

export const PROJECTS_STORYBOOK_ACCESS_MEMBERS = [
  {
    id: "mem-owner",
    userId: "storybook-owner",
    role: "owner" as const,
    status: "active" as const,
    teamLabel: null,
    scopes: ["acl:self", "project:meta"],
    projectDisplayName: null,
    isAgent: false,
    displayName: "Thien",
    createdAt: now,
    revokedAt: null,
  },
  {
    id: "mem-agent-buni",
    userId: "agent-uuid-buni",
    role: "member" as const,
    status: "active" as const,
    teamLabel: "specialist",
    scopes: ["acl:self", "project:meta", "peer_sync"],
    projectDisplayName: "Buni",
    isAgent: true,
    createdAt: now,
    revokedAt: null,
  },
] as const;

export const PROJECTS_STORYBOOK_ACCESS_PENDING = [
  {
    id: "pending-agent-1",
    requesterUserId: "agent-uuid-pending",
    requesterIsAgent: true,
    requesterLabel: "Grok Bot pending",
    requestedScopes: ["acl:self", "project:meta"],
    teamLabel: null,
    reason: "invite redeem",
    createdAt: now,
    expiresAt: null,
  },
] as const;
