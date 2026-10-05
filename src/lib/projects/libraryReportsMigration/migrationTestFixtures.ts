import type {
  MigrationMembership,
  MigrationProject,
} from "@/lib/projects/libraryReportsMigration/resolveOrphanProjectTarget";

export const project = (
  id: string,
  ownerUserId: string,
  name: string,
  createdAt: string,
): MigrationProject => ({ id, ownerUserId, name, createdAt });

export const member = (
  projectId: string,
  userId: string,
): MigrationMembership => ({
  projectId,
  userId,
  status: "active",
});
