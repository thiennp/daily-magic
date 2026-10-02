import { vi } from "vitest";

export const briefingSqlMock = vi.fn();

export const briefingActorTokenRow = {
  id: "bot-1",
  email: "agt@agents.agentwitch.com",
  name: "Bot",
  global_role: "user",
  registration_method: "none",
};

export const briefingActiveMembershipRow = {
  id: "mem-1",
  project_id: "proj-1",
  user_id: "bot-1",
  role: "member",
  status: "active",
  team_label: "NRG",
  scopes: ["acl:self", "project:meta", "peer_sync", "msg:dispatch"],
  project_display_name: "AgentWitch",
  created_at: "2026-10-01T00:00:00.000Z",
  revoked_at: null,
};

export const briefingDemoProject = {
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
};
