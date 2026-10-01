import type { GroupItem } from "@/features/admin/types/groupManagement.types";
import { GlobalRole } from "@/lib/auth/roles";
import type UserProjectRecord from "@/lib/projects/types/UserProjectRecord.type";

export const AWC_STORYBOOK_USER = {
  email: "storybook@agentwitch.com",
  name: "Storybook User",
  globalRole: GlobalRole.SUPER_ADMIN,
};

export const AWC_STORYBOOK_SAMPLE_PROJECT: UserProjectRecord = {
  id: "proj-storybook-1",
  ownerUserId: "user-storybook",
  name: "daily-magic",
  folderPath: "/Users/storybook/code/daily-magic",
  deviceId: "device-storybook-1",
  lastUsedAt: "2026-03-01T00:00:00.000Z",
  createdAt: "2026-01-01T00:00:00.000Z",
  updatedAt: "2026-03-01T00:00:00.000Z",
};

export const AWC_STORYBOOK_SAMPLE_PROJECTS: readonly UserProjectRecord[] = [
  AWC_STORYBOOK_SAMPLE_PROJECT,
  {
    id: "proj-storybook-2",
    ownerUserId: "user-storybook",
    name: "Default",
    folderPath:
      "/Users/storybook/.agent-witch/profiles/storybook@agentwitch.com/infusiontv",
    deviceId: null,
    lastUsedAt: "2026-02-15T00:00:00.000Z",
    createdAt: "2026-01-15T00:00:00.000Z",
    updatedAt: "2026-02-15T00:00:00.000Z",
  },
  {
    id: "proj-storybook-3",
    ownerUserId: "user-storybook",
    name: "Default",
    folderPath: "/Users/storybook/code/agent-witch",
    deviceId: "device-storybook-1",
    lastUsedAt: "2026-03-10T00:00:00.000Z",
    createdAt: "2026-02-01T00:00:00.000Z",
    updatedAt: "2026-03-10T00:00:00.000Z",
  },
];

export const AWC_STORYBOOK_SAMPLE_ADMIN_USERS = [
  {
    id: "user-storybook",
    email: AWC_STORYBOOK_USER.email,
    name: AWC_STORYBOOK_USER.name,
    globalRole: AWC_STORYBOOK_USER.globalRole,
  },
  {
    id: "user-storybook-2",
    email: "teammate@agentwitch.com",
    name: "Teammate",
    globalRole: GlobalRole.USER,
  },
] as const;

export const AWC_STORYBOOK_SAMPLE_GROUPS: readonly GroupItem[] = [
  {
    id: "grp-1",
    name: "Engineering",
  },
];

export const AWC_STORYBOOK_INSTALL_COMMAND =
  "curl -fsSL https://www.agentwitch.com/install/agent-witch.sh | bash";
