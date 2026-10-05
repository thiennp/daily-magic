import {
  resolveOrphanProjectTarget,
  type MigrationMembership,
  type MigrationProject,
} from "@/lib/projects/libraryReportsMigration/resolveOrphanProjectTarget";

export interface AssignOrphansInput {
  readonly orphans: readonly {
    readonly id: string;
    readonly ownerUserId: string;
    readonly projectId: string | null;
  }[];
  readonly projects: readonly MigrationProject[];
  readonly activeMemberships: readonly MigrationMembership[];
  readonly ensurePersonalProjectId: (ownerUserId: string) => string;
}

export interface AssignOrphansResult {
  readonly assignments: ReadonlyMap<string, string>;
  readonly createdPersonalOwnerIds: readonly string[];
}

const personalProject = (
  id: string,
  ownerUserId: string,
): MigrationProject => ({
  id,
  ownerUserId,
  name: "Personal",
  createdAt: "9999-01-01T00:00:00.000Z",
});

/**
 * Idempotent assignment: items with projectId are untouched.
 * Personal is created once per owner via ensurePersonalProjectId.
 */
export const assignOrphansToProjects = (
  input: AssignOrphansInput,
): AssignOrphansResult => {
  const projects = [...input.projects];
  const createdPersonalOwnerIds: string[] = [];
  const assignments = new Map<string, string>();

  for (const orphan of input.orphans) {
    if (orphan.projectId !== null && orphan.projectId.length > 0) {
      continue;
    }

    const target = resolveOrphanProjectTarget({
      ownerUserId: orphan.ownerUserId,
      projects,
      activeMemberships: input.activeMemberships,
    });

    if (target.kind === "existing") {
      assignments.set(orphan.id, target.projectId);
      continue;
    }

    const personalId =
      target.reuseProjectId ??
      (() => {
        const id = input.ensurePersonalProjectId(orphan.ownerUserId);
        projects.push(personalProject(id, orphan.ownerUserId));
        createdPersonalOwnerIds.push(orphan.ownerUserId);
        return id;
      })();

    assignments.set(orphan.id, personalId);
  }

  return { assignments, createdPersonalOwnerIds };
};
