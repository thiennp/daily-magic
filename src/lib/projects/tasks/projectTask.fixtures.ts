import type ProjectMembershipRecord from "@/lib/projects/acl/types/ProjectMembershipRecord.type";
import type { ProjectTaskRecord } from "@/lib/projects/tasks/projectTaskRecord.type";

export const projectTaskSeat = (
  over: Partial<ProjectMembershipRecord> = {},
): ProjectMembershipRecord => ({
  id: "seat-bot",
  projectId: "p1",
  userId: "bot-user",
  role: "member",
  status: "active",
  memberKind: "bot",
  teamLabel: null,
  scopes: ["msg:dispatch"],
  projectDisplayName: "Kai",
  createdAt: "2026-10-07T10:00:00.000Z",
  revokedAt: null,
  ...over,
});

export const projectTaskRecordFixture = (
  over: Partial<ProjectTaskRecord> = {},
): ProjectTaskRecord => ({
  id: "task-1",
  projectId: "p1",
  title: "Ship DF-024",
  description: null,
  status: "queued",
  priority: null,
  stage: null,
  tipSha: null,
  dependsOn: [],
  ownerMembershipId: "seat-bot",
  ownerDisplayName: "Kai",
  createdByUserId: "bot-user",
  createdByMembershipId: "seat-bot",
  planItemId: null,
  startedAt: null,
  blockedAt: null,
  doneAt: null,
  stageTimes: {},
  createdAt: "2026-10-07T10:00:00.000Z",
  updatedAt: "2026-10-07T10:00:00.000Z",
  ...over,
});
