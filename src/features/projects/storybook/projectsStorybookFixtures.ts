import type { MyMacDevice } from "@/features/agent/hooks/public-api/types";
import type ProjectCompositionCounts from "@/lib/projects/types/ProjectCompositionCounts.type";
import type ProjectCompositionItem from "@/lib/projects/types/ProjectCompositionItem.type";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";

const now = "2026-10-01T06:00:00.000Z";

export const PROJECTS_STORYBOOK_SAMPLE_PROJECT: UserProjectRecord = {
  id: "storybook-project-1",
  ownerUserId: "storybook-owner",
  deviceId: "storybook-mac-1",
  name: "agentwitch",
  folderPath: "/Users/me/code/agentwitch",
  repoUrls: ["https://github.com/thiennp/agentwitch.git"],
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
      name: "AgentWitch core harness",
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
